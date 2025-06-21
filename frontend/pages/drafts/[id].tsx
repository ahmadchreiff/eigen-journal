import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Bottombar from "@/components/Bottombar";

interface Draft {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  year: string;
  status: string;
  abstractText: string;
  pdfFileName: string;
  createdAt: string;
}

export default function DraftDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // router not ready
    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/drafts/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDraft(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        <button
          onClick={() => router.back()}
          className="text-red-600 hover:underline mb-4"
        >
          ← Back
        </button>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {draft && (
          <div className="bg-white rounded-3xl shadow p-8">
            <h1 className="text-3xl font-bold mb-3">{draft.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              By {draft.firstName} {draft.lastName} • {draft.major}, {draft.year}
            </p>

            <div className="mb-6">
              <span
                className={
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold " +
                  (draft.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : draft.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700")
                }
              >
                {draft.status}
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-2">Abstract</h2>
            <p className="text-gray-800 mb-6 whitespace-pre-wrap">
              {draft.abstractText}
            </p>

            <a
              href={`http://localhost:8080/api/drafts/${draft.id}/pdf`}
              target="_blank"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              View PDF
            </a>
          </div>
        )}
      </div>

      <Bottombar />
    </div>
  );
}
