"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Award, Sparkles, ArrowRight } from "lucide-react";

interface CertificateInfo {
  code: string;
  title: string;
  purpose: string;
}

const CERTIFICATE_LIST: CertificateInfo[] = [
  { code: "ORG", title: "Organiser Appreciation Certificate", purpose: "For individuals who conducted or organised a Road Safety Month event (Principal, HOD, NGO head, etc.)." },
  { code: "PAR", title: "Participant Certificate", purpose: "For citizens who participated in Road Safety Month activities or awareness programmes." },
  { code: "QUIZ", title: "Quiz Merit Certificate", purpose: "For users scoring ≥60% in the Road Safety Quiz and demonstrating strong rule knowledge." },
  { code: "SIM", title: "Simulation Completion Certificate", purpose: "For users who successfully complete an approved road-safety simulation scenario on the site." },
  { code: "VOL", title: "Volunteer Certificate", purpose: "For volunteers who actively contributed to events, outreach, and awareness drives during Road Safety Month." },
  { code: "SCH", title: "School Contributor Certificate", purpose: "For schools that organised road safety awareness programmes with valid event submissions." },
  { code: "COL", title: "College Coordinator Certificate", purpose: "For faculty or student coordinators who led Road Safety Month initiatives at their college campuses." },
  { code: "TOPPER", title: "Simulation Topper Certificate", purpose: "For district/state level top performers in quizzes or simulations, based on leaderboards and evaluation." },
];

export default function CertificatesPage() {
  const { t } = useTranslation("common");

  return (
    <div className="rs-container py-14 space-y-10">
      <div className="rs-card p-8 md:p-10 bg-gradient-to-br from-emerald-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <span className="rs-chip flex items-center gap-2">
              <Award className="h-4 w-4" /> Official Certificates Hub
            </span>
            <h1 className="text-3xl font-semibold text-emerald-900">{t("certificates")}</h1>
            <p className="text-slate-600 max-w-2xl">
              Telangana Road Safety Month issues official certificates in eight categories. Each template carries the
              Telangana emblem, minister signature, dynamic personalisation, and a verification-ready reference ID.
            </p>
          </div>
          <Link href="/certificates/generate" className="rs-btn-primary">
            <Sparkles className="h-4 w-4" /> Generate a Certificate
          </Link>
        </div>
      </div>

      <div className="rs-table-wrapper">
        <table className="rs-table text-sm min-w-[640px]">
          <thead>
            <tr>
              <th className="text-left">Code</th>
              <th className="text-left">Certificate Title</th>
              <th className="text-left">Purpose / Eligible Recipient</th>
            </tr>
          </thead>
          <tbody>
            {CERTIFICATE_LIST.map((item) => (
              <tr key={item.code}>
                <td className="font-semibold text-emerald-700">{item.code}</td>
                <td className="font-medium text-emerald-900">{item.title}</td>
                <td className="text-slate-600">{item.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500 sm:hidden">
        Tip: drag sideways to view the full certificate table.
      </p>

      <div className="rs-card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-emerald-900">Need to verify a certificate?</h2>
          <p className="text-sm text-slate-600">Use the reference ID printed on the certificate to confirm its authenticity.</p>
        </div>
        <Link href="/certificates/generate" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
          Generate or verify now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}





