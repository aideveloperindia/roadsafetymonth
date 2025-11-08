"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const quickLinks = [
  { href: "/rules", label: "Rules" },
  { href: "/guides", label: "Guides" },
  { href: "/prevention", label: "Prevention" },
  { href: "/quiz", label: "Quiz" },
  { href: "/simulation", label: "Simulation" },
  { href: "/certificates", label: "Certificates" },
  { href: "/events", label: "Events" },
];

export default function SiteFooter() {
  const { t, i18n } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    if (typeof window !== "undefined") {
      localStorage.setItem("i18nextLng", lng);
    }
  };

  return (
    <footer className="rs-footer-bg mt-20">
      <div className="rs-container py-12">
        <div className="grid gap-10 md:grid-cols-[320px_auto] items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/logo/Telangana-LOGO.png"
                alt="Telangana Government"
                width={64}
                height={64}
                className="h-14 w-14 object-contain"
              />
              <div>
                <p className="text-sm uppercase tracking-widest text-emerald-200">Transport Department</p>
                <h3 className="text-xl font-semibold">Telangana Road Safety Month</h3>
                <p className="text-sm text-slate-300 max-w-sm">
                  Empowering citizens, students, and institutions to build a safer road culture across Telangana.
                </p>
              </div>
            </div>
            <div className="rs-pill-toggle">
              {mounted && (
                <>
                  <button data-active={i18n.language === "en"} onClick={() => toggleLanguage("en")}>
                    EN
                  </button>
                  <button data-active={i18n.language === "te"} onClick={() => toggleLanguage("te")}>
                    TE
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-emerald-200 mb-3">
                {t("quickLinks") ?? "Quick Links"}
              </h4>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-yellow-300 transition-colors">
                      {t(link.label.toLowerCase()) ?? link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-emerald-200 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/certificates/generate">Generate Certificate</Link>
                </li>
                <li>
                  <Link href="/certificates/generate">Verify Certificate</Link>
                </li>
                <li>
                  <Link href="/events">Log an Event</Link>
                </li>
                <li>
                  <Link href="/simulation">Interactive Simulations</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-emerald-200 mb-3">Contact</h4>
              <p className="text-sm text-slate-300">
                Telangana State Transport Department, Hyderabad<br />
                <span className="block text-xs mt-2">support@roadsafety.telangana.gov.in</span>
              </p>
              <div className="mt-4 space-y-2 text-xs text-slate-400">
                <p>© 2025-2026 Telangana Road Safety Month. All rights reserved.</p>
                <p>Designed for accessibility & youth engagement.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 rs-divider" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <p>Drive Safe • Walk Alert • Arrive Alive</p>
          <p>Transport Department | Government of Telangana</p>
        </div>
      </div>
    </footer>
  );
}

