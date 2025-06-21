import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Bottombar from "@/components/Bottombar";

/** ──────────────────────────────────────────────────────────
 *  Draft type – adjust keys if your backend returns different
 * ──────────────────────────────────────────────────────────*/
interface Draft {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  status: string;
  createdAt: string; // ISO date
}

export default function DraftList() {
  const [drafts, setDrafts]   = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  /** Fetch all drafts once on mount */
  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch("http://localhost:8080/api/drafts");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDrafts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Submitted Drafts</h1>

        {/* Loading / error states */}
        {loading && <p>Loading…</p>}
        {error   && <p className="text-red-600">Error: {error}</p>}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Author</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {drafts.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="px-4 py-3">{d.id}</td>
                    <td className="px-4 py-3 font-medium">
                      <a href={`/drafts/${d.id}`} className="text-red-600 hover:underline">
                        {d.title}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {d.firstName} {d.lastName}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-block px-2 py-1 rounded-full text-xs font-semibold " +
                          (d.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : d.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700")
                        }
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Bottombar />
    </div>
  );
}
