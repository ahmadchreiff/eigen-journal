
import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiBookOpen, FiTrendingUp, FiUsers, FiStar, FiCalendar, FiEye, FiHeart, FiShare2 } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Bottombar from '@/components/Bottombar';

import Link from 'next/link';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    {
      title: 'Computer Science',
      href: '/articles?category=cmps',
      icon: '💻',
      gradient: 'from-blue-500 to-red-600',
      articles: 42,
      description: 'Algorithms, AI, and cutting-edge computational research'
    },
    {
      title: 'Mathematics',
      href: '/articles?category=math',
      icon: '🔢',
      gradient: 'from-green-500 to-teal-600',
      articles: 38,
      description: 'Pure mathematics, applied theory, and mathematical modeling'
    },
    {
      title: 'Physics',
      href: '/articles?category=phys',
      icon: '⚛️',
      gradient: 'from-orange-500 to-red-600',
      articles: 29,
      description: 'Quantum mechanics, astrophysics, and experimental research'
    },
  ];

  const featuredStats = [
    { label: 'Published Articles', value: '109', icon: FiBookOpen },
    { label: 'Active Contributors', value: '47', icon: FiUsers },
    { label: 'Monthly Readers', value: '2.3K', icon: FiEye },
    { label: 'Impact Score', value: '8.4', icon: FiTrendingUp },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
        {/* <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center opacity-10"></div> */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/quantum123/1920/1080')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
              Academic Excellence
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-red-100 leading-relaxed">
              Discover groundbreaking research and scholarly articles from leading academics worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                Explore Articles
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-red-300 text-red-100 rounded-full font-semibold hover:bg-red-300 hover:text-red-900 transition-all duration-300">
                Browse Categories
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-500 rounded-full opacity-20 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-spin-reverse"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-red-600 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Research</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Spotlight on the most impactful and innovative research from our community
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                        Computer Science
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <FiStar className="fill-current" />
                        <span className="text-gray-600 text-sm">Featured</span>
                      </div>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      Quantum Computing Applications in Machine Learning Optimization
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      This groundbreaking research explores the intersection of quantum computing and machine learning,
                      presenting novel algorithms that achieve exponential speedup in optimization problems.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        <span>Dec 15, 2024</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiEye className="w-4 h-4" />
                        <span>2.1K views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiHeart className="w-4 h-4" />
                        <span>89 likes</span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      Read Full Article
                      <FiArrowRight />
                    </button>
                  </div>
                  <div className="lg:w-1/3">
                    <div className="bg-gradient-to-br from-red-100 to-blue-100 rounded-2xl p-8 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🔬</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="text-sm font-medium mb-1">Author</div>
                        <div className="font-bold">Dr. Sarah Chen</div>
                        <div className="text-xs text-gray-500 mt-1">MIT Computer Science</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into specialized fields of academic research and discovery
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{category.articles} articles</span>
                      <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Academic Community</h2>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Connect with researchers, share your work, and contribute to the advancement of knowledge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
              <FiUsers />
              Join Community
            </button>
            <Link href="/submit" passHref>
              <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center justify-center gap-2">
                <FiShare2 />
                Submit Research
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Bottombar />

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </div>
  );
}