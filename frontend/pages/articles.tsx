import React, { useEffect, useState } from "react";
import { Search, Filter, Calendar, ChevronDown, FileText, User, Clock, ExternalLink, SlidersHorizontal } from "lucide-react";
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

type SortOption = "newest" | "oldest" | "title";

export default function ApprovedArticlesPage() {
  const [allDrafts, setAllDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  /* Fetch drafts once on mount */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/drafts", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setAllDrafts(data); // ✅ set the drafts array
      } catch (err) {
        console.error("Failed to fetch drafts:", err);
        setAllDrafts([]); // ✅ fallback: empty array on error
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // Filter and sort articles
  const getFilteredAndSortedArticles = () => {
    // let filtered = allDrafts.filter(d => d.status === "APPROVED");
    let filtered = Array.isArray(allDrafts)
      ? allDrafts.filter(d => d.status === "APPROVED")
      : [];


    // Filter by category
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search term (title or author)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(term) ||
        `${article.firstName} ${article.lastName}`.toLowerCase().includes(term)
      );
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const articlesToDisplay = getFilteredAndSortedArticles();
  const categories = ["ALL", "CMPS", "MATH", "PHYS"];

  const getCategoryInfo = (cat: string) => {
    const category = cat.toUpperCase();          //  normalise once
    switch (category) {
      case "CMPS":
        return {
          label: "Computer Science",
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: "💻"
        };
      case "MATH":
        return {
          label: "Mathematics",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: "📐"
        };
      case "PHYS":
        return {
          label: "Physics",
          color: "bg-purple-50 text-purple-700 border-purple-200",
          icon: "⚛️"
        };
      default:
        return {
          label: "All Categories",
          color: "bg-slate-50 text-slate-700 border-slate-200",
          icon: "📚"
        };
    }
  };

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case "newest": return "Newest First";
      case "oldest": return "Oldest First";
      case "title": return "Alphabetical";
      default: return "Newest First";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("ALL");
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm.trim() !== "" || selectedCategory !== "ALL" || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                Academic Articles
              </h1>
              <p className="text-slate-600 text-lg">
                Explore our collection of approved research publications
              </p>
            </div>

            {/* Desktop Stats */}
            <div className="hidden lg:flex items-center gap-6 bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{articlesToDisplay.length}</div>
                <div className="text-sm text-slate-500">Articles</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-700">
                  {new Set(articlesToDisplay.map(a => `${a.firstName} ${a.lastName}`)).size}
                </div>
                <div className="text-sm text-slate-500">Authors</div>
              </div>
            </div>
          </div>

          {/* Mobile Stats */}
          <div className="lg:hidden mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200 text-center">
              <div className="text-xl font-bold text-red-600">{articlesToDisplay.length}</div>
              <div className="text-sm text-slate-500">Articles</div>
            </div>
            <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-200 text-center">
              <div className="text-xl font-bold text-slate-700">
                {new Set(articlesToDisplay.map(a => `${a.firstName} ${a.lastName}`)).size}
              </div>
              <div className="text-sm text-slate-500">Authors</div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
          {/* Filter Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
              <h2 className="font-semibold text-slate-900">Filters & Search</h2>
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className={`px-6 py-5 space-y-5 lg:space-y-0 lg:flex lg:items-center lg:gap-6 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
            {/* Search */}
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="min-w-0 flex-shrink-0">
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white transition-all"
              >
                {categories.map(category => {
                  const info = getCategoryInfo(category);
                  return (
                    <option key={category} value={category}>
                      {info.label}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Sort Options */}
            <div className="min-w-0 flex-shrink-0">
              <label className="block text-sm font-medium text-slate-700 mb-2">Sort by</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white appearance-none transition-all"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-red-600"></div>
              <FileText className="absolute inset-0 m-auto w-6 h-6 text-slate-400" />
            </div>
            <p className="mt-4 text-slate-600 font-medium">Loading articles...</p>
            <p className="text-sm text-slate-500">Please wait while we fetch the latest content</p>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-slate-600">
                {articlesToDisplay.length === 0 && searchTerm ? (
                  <p className="text-slate-500">No articles found matching <span className="font-semibold">"{searchTerm}"</span></p>
                ) : articlesToDisplay.length === 0 && selectedCategory !== "ALL" ? (
                  <p className="text-slate-500">No articles found in <span className="font-semibold">{getCategoryInfo(selectedCategory).label}</span></p>
                ) : articlesToDisplay.length === 0 ? (
                  <p className="text-slate-500">No approved articles available</p>
                ) : (
                  <p>
                    <span className="font-semibold text-slate-900">{articlesToDisplay.length}</span>
                    {' '}article{articlesToDisplay.length !== 1 ? 's' : ''} found
                    {selectedCategory !== "ALL" && (
                      <span className="text-slate-500"> in {getCategoryInfo(selectedCategory).label}</span>
                    )}
                    {searchTerm && (
                      <span className="text-slate-500"> matching "{searchTerm}"</span>
                    )}
                  </p>
                )}
              </div>

              {articlesToDisplay.length > 0 && (
                <div className="text-sm text-slate-500">
                  Sorted by {getSortLabel(sortBy)}
                </div>
              )}
            </div>

            {/* Articles Grid */}
            {articlesToDisplay.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articlesToDisplay.map((article) => {
                  const categoryInfo = getCategoryInfo(article.category);
                  return (
                    <article
                      key={article.id}
                      className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Category Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border ${categoryInfo.color}`}>
                            <span>{categoryInfo.icon}</span>
                            {categoryInfo.label}
                          </span>
                          <Clock className="w-4 h-4 text-slate-400" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-red-700 transition-colors">
                          {article.title}
                        </h3>

                        {/* Author */}
                        <div className="flex items-center gap-2 mb-3">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="font-semibold text-slate-700">
                            {article.firstName} {article.lastName}
                          </span>
                        </div>

                        {/* Date */}
                        <p className="text-slate-500 text-sm mb-5">
                          Published on{" "}
                          {new Date(article.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>

                        {/* Action Button */}
                        <a
                          // href={`http://localhost:8080/uploads/${article.pdfFileName}`}
                          href={`http://localhost:8080/api/drafts/${article.id}/pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-md group-hover:shadow-lg"
                        >
                          <FileText className="w-4 h-4" />
                          View PDF
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Bottombar />
    </div>
  );
}