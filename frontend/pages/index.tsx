import Head from 'next/head';
import Link from 'next/link';

/** Brand color (AUB dark red) */
const brand = '#840132';

export default function Home() {
  return (
    <>
      <Head>
        <title>The Eigen Journal · AUB STEM Newsletter</title>
        <meta
          name="description"
          content="Student-led CMPS, MATH & PHYS technical journal at the American University of Beirut."
        />
      </Head>

      {/* PAGE WRAPPER */}
      <div className="flex min-h-screen flex-col bg-white text-gray-900">

        {/* ===== NAVBAR ===== */}
        <nav
          className="flex items-center justify-between px-6 py-4 shadow-md"
          style={{ backgroundColor: brand }}
        >
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-white">
            The&nbsp;Eigen&nbsp;Journal
          </Link>

          <div className="space-x-6 text-white">
            <Link href="/articles">Articles</Link>
            <Link href="/about">About</Link>
            <Link href="/submit" className="rounded bg-white px-4 py-1.5 font-semibold text-[##840132] text-center text-sm hover:bg-gray-100">
              Submit&nbsp;Article
            </Link>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <header
          className="flex flex-col items-center justify-center py-24 text-center text-white"
          style={{ backgroundColor: brand }}
        >
          <h1 className="mb-4 text-5xl font-black leading-tight">
            Amplifying&nbsp;AUB’s&nbsp;STEM&nbsp;Voices
          </h1>
          <p className="mb-8 max-w-xl text-lg sm:text-xl">
            Peer-reviewed articles, research insights, and thought leadership from
            Computer Science, Mathematics, and Physics students.
          </p>

          <Link
            href="/articles"
            className="rounded bg-white px-6 py-3 font-semibold text-[##840132] hover:bg-gray-200"
          >
            Explore&nbsp;Articles
          </Link>
        </header>

        {/* ===== LATEST ARTICLES SECTION ===== */}
        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="mb-8 text-3xl font-bold">Latest Articles</h2>

          {/* TODO: Replace static cards with dynamic data */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {['1', '2', '3'].map((id) => (
              <article key={id} className="flex flex-col overflow-hidden rounded-lg border shadow-sm">
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    Sample Article&nbsp;{id}
                  </h3>
                  <p className="flex-1 text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                    sed justo nec lacus dictum…
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-3 text-sm text-gray-600">
                  By&nbsp;<span className="font-medium">Contributor&nbsp;Name</span>
                  &nbsp;·&nbsp;Jun&nbsp;11&nbsp;2025
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/articles"
              className="inline-block rounded border border-[##840132] px-5 py-2 font-medium text-[##840132] hover:bg-[##840132] hover:text-white"
            >
              View&nbsp;All&nbsp;Articles
            </Link>
          </div>
        </section>

        {/* ===== DISCIPLINE QUICK-LINK CARDS ===== */}
        <section className="bg-gray-100 py-16">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Computer Science', slug: 'cmps' },
              { title: 'Mathematics', slug: 'math' },
              { title: 'Physics', slug: 'phys' },
            ].map(({ title, slug }) => (
              <Link
                key={slug}
                href={`/articles?category=${slug}`}
                className="flex flex-col items-center justify-center rounded-lg bg-white p-10 text-center shadow hover:shadow-lg"
              >
                <span className="mb-3 text-2xl font-bold" style={{ color: brand }}>
                  {title}
                </span>
                <span className="text-gray-600">Browse {title} articles →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== CALL TO ACTION ===== */}
        <section
          className="flex flex-col items-center justify-center py-20 text-center text-white"
          style={{ backgroundColor: brand }}
        >
          <h2 className="mb-4 text-3xl font-bold">
            Ready to showcase your research?
          </h2>
          <p className="mb-8 max-w-xl text-lg">
            We welcome original work, insightful essays, and in-depth tutorials
            from AUB’s STEM community.
          </p>
          <Link
            href="/submit"
            className="rounded bg-white px-6 py-3 font-semibold text-[##840132] hover:bg-gray-200"
          >
            Submit&nbsp;Your&nbsp;Article
          </Link>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="mt-auto bg-gray-900 px-6 py-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} The Eigen Journal · American University of Beirut.
          &nbsp;All rights reserved.
        </footer>
      </div>
    </>
  );
}
