import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Bottombar from "@/components/Bottombar";

import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/router";

import {
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MoreVertical,
  TrendingUp,
  Users,
  FileCheck,
  Trash2,
  Check,
  X,
  LogOut,
  Settings,
  Shield,
  Bell,
  ChevronDown
} from "lucide-react";

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

interface Stats {
  total: number;
  approved: number;
  rejected: number;
  pending: number;
}

export default function DraftList() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [filteredDrafts, setFilteredDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [stats, setStats] = useState<Stats>({ total: 0, approved: 0, rejected: 0, pending: 0 });
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else if (user.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/drafts", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setDrafts(data);
        calculateStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const calculateStats = (data: Draft[]) => {
    const stats = {
      total: data.length,
      approved: data.filter(d => d.status === "APPROVED").length,
      rejected: data.filter(d => d.status === "REJECTED").length,
      pending: data.filter(d => d.status === "PENDING_REVIEW").length,
    };
    setStats(stats);
  };

  useEffect(() => {
    let filtered = drafts.filter(draft => {
      const matchesSearch = draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${draft.firstName} ${draft.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || draft.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        default:
          return 0;
      }
    });

    setFilteredDrafts(filtered);
  }, [drafts, searchTerm, statusFilter, sortBy]);

  const updateStatus = async (draftId: number, newStatus: string) => {
    setActionLoading(draftId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:8080/api/drafts/${draftId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      const updatedDrafts = drafts.map(draft =>
        draft.id === draftId ? { ...draft, status: newStatus } : draft
      );
      setDrafts(updatedDrafts);
      calculateStats(updatedDrafts);

      alert(`Status set to ${newStatus}`);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteDraft = async (draftId: number) => {
    if (!confirm("Delete this draft permanently?")) return;

    setActionLoading(draftId);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/api/drafts/${draftId}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error("Failed to delete draft");

      const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
      setDrafts(updatedDrafts);
      calculateStats(updatedDrafts);

      alert("Draft deleted");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const openPDF = (draftId: number) => {
    window.open(`http://localhost:8080/api/drafts/${draftId}/pdf`, '_blank');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-50 text-green-700 border-green-200";
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded-lg w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="h-4 bg-slate-200 rounded mb-4"></div>
                  <div className="h-8 bg-slate-200 rounded"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Bottombar />
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        {/* Enhanced Header with Admin Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 rounded-xl">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
              </div>
              <p className="text-slate-600">Review and manage submitted academic drafts</p>
            </div>

            {/* Admin Controls */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-3 text-slate-600 hover:text-slate-900 hover:bg-white rounded-xl transition-colors">
                <Bell className="w-5 h-5" />
                {stats.pending > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {stats.pending}
                  </span>
                )}
              </button>

              {/* Admin Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      A
                    </span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">
                      Admin
                    </p>
                    <p className="text-xs text-slate-500">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {showAdminMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        Administrator
                      </p>
                      <p className="text-xs text-slate-500">Admin Account</p>
                    </div>
                    
                    <button
                      onClick={() => {/* Handle settings */}}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    
                    <button
                      onClick={() => router.push('/')}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      View as User
                    </button>
                    
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Drafts</p>
                <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                <p className="text-xs text-slate-500 mt-1">All submissions</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-xs text-slate-500 mt-1">Ready for publication</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-xs text-slate-500 mt-1">Needs revision</p>
              </div>
              <div className="p-3 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-slate-500 mt-1">Awaiting decision</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl group-hover:bg-yellow-100 transition-colors">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING_REVIEW">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="author">Author A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center">
              <XCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-700">Error: {error}</p>
            </div>
          </div>
        )}

        {/* Drafts Table */}
        {!error && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Draft
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDrafts.map((draft, index) => (
                    <tr
                      key={draft.id}
                      className="hover:bg-slate-50 transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-red-50 rounded-lg mr-3">
                            <FileText className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <button
                              onClick={() => openPDF(draft.id)}
                              className="text-lg font-semibold text-slate-900 hover:text-red-600 transition-colors cursor-pointer"
                            >
                              {draft.title}
                            </button>
                            <p className="text-sm text-slate-500">ID: {draft.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {draft.firstName.charAt(0)}{draft.lastName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {draft.firstName} {draft.lastName}
                            </p>
                            <p className="text-sm text-slate-500">
                              {draft.major}, {draft.year}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(draft.status)}`}>
                          {getStatusIcon(draft.status)}
                          <span className="ml-2">{draft.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-slate-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{new Date(draft.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {actionLoading === draft.id ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                          ) : (
                            <>
                              <button
                                onClick={() => updateStatus(draft.id, "APPROVED")}
                                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(draft.id, "REJECTED")}
                                className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteDraft(draft.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDrafts.length === 0 && !loading && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No drafts found</h3>
                <p className="text-slate-500">
                  {searchTerm || statusFilter !== "ALL"
                    ? "Try adjusting your search criteria"
                    : "No drafts have been submitted yet"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close admin menu */}
      {showAdminMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAdminMenu(false)}
        />
      )}

      <Bottombar />
    </div>
  );
}