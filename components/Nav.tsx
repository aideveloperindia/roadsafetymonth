"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Menu,
  X,
  Home,
  Scale,
  GraduationCap,
  ShieldCheck,
  FileText,
  Cpu,
  Award,
  CalendarDays,
  ShieldHalf,
} from "lucide-react";

const navIcons: Record<string, ReactNode> = {
  "/": <Home className="h-4 w-4" />,
  "/rules": <Scale className="h-4 w-4" />,
  "/guides": <GraduationCap className="h-4 w-4" />,
  "/prevention": <ShieldHalf className="h-4 w-4" />,
  "/quiz": <ShieldCheck className="h-4 w-4" />,
  "/simulation": <Cpu className="h-4 w-4" />,
  "/certificates": <Award className="h-4 w-4" />,
  "/events": <CalendarDays className="h-4 w-4" />,
  "/admin": <FileText className="h-4 w-4" />,
};

export default function Nav() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("i18nextLng") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const toggleLanguage = (lang: "en" | "te") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  const navLinks = [
    { href: "/", label: t("home"), key: "/" },
    { href: "/rules", label: t("rules"), key: "/rules" },
    { href: "/guides", label: t("guides"), key: "/guides" },
    { href: "/prevention", label: t("prevention"), key: "/prevention" },
    { href: "/quiz", label: t("quiz"), key: "/quiz" },
    { href: "/simulation", label: t("simulation"), key: "/simulation" },
    { href: "/certificates", label: t("certificates"), key: "/certificates" },
    { href: "/events", label: t("events"), key: "/events" },
    { href: "/admin", label: "Admin", key: "/admin" },
  ];

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/92 border-b border-emerald-100 shadow-[0_6px_20px_rgba(0,109,74,0.08)]">
      <div className="rs-container">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full border-2 border-emerald-200 bg-white flex items-center justify-center shadow-[0_8px_18px_rgba(13,148,94,0.18)]">
              <Image
                src="/assets/logo/Telangana-LOGO.png"
                alt="Telangana Government Logo"
                width={48}
                height={48}
                priority
                className="h-12 w-12 object-contain"
              />
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-100 bg-white/70 px-2 py-1 shadow-[0_12px_24px_rgba(24,90,64,0.1)]">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-600 text-white shadow-[0_10px_20px_rgba(7,80,55,0.3)]"
                      : "text-slate-600 hover:bg-emerald-50"
                  }`}
                >
                  {navIcons[link.key]}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="rs-pill-toggle hidden sm:inline-flex">
              <button
                data-active={i18n.language === "en"}
                onClick={() => toggleLanguage("en")}
                type="button"
              >
                EN
              </button>
              <button
                data-active={i18n.language === "te"}
                onClick={() => toggleLanguage("te")}
                type="button"
              >
                TE
              </button>
            </div>
            <button
              className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-200 text-emerald-800 shadow-[0_8px_18px_rgba(0,123,79,0.15)]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="xl:hidden pb-4">
            <div className="grid gap-2 rounded-2xl border border-emerald-100 bg-white/90 p-4 shadow-[0_12px_28px_rgba(7,80,55,0.15)]">
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                      active ? "bg-emerald-600 text-white" : "text-slate-700 hover:bg-emerald-50"
                    }`}
                  >
                    {navIcons[link.key]}
                    {link.label}
                  </Link>
                );
              })}
              <div className="rs-pill-toggle justify-center">
                <button
                  data-active={i18n.language === "en"}
                  onClick={() => toggleLanguage("en")}
                  type="button"
                >
                  EN
                </button>
                <button
                  data-active={i18n.language === "te"}
                  onClick={() => toggleLanguage("te")}
                  type="button"
                >
                  TE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
