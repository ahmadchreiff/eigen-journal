import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Bottombar from "@/components/Bottombar";

interface Draft {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  category: string;   // "CMPS" | "MATH" | "PHYS"
  status: string;     // "APPROVED" | "REJECTED" | "PENDING_REVIEW"
  createdAt: string;
  pdfFileName: string;
}

export default function ApprovedArticlesPage() {
  const [allDrafts, setAllDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  /* Fetch drafts once on mount */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/api/drafts");
        const data = await res.json();
        setAllDrafts(data);
      } catch (err) {
        console.error("Failed to fetch drafts:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Only show articles with approved status
  const articlesToDisplay = allDrafts.filter(
    (d) => d.status === "APPROVED"          // status must match backend string exactly
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <main className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          All Articles
        </h1>

        {/* Removed category filter as it's no longer needed */}
        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : articlesToDisplay.length === 0 ? (
          <p className="text-slate-600">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesToDisplay.map((article) => (
              <div
                key={article.id}
                className="bg-white p-6 rounded-xl shadow border border-slate-200 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-red-700 mb-1">
                  {article.title}
                </h2>
                <p className="text-slate-600 mb-2">
                  <span className="font-medium">
                    {article.firstName} {article.lastName}
                  </span>{" "}
                  · {article.category.toUpperCase()}
                </p>
                <p className="text-slate-500 text-sm mb-4">
                  Submitted on{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
                <a
                  href={`http://localhost:8080/uploads/${article.pdfFileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline font-medium"
                >
                  View PDF →
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <Bottombar />
    </div>
  );
}