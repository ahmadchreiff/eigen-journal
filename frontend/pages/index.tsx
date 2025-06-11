import Head from 'next/head';
import Link from 'next/link';

/** AUB brand color */
const aubRed = '#840132';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Eigen Journal · AUB STEM</title>
        <meta name="description" content="AUB's student-led journal featuring technical writing and research in Computer Science, Mathematics, and Physics." />
      </Head>

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 py-4 shadow" style={{ backgroundColor: aubRed }}>
        <h1 className="text-white text-2xl font-extrabold tracking-wide">
          The Eigen Journal
        </h1>
        <nav className="space-x-4 text-white">
          <Link href="/articles" className="hover:underline">Articles</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/submit" className="bg-white text-[${aubRed}] px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100">Submit</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Where AUB STEM students publish ideas worth sharing
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
          Dive into cutting-edge articles and insights in Computer Science, Mathematics, and Physics — curated by and for AUB students.
        </p>
        <Link href="/articles" className="inline-block bg-[${aubRed}] text-white px-6 py-2 rounded font-semibold hover:bg-opacity-90">
          Explore Articles
        </Link>
      </section>

      {/* FEATURED ARTICLE PREVIEW (STATIC EXAMPLE) */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Featured Article</h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="aspect-video bg-gray-300 rounded"></div>
          <div>
            <h4 className="text-xl font-semibold text-gray-800">The Mathematics of Quantum Chaos</h4>
            <p className="text-gray-600 mt-2 mb-4">
              An exploration of how deterministic systems exhibit seemingly random behavior — and why it matters in physics.
            </p>
            <Link href="/articles/quantum-chaos" className="text-[${aubRed}] font-semibold hover:underline">
              Read Full Article →
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY TEASERS */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Computer Science', href: '/articles?category=cmps' },
            { title: 'Mathematics', href: '/articles?category=math' },
            { title: 'Physics', href: '/articles?category=phys' },
          ].map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="block p-6 rounded-lg shadow hover:shadow-md bg-white border"
            >
              <h5 className="text-lg font-bold mb-2 text-[${aubRed}]">{cat.title}</h5>
              <p className="text-gray-700 text-sm">Discover student articles and tutorials in {cat.title}.</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-gray-500 bg-gray-100">
        © {new Date().getFullYear()} The Eigen Journal — AUB STEM. All rights reserved.
      </footer>
    </>
  );
}
