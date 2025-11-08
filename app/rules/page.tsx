import { ShieldCheck, TrafficCone, AlertTriangle, Footprints } from "lucide-react";

const RULE_SECTIONS = [
  {
    title: "Helmet Protocol",
    icon: <TrafficCone className="h-6 w-6" />,
    description:
      "Always wear a BIS-certified helmet while riding a two-wheeler. Secure the chin strap snugly and ensure your pillion rider does the same.",
  },
  {
    title: "Seatbelt Discipline",
    icon: <ShieldCheck className="h-6 w-6" />,
    description:
      "Fasten seatbelts in every seat. Child passengers must use age-appropriate safety seats even on short trips.",
  },
  {
    title: "Speed Awareness",
    icon: <AlertTriangle className="h-6 w-6" />,
    description:
      "Follow posted speed limits, especially in residential areas, school zones, and at zebra crossings.",
  },
  {
    title: "Pedestrian Priority",
    icon: <Footprints className="h-6 w-6" />,
    description:
      "Always stop for pedestrians at zebra crossings. Avoid distractions like mobile phones while walking across roads.",
  },
];

export default function RulesPage() {
  return (
    <div className="rs-container py-12 md:py-16 space-y-10">
      <div className="space-y-3 text-center md:text-left">
        <span className="rs-chip">Transport-approved regulations</span>
        <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900">Road Safety Rules for Every Citizen</h1>
        <p className="text-slate-600 max-w-2xl">
          Telangana mandates strict adherence to road safety regulations to protect every commuter. Review the essentials
          below and integrate them into your daily travel routine.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {RULE_SECTIONS.map((rule) => (
          <div key={rule.title} className="rs-card p-6">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              {rule.icon}
            </div>
            <h3 className="text-xl font-semibold text-emerald-900 mb-2">{rule.title}</h3>
            <p className="text-sm text-slate-600">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}









