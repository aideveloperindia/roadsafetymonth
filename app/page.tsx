"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  ShieldCheck,
  BrainCircuit,
  GraduationCap,
  Activity,
  Award,
  Compass,
  Users,
  BookOpenCheck,
  ArrowRight,
} from "lucide-react";

const featureCards = [
  {
    title: "Rules",
    description: "Understand Telangana&apos;s updated traffic rules and how to apply them in daily travel.",
    href: "/rules",
    icon: <ShieldCheck className="h-6 w-6" />,
    accent: "bg-emerald-50 text-emerald-800",
  },
  {
    title: "Guides",
    description: "Interactive guides designed for students, parents, and institutions to stay road-ready.",
    href: "/guides",
    icon: <BookOpenCheck className="h-6 w-6" />,
    accent: "bg-yellow-100 text-yellow-800",
  },
  {
    title: "Prevention",
    description: "Prevent crashes before they happen with science-backed tips and safety routines.",
    href: "/prevention",
    icon: <Activity className="h-6 w-6" />,
    accent: "bg-red-50 text-red-600",
  },
];

const engagementHighlights = [
  {
    label: "Quiz Arena",
    description: "Earn merit badges by acing the 15-question knowledge check.",
    href: "/quiz",
    icon: <GraduationCap className="h-6 w-6" />,
  },
  {
    label: "Simulation Lab",
    description: "Fix violations in gamified scenarios: no helmet, triple riding, and drunk driving.",
    href: "/simulation",
    icon: <BrainCircuit className="h-6 w-6" />,
  },
  {
    label: "Certificates Hub",
    description: "Generate, preview, and verify official Telangana Road Safety certificates.",
    href: "/certificates",
    icon: <Award className="h-6 w-6" />,
  },
];

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <div className="space-y-24">
      <section className="rs-hero-pattern">
        <div className="rs-container py-16 md:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-white">
              <span className="rs-chip" style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff" }}>
                Government of Telangana • Road Safety Month
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Together for Safer Roads. Learn, Act, and Lead by Example.
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-xl">
                Road safety is a shared responsibility. Explore gamified learning, interactive simulations, and official
                certifications built to engage students, educators, and communities across Telangana.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/quiz" className="rs-btn-secondary">
                  <ShieldCheck className="h-5 w-5" />
                  Take the Quiz Challenge
                </Link>
                <Link href="/simulation" className="rs-btn-primary">
                  <BrainCircuit className="h-5 w-5" />
                  Launch Simulation Lab
                </Link>
              </div>
            </div>
            <div className="relative flex-1 min-w-[280px]">
              <div className="rs-roadstrap p-8 md:p-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="rs-badge-success">
                      <Compass className="h-4 w-4" /> Safety Navigator
                    </div>
                    <div className="rs-badge-alert">
                      <Users className="h-4 w-4" /> Student Focused
                    </div>
                  </div>
                  <p className="text-lg font-medium text-emerald-900">
                    Map your journey with live progress indicators, reference IDs, and official transport-endorsed rewards.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-emerald-900">
                        <span>Quiz completion</span>
                        <span>68%</span>
                      </div>
                      <div className="rs-progress-track mt-2">
                        <div className="rs-progress-bar" style={{ width: "68%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-emerald-900">
                        <span>Simulation mastery</span>
                        <span>42%</span>
                      </div>
                      <div className="rs-progress-track mt-2">
                        <div className="rs-progress-bar" style={{ width: "42%" }} />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-white/90 px-4 py-3 text-sm text-emerald-900">
                    <p className="font-semibold">Latest spotlight</p>
                    <p className="text-emerald-700">
                      Karimnagar Polytechnic logged 1200+ student pledges in the first week of Road Safety Month.
                    </p>
                  </div>
                </div>
                <div className="rs-floating-badge flex-col items-start">
                  <span className="text-xs uppercase tracking-wide text-emerald-600">Live Dashboard</span>
                  <span className="text-sm font-semibold text-emerald-900">Updated every hour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-section rs-grid-bg">
        <div className="rs-container space-y-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="rs-chip">Road-ready essentials</span>
              <h2 className="text-3xl font-semibold text-emerald-900 mt-3">Navigate. Practice. Prevent.</h2>
              <p className="text-slate-600 max-w-2xl">
                Every page is tailored for quick learning and action. Start with the basics, dive into interactive guides,
                and build preventative habits that save lives.
              </p>
            </div>
            <Link href="/events" className="rs-btn-secondary">
              <ArrowRight className="h-4 w-4" /> Log a Road Safety Event
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((card) => (
              <Link key={card.title} href={card.href} className="rs-card block h-full p-6">
                <div className={`${card.accent} inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5`}>{card.icon}</div>
                <h3 className="text-xl font-semibold text-emerald-900 mb-3">{card.title}</h3>
                <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: card.description }} />
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-700 gap-2">
                  Explore {card.title} <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-container space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="rs-chip">Engagement Hub</span>
              <h2 className="text-3xl font-semibold text-emerald-900 mt-3">Play. Learn. Earn Road Safety Points.</h2>
            </div>
            <p className="text-slate-600 max-w-2xl">
              Earn badges, unlock certificates, and track your progress with reference IDs generated for every quiz,
              simulation, and training completed.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {engagementHighlights.map((item) => (
              <div key={item.label} className="rs-card p-6">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-emerald-900 mb-2">{item.label}</h3>
                <p className="text-sm text-slate-600 mb-5">{item.description}</p>
                <Link href={item.href} className="inline-flex items-center text-sm font-semibold text-emerald-700 gap-2">
                  Go to {item.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-container grid gap-10 md:grid-cols-[1.4fr_1fr] items-center">
          <div className="space-y-5">
            <span className="rs-chip">Minister&apos;s message</span>
            <h2 className="text-3xl font-semibold text-emerald-900">Road Safety is a shared promise to Telangana.</h2>
            <p className="text-slate-700 text-lg">
              "Road safety is a shared responsibility that requires the collective effort of every citizen. This month, we
              come together to raise awareness, educate our communities, and commit to making Telangana&apos;s roads safer for
              everyone."
            </p>
            <p className="text-sm text-slate-600">Sri Ponnam Prabhakar Garu • Hon&apos;ble Transport & BC Welfare Minister</p>
          </div>
          <div className="rs-card overflow-hidden p-0">
            <div className="flex flex-col items-center gap-4 p-6 bg-white">
              <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg">
                <img
                  src="/assets/minister/Sri-Ponnam-Prabhakar.jpg"
                  alt="Sri Ponnam Prabhakar Garu"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-emerald-900">Sri Ponnam Prabhakar Garu</p>
                <p className="text-sm text-slate-600">Hon&apos;ble Minister for Transport & BC Welfare</p>
              </div>
              <p className="text-sm text-slate-600 text-center">
                Join institutions across Telangana that are pledging, conducting workshops, and tracking impact through the
                official dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-container grid gap-6 md:grid-cols-3">
          <div className="rs-card p-6">
            <h3 className="text-lg font-semibold text-emerald-900">Student-friendly</h3>
            <p className="text-sm text-slate-600">
              Designed with youth-focused UI, gamified flows, and bilingual support so learning remains fun and impactful.
            </p>
          </div>
          <div className="rs-card p-6">
            <h3 className="text-lg font-semibold text-emerald-900">Government-endorsed</h3>
            <p className="text-sm text-slate-600">
              Official certificates, verified reference IDs, and direct access to Transport Department initiatives.
            </p>
          </div>
          <div className="rs-card p-6">
            <h3 className="text-lg font-semibold text-emerald-900">Community-driven</h3>
            <p className="text-sm text-slate-600">
              Institutions log events, students share pledges, and families learn together to make Telangana&apos;s roads safer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
