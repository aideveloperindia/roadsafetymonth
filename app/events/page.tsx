"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { Loader2, CalendarCheck, CheckCircle2 } from "lucide-react";

export default function EventsPage() {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setReferenceId(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      organiserName: formData.get("organiserName") as string,
      organiserRole: formData.get("organiserRole") as string,
      institution: formData.get("institution") as string,
      date: formData.get("date") as string,
      location: formData.get("location") as string,
      regionCode: formData.get("regionCode") as string,
    };

    try {
      const response = await fetch("/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const payload = await response.json();
        setSuccess(true);
        setReferenceId(payload?.referenceId ?? null);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rs-container py-14 space-y-8 max-w-3xl">
      <div className="rs-card p-8 bg-gradient-to-br from-emerald-50 to-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <span className="rs-chip flex items-center gap-2">
            <CalendarCheck className="h-4 w-4" /> {t("events")}
          </span>
          <h1 className="text-3xl font-semibold text-emerald-900">Log a Road Safety Event</h1>
          <p className="text-slate-600 max-w-2xl">
            Submit your institution&apos;s Road Safety Month activities, workshops, and campaigns. Every approved entry
            generates a reference ID to help participants earn certificates.
          </p>
        </div>
      </div>

      {success && (
        <div className="rs-card p-6 bg-emerald-50 border border-emerald-100 space-y-2">
          <p className="text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" /> Event logged successfully!
          </p>
          {referenceId && (
            <p className="text-sm text-emerald-900">
              Reference ID: <span className="font-semibold">{referenceId}</span>
            </p>
          )}
          <p className="text-xs text-emerald-800">Share this ID so participants can generate or verify their certificates.</p>
        </div>
      )}

      <div className="rs-card p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-emerald-900">Event Title *</Label>
            <Input id="title" name="title" required className="h-11 rounded-lg border border-emerald-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organiserName" className="text-sm font-semibold text-emerald-900">Organiser Name *</Label>
              <Input id="organiserName" name="organiserName" required className="h-11 rounded-lg border border-emerald-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organiserRole" className="text-sm font-semibold text-emerald-900">Organiser Role</Label>
              <Input
                id="organiserRole"
                name="organiserRole"
                placeholder="Principal, HOD, etc."
                className="h-11 rounded-lg border border-emerald-200"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-sm font-semibold text-emerald-900">Institution</Label>
              <Input id="institution" name="institution" className="h-11 rounded-lg border border-emerald-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-semibold text-emerald-900">Event Date *</Label>
              <Input id="date" name="date" type="date" required className="h-11 rounded-lg border border-emerald-200" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-emerald-900">Location</Label>
              <Input id="location" name="location" className="h-11 rounded-lg border border-emerald-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regionCode" className="text-sm font-semibold text-emerald-900">Region Code</Label>
              <Input
                id="regionCode"
                name="regionCode"
                placeholder="HYD-01"
                className="h-11 rounded-lg border border-emerald-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-emerald-900">
              Highlights (optional)
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Key outcomes, number of participants, collaborations..."
              rows={4}
              className="border border-emerald-200"
            />
          </div>

          <Button type="submit" className="rs-btn-primary w-full justify-center" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Event"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}








