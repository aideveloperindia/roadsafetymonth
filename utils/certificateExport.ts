"use client";

export async function exportCertificateToPdf(element: HTMLElement, fileName: string) {
  if (!element) {
    throw new Error("Certificate element not found");
  }

  const html2canvas = (await import("html2canvas")).default;
  const { default: jsPDF } = await import("jspdf");

  const scale = 3.125; // ~300 DPI based on 96 DPI default

  const canvas = await html2canvas(element, {
    scale,
    backgroundColor: "#ffffff",
    useCORS: true,
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
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(fileName);
}


