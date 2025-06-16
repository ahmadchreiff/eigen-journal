import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiBookmark, FiUser, FiSearch, FiMenu, FiX, FiChevronDown, FiPlusCircle } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-detect active section based on current route
  useEffect(() => {
    const path = router.pathname;
    const query = router.query;

    if (path === '/') {
      setActiveSection('home');
    } else if (path === '/about') {
      setActiveSection('about');
    } else if (path === '/submit') {
      setActiveSection('submit');
    } else if (path === '/articles') {
      if (query.category === 'cmps') {
        setActiveSection('cmps');
      } else if (query.category === 'math') {
        setActiveSection('math');
      } else if (query.category === 'phys') {
        setActiveSection('phys');
      } else {
        setActiveSection('home'); // Default fallback
      }
    } else {
      setActiveSection('home'); // Default fallback
    }
  }, [router.pathname, router.query]);

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'cmps', label: 'Computer Science', href: '/cmps' },
    { id: 'math', label: 'Mathematics', href: '/math' },
    { id: 'phys', label: 'Physics', href: '/phys' },
    { id: 'about', label: 'About', href: '/about' }
  ];

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-red-900/5 border-b border-red-100/50'
        : 'bg-gradient-to-b from-red-900 via-red-800 to-red-900'
        }`}>

        {/* Subtle animated background pattern */}
        {!isScrolled && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-0 right-1/3 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo Section - Quanta-inspired minimalism */}
            <div className="flex items-center gap-4 group">
              <div className="relative">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 ${isScrolled
                  ? 'bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-600/20'
                  : 'bg-white/20 backdrop-blur-sm border border-white/30'
                  }`}>
                  {/* <span className={`font-bold text-lg lg:text-xl ${isScrolled ? 'text-white' : 'text-white'
                    }`}>Σ</span> */}
                  <Image
                    src="/logo.png"
                    alt="Eigen Journal Logo"
                    width={48}
                    height={48}
                    className="rounded-md object-contain"
                  />
                </div>
              </div>

              <div>
                <h1 className={`text-xl lg:text-2xl font-light tracking-tight ${isScrolled
                  ? 'text-gray-900'
                  : 'text-white'
                  }`}>
                  <span className="font-normal">The</span>{' '}
                  <span className="font-semibold">Eigen Journal</span>
                </h1>
                <p className={`text-xs lg:text-sm font-light tracking-wider ${isScrolled
                  ? 'text-red-600'
                  : 'text-red-200'
                  }`}>
                  American University of Beirut
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${activeSection === item.id
                    ? isScrolled
                      ? 'text-red-700 bg-red-50 shadow-sm'
                      : 'text-white bg-white/20 backdrop-blur-sm'
                    : isScrolled
                      ? 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                      : 'text-red-100 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full ${isScrolled ? 'bg-red-600' : 'bg-white'
                      }`} />
                  )}
                </Link>
              ))}

              {/* Submit Button - Special styling */}
              <Link
                href="/submit"
                className={`relative px-4 py-2 ml-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeSection === 'submit'
                  ? isScrolled
                    ? 'text-white bg-gradient-to-r from-red-600 to-blue-600 shadow-lg shadow-red-600/30'
                    : 'text-white bg-white/30 backdrop-blur-sm border border-white/50'
                  : isScrolled
                    ? 'text-white bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 shadow-lg shadow-red-600/20'
                    : 'text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30'
                  }`}
              >
                <FiPlusCircle className="w-4 h-4" />
                Submit
                {activeSection === 'submit' && (
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 rounded-full ${isScrolled ? 'bg-white' : 'bg-white'
                    }`} />
                )}
              </Link>
            </nav>

            {/* Right Section - Refined interactions */}
            <div className="flex items-center gap-2 lg:gap-3">

              {/* Search - Expandable with Quanta styling */}
              <div className={`relative transition-all duration-300 ${searchFocused ? 'w-56 lg:w-64' : 'w-auto'}`}>
                <div className="flex items-center">
                  {!searchFocused ? (
                    <button
                      onClick={() => setSearchFocused(true)}
                      className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled
                        ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                        : 'text-red-100 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      <FiSearch className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className={`h-9 lg:h-10 w-56 lg:w-64 pl-4 pr-10 rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${isScrolled
                          ? 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-red-500 focus:border-red-500'
                          : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-red-200 focus:ring-white focus:border-white'
                          }`}
                        autoFocus
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                      />
                      <button
                        onClick={() => setSearchFocused(false)}
                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isScrolled ? 'text-gray-400 hover:text-gray-600' : 'text-red-200 hover:text-white'
                          }`}
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons - Minimalist */}
              <div className="hidden sm:flex items-center gap-1 lg:gap-2">
                <button className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all duration-300 group ${isScrolled
                  ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  : 'text-red-100 hover:text-white hover:bg-white/10'
                  }`}>
                  <FiBookmark className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                </button>

                <button className={`w-9 h-9 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 ${isScrolled
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30'
                  }`}>
                  <FiUser className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled
                  ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  : 'text-red-100 hover:text-white hover:bg-white/10'
                  }`}
              >
                {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Clean slide-down */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="bg-white border-t border-red-100">

            {/* Mobile Search */}
            <div className="px-4 py-4 border-b border-red-50">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 font-medium transition-all duration-200 ${activeSection === item.id
                    ? 'text-red-700 bg-red-50 border-r-2 border-red-600'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Submit Button */}
              <Link
                href="/submit"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 font-semibold transition-all duration-200 flex items-center gap-2 ${activeSection === 'submit'
                  ? 'text-white bg-gradient-to-r from-red-600 to-blue-600 border-r-2 border-blue-600'
                  : 'text-white bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700'
                  }`}
              >
                <FiPlusCircle className="w-4 h-4" />
                Submit Research
              </Link>
            </nav>

            {/* Mobile Actions */}
            <div className="px-4 py-4 border-t border-red-50 bg-gray-50">
              <div className="flex items-center gap-3">
                <button className="flex-1 h-11 rounded-lg bg-white border border-gray-200 flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 hover:border-red-300 transition-all duration-200">
                  <FiBookmark className="w-4 h-4" />
                  <span className="font-medium text-sm">Bookmarks</span>
                </button>

                <button className="flex-1 h-11 rounded-lg bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 text-white transition-all duration-200 shadow-lg shadow-red-600/20">
                  <FiUser className="w-4 h-4" />
                  <span className="font-medium text-sm">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle bottom accent */}
        {!isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-30"></div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}