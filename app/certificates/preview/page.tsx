"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Certificate, { CertificateCode, CertificateData } from "@/components/certificates/Certificate";
import { exportCertificateToPdf } from "@/utils/certificateExport";
import { Download, ArrowLeft, Award } from "lucide-react";

const REQUIRED_PARAMS = ["type", "name", "district", "date"] as const;

const safeDecode = (value: string | null) => {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export default function CertificatePreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="rs-container py-20 flex flex-col items-center gap-4 text-center">
          <Award className="h-6 w-6 animate-spin text-emerald-600" />
          <p className="text-slate-600">Loading certificate preview...</p>
        </div>
      }
    >
      <CertificatePreviewContent />
    </Suspense>
  );
}

function CertificatePreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const missingParam = REQUIRED_PARAMS.find((param) => !searchParams.get(param));
    if (missingParam) {
      router.replace("/certificates/generate");
    }
  }, [router, searchParams]);

  const data = useMemo<CertificateData>(() => {
    const type = (searchParams.get("type") || "ORG") as CertificateCode;
    return {
      certificateType: type,
      fullName: safeDecode(searchParams.get("name")),
      district: safeDecode(searchParams.get("district")),
      issueDate: searchParams.get("date") || new Date().toISOString(),
      email: safeDecode(searchParams.get("email")) || undefined,
      score: safeDecode(searchParams.get("score")) || undefined,
      details: safeDecode(searchParams.get("details")) || undefined,
      eventName: safeDecode(searchParams.get("event")) || undefined,
      referenceId: safeDecode(searchParams.get("ref")) || undefined,
    };
  }, [searchParams]);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    await exportCertificateToPdf(certificateRef.current, `${data.fullName.replace(/\s+/g, "_")}_certificate.pdf`);
  };

  return (
    <div className="rs-container py-14 space-y-8">
      <div className="rs-card p-8 bg-gradient-to-br from-emerald-50 to-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <span className="rs-chip flex items-center gap-2">
            <Award className="h-4 w-4" /> Certificate Preview
          </span>
          <h1 className="text-3xl font-semibold text-emerald-900">Review & Download</h1>
          <p className="text-slate-600 max-w-2xl">
            Your certificate is rendered exactly as it will appear in the PDF download. Double-check recipient details,
            district, and optional notes before finalising.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => router.push("/certificates/generate")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Form
          </Button>
          <Button onClick={handleDownload} className="rs-btn-primary gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-100 bg-slate-100/80 p-4 md:p-8 shadow-inner">
        <Certificate ref={certificateRef} data={data} />
      </div>
    </div>
  );
}

