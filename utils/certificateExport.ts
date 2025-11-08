"use client";

type JsPdfModule = typeof import("jspdf");

export async function exportCertificateToPdf(element: HTMLElement, fileName: string) {
  if (!element) {
    throw new Error("Certificate element not found");
  }

  const html2canvasModule = await import("html2canvas");
  const jsPDFModule: JsPdfModule = await import("jspdf");

  const html2canvas = html2canvasModule.default ?? html2canvasModule;
  const JsPDFConstructor =
    (jsPDFModule.default as JsPdfModule["default"] | undefined) ??
    (jsPDFModule as { jsPDF?: JsPdfModule["default"] }).jsPDF;

  if (!JsPDFConstructor) {
    throw new Error("Failed to load jsPDF module");
  }

  const scale = 3.125; // ~300 DPI based on 96 DPI default

  const canvas = await html2canvas(element, {
    scale,
    backgroundColor: "#ffffff",
    useCORS: true,
    allowTaint: true,
    onclone: (clonedDocument) => {
      const certificateElement = clonedDocument.querySelector(".certificate-export") as HTMLElement | null;
      if (certificateElement) {
        const cleanStyles: Partial<CSSStyleDeclaration> = {
          boxShadow: "none",
          filter: "none",
          mixBlendMode: "normal",
          backgroundImage: "none",
          backgroundColor: "#ffffff",
        };

        const applyCleanStyles = (node: Element) => {
          const htmlElement = node as HTMLElement;
          Object.entries(cleanStyles).forEach(([property, value]) => {
            if (value !== undefined) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (htmlElement.style as any)[property] = value;
            }
          });
          Array.from(node.children).forEach(applyCleanStyles);
        };

        applyCleanStyles(certificateElement);
      }
    },
  });

  const imgData = canvas.toDataURL("image/png");

  // html2canvas outputs pixels (96 DPI). Convert to points for jsPDF (72 DPI).
  const pxToPt = (px: number) => (px * 72) / 96;
  const pdfWidth = pxToPt(canvas.width);
  const pdfHeight = pxToPt(canvas.height);

  const pdf = new JsPDFConstructor({
    orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
    unit: "pt",
    format: [pdfWidth, pdfHeight],
  });

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
}
