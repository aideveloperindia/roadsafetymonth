"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Loader2, Trophy, Copy, Sparkles, Target, Award } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export default function QuizPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    passed: boolean;
    referenceId?: string | null;
    attemptId?: string | null;
    certificateType?: "QUIZ" | "PAR";
    meritCutoff?: number;
  } | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [copiedRefId, setCopiedRefId] = useState(false);

  useEffect(() => {
    fetch("/api/quiz/submit")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(-1));
        setLoading(false);
      });
  }, []);

  const answeredCount = useMemo(() => answers.filter((answer) => answer !== -1).length, [answers]);
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          institution,
          answers,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyReference = async () => {
    if (!result?.referenceId) return;
    try {
      await navigator.clipboard.writeText(result.referenceId);
      setCopiedRefId(true);
      setTimeout(() => setCopiedRefId(false), 2000);
    } catch {
      alert("Copy failed. Please copy manually.");
    }
  };

  const handleGenerateCertificate = () => {
    if (!result?.referenceId) return;
    const certificateType = result.certificateType ?? (result.passed ? "QUIZ" : "PAR");
    const percentage = Math.round((result.score / result.total) * 100);
    const scoreLabel = `${result.score}/${result.total} • ${percentage}%`;

    router.push(
      `/certificates/generate?type=${certificateType}&name=${encodeURIComponent(name)}&institution=${encodeURIComponent(
        institution || ""
      )}&score=${encodeURIComponent(scoreLabel)}&ref=${encodeURIComponent(result.referenceId)}`
    );
  };

  if (loading) {
    return (
      <div className="rs-container py-16 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-700" />
      </div>
    );
  }

  if (result) {
    const meritCutoff = result.meritCutoff ?? Math.ceil(result.total * 0.6);
    const isMerit = (result.certificateType ?? (result.passed ? "QUIZ" : "PAR")) === "QUIZ";
    const percentage = Math.round((result.score / result.total) * 100);

    return (
      <div className="rs-container py-14 max-w-3xl space-y-6">
        <div className="rs-card p-8 space-y-4 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center gap-3 text-emerald-800">
            <Trophy className="h-7 w-7" />
            <div>
              <h1 className="text-2xl font-semibold">Quiz Results</h1>
              <p className="text-sm text-emerald-700">Merit threshold: {meritCutoff} correct answers (≥60%)</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-emerald-100">
              <p className="text-sm text-emerald-600 font-semibold">Your Score</p>
              <p className="text-3xl font-bold text-emerald-900">{result.score} / {result.total}</p>
              <p className="text-sm text-slate-500">{percentage}% correct answers</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-emerald-100">
              <p className="text-sm text-emerald-600 font-semibold">Certificate Type</p>
              <p className="text-lg font-bold text-emerald-900">{isMerit ? "Merit" : "Participant"}</p>
              <p className="text-sm text-slate-500">{isMerit ? "Eligible for Merit certificate" : "Participant certificate generated"}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5">
            <p className="text-xs uppercase tracking-wide text-emerald-600">Reference ID</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-emerald-900">{result.referenceId ?? "Not available"}</span>
              {result.referenceId && (
                <Button variant="outline" size="sm" onClick={handleCopyReference} type="button" className="gap-2">
                  <Copy className="h-4 w-4" /> Copy
                </Button>
              )}
            </div>
            {copiedRefId && <p className="mt-1 text-xs text-emerald-600">Reference ID copied to clipboard.</p>}
            <p className="mt-3 text-xs text-slate-500">
              Keep this reference ID safe. You will need it to download or verify your certificate.
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-600 text-white p-5 space-y-3 shadow-lg">
            <p className="font-semibold text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {isMerit
                ? "Congratulations! You unlocked the Merit certificate."
                : "Great effort! You have unlocked the Participant certificate."}
            </p>
            <p className="text-sm text-emerald-100">
              Use the button below to generate and download your official certificate anytime using your reference ID.
            </p>
            <Button onClick={handleGenerateCertificate} className="rs-btn-secondary text-sm">
              <Award className="h-4 w-4" /> Generate {isMerit ? "Merit" : "Participant"} Certificate
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rs-container py-14 space-y-10">
      <div className="rs-card p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="rs-chip">Gamified Quiz Arena</span>
            <h1 className="text-3xl font-semibold text-emerald-900 mt-2">{t("quiz")}</h1>
            <p className="text-slate-600 max-w-xl">
              Answer 15 curated questions covering helmets, speed limits, signals, and pedestrian safety. Score ≥60% to
              unlock the Merit certificate endorsed by the Transport Department.
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-700 flex flex-col gap-2">
            <p className="font-semibold flex items-center gap-2"><Target className="h-4 w-4" /> Progress Tracker</p>
            <div className="rs-progress-track">
              <div className="rs-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p>{answeredCount}/{questions.length} questions marked</p>
          </div>
        </div>
      </div>

      <div className="rs-card p-8">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-semibold text-emerald-900">{t("name")} *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="h-11 rounded-lg border-emerald-200"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="institution" className="text-sm font-semibold text-emerald-900">{t("institution")}</Label>
            <Input
              id="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="School / College / Organisation"
              className="h-11 rounded-lg border-emerald-200"
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="rs-card p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-emerald-900">
                Q{idx + 1}. {q.question}
              </h2>
              <span className="rs-badge-success">+4 pts</span>
            </div>
            <div className="mt-4 grid gap-2">
              {q.options.map((opt, optIdx) => {
                const active = answers[idx] === optIdx;
                return (
                  <label
                    key={optIdx}
                    className={`flex items-center gap-3 rounded-xl border transition-all p-3 cursor-pointer ${
                      active
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                        : "border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/70"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={optIdx}
                      checked={answers[idx] === optIdx}
                      onChange={() => {
                        const newAnswers = [...answers];
                        newAnswers[idx] = optIdx;
                        setAnswers(newAnswers);
                      }}
                      required
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={submitting || !name.trim()}
            className="rs-btn-primary text-base px-10"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Quiz"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}








