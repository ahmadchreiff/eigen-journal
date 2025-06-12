import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Bottombar from '@/components/Bottombar';
import { FiClock, FiUser, FiArrowRight, FiBookOpen, FiTrendingUp, FiFilter, FiGrid, FiList } from 'react-icons/fi';

export default function CMPSPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featuredArticle = {
    title: 'The Hidden Mathematics Behind Large Language Models',
    author: 'Yara El-Hajj',
    date: 'June 10, 2025',
    readTime: '12 min read',
    excerpt: 'How transformer architectures leverage high-dimensional geometry and information theory to understand human language. A deep dive into the mathematical foundations that make GPT and similar models possible.',
    href: '/articles/llm-mathematics',
    image: '/images/llm-math.jpg',
    tags: ['AI/ML', 'Theory', 'Mathematics'],
    featured: true
  };

  const articles = [
    {
      title: 'Quantum Error Correction: From Theory to Silicon',
      author: 'Zein Hammoud',
      date: 'June 8, 2025',
      readTime: '8 min read',
      excerpt: 'Recent breakthroughs in topological qubits bring us closer to fault-tolerant quantum computing, with implications for cryptography and optimization.',
      href: '/articles/quantum-error-correction',
      image: '/images/quantum-error.jpg',
      tags: ['Quantum Computing', 'Hardware']
    },
    {
      title: 'Neural Architecture Search: Automating AI Design',
      author: 'Layla Nasser',
      date: 'June 5, 2025',
      readTime: '10 min read',
      excerpt: 'How machines are learning to design better machine learning models, revolutionizing the field of automated neural network optimization.',
      href: '/articles/neural-architecture-search',
      image: '/images/nas.jpg',
      tags: ['AI/ML', 'AutoML']
    },
    {
      title: 'Byzantine Fault Tolerance in Distributed Systems',
      author: 'Omar Khalil',
      date: 'June 3, 2025',
      readTime: '9 min read',
      excerpt: 'Understanding consensus algorithms that power blockchain networks and distributed databases, from PBFT to modern variations.',
      href: '/articles/byzantine-fault-tolerance',
      image: '/images/byzantine.jpg',
      tags: ['Systems', 'Blockchain']
    },
    {
      title: 'Computational Complexity of Climate Models',
      author: 'Sara Tabbara',
      date: 'May 30, 2025',
      readTime: '11 min read',
      excerpt: 'Exploring the algorithmic challenges in weather prediction and climate simulation, from fluid dynamics to machine learning approaches.',
      href: '/articles/climate-computing',
      image: '/images/climate-compute.jpg',
      tags: ['Scientific Computing', 'Algorithms']
    },
    {
      title: 'Zero-Knowledge Proofs: Privacy by Mathematics',
      author: 'Rami Fares',
      date: 'May 28, 2025',
      readTime: '7 min read',
      excerpt: 'How cutting-edge cryptographic protocols enable verification without revelation, transforming privacy in the digital age.',
      href: '/articles/zero-knowledge-proofs',
      image: '/images/zkp.jpg',
      tags: ['Cryptography', 'Theory']
    },
    {
      title: 'Graph Neural Networks for Drug Discovery',
      author: 'Nour Salam',
      date: 'May 25, 2025',
      readTime: '9 min read',
      excerpt: 'Applying graph-based deep learning to molecular property prediction, accelerating pharmaceutical research and development.',
      href: '/articles/gnn-drug-discovery',
      image: '/images/gnn-drugs.jpg',
      tags: ['AI/ML', 'Bioinformatics']
    }
  ];

  const allTags = ['all', ...Array.from(new Set([...featuredArticle.tags, ...articles.flatMap(a => a.tags)]))];
  
  const filteredArticles = selectedTag === 'all' 
    ? articles 
    : articles.filter(article => article.tags.includes(selectedTag));

  const shouldShowFeatured = selectedTag === 'all' || featuredArticle.tags.includes(selectedTag);

  return (
    <>
      <Head>
        <title>Computer Science · The Eigen Journal</title>
        <meta name="description" content="Explore cutting-edge research and insights in Computer Science from AUB students and researchers." />
        <meta property="og:title" content="Computer Science · The Eigen Journal" />
        <meta property="og:description" content="Technical writing, deep dives, and breakthroughs in AI, theoretical CS, systems, and more." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero Section with Floating Elements */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-red-600 rounded-full mix-blend-multiply animate-blob"></div>
            <div className="absolute top-40 right-20 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-10 left-40 w-36 h-36 bg-indigo-600 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FiBookOpen className="w-4 h-4" />
                Computer Science
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-light text-gray-900 mb-6 tracking-tight">
                Computational <span className="font-semibold text-red-600">Frontiers</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed font-light">
                Technical writing, deep dives, and breakthroughs in artificial intelligence, 
                theoretical computer science, distributed systems, and emerging technologies.
              </p>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="w-4 h-4 text-red-500" />
                  <span>{articles.length + 1} articles</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-red-500" />
                  <span>6 contributors</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Tag Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <FiFilter className="w-4 h-4 text-gray-400 hidden sm:block" />
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag === 'all' ? 'All Topics' : tag}
                  </button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Article */}
          {shouldShowFeatured && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1 h-6 bg-red-600 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-900">Featured Story</h2>
              </div>

              <Link href={featuredArticle.href} className="group block">
                <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500 to-transparent rounded-full blur-3xl"></div>
                  </div>

                  <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                    <div className="space-y-6">
                      <div className="flex flex-wrap items-center gap-2">
                        {featuredArticle.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm font-medium border border-red-500/30">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h1 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-red-300 transition-colors duration-300">
                        {featuredArticle.title}
                      </h1>

                      <p className="text-gray-300 text-lg leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <FiUser className="w-4 h-4" />
                            <span>{featuredArticle.author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4" />
                            <span>{featuredArticle.readTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-red-300 group-hover:gap-3 transition-all duration-300">
                          <span className="font-medium">Read Article</span>
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        {/* Placeholder for featured image */}
                        <div className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center">
                          <FiBookOpen className="w-12 h-12 text-red-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {/* Articles Grid/List */}
          <section>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-6 bg-red-600 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedTag === 'all' ? 'Recent Articles' : `${selectedTag} Articles`}
              </h2>
              <span className="text-gray-500 text-sm">({filteredArticles.length})</span>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <Link key={article.href} href={article.href} className="group block">
                    <article className={`h-full bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-red-200 transition-all duration-300 hover:-translate-y-1 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${index * 100}ms` }}>
                      
                      <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden relative">
                        {/* Placeholder with article theme */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 flex items-center justify-center">
                          <FiBookOpen className="w-8 h-8 text-gray-400" />
                        </div>
                        
                        {/* Tag overlay */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                            {article.tags[0]}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiUser className="w-3 h-3" />
                            <span>{article.author}</span>
                          </div>

                          <div className="flex items-center gap-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-sm font-medium">Read</span>
                            <FiArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredArticles.map((article, index) => (
                  <Link key={article.href} href={article.href} className="group block">
                    <article className={`bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-red-200 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`} style={{ transitionDelay: `${index * 50}ms` }}>
                      
                      <div className="grid md:grid-cols-4 gap-6 p-6">
                        <div className="md:col-span-1">
                          <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-blue-500/10 flex items-center justify-center">
                              <FiBookOpen className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
                                {article.tags[0]}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-3 space-y-3">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FiUser className="w-3 h-3" />
                              <span>{article.author}</span>
                            </div>
                            <span>•</span>
                            <span>{article.date}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <FiClock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300 leading-tight">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 leading-relaxed">
                            {article.excerpt}
                          </p>

                          <div className="flex items-center gap-2 pt-2">
                            {article.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
                <span>Load More Articles</span>
                <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Bottombar />

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}