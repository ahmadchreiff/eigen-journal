// pages/about.tsx
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Bottombar from '@/components/Bottombar';

export default function About() {
  return (
    <>
      <Head>
        <title>About · The Eigen Journal</title>
        <meta name="description" content="Learn about the mission, vision, and team behind The Eigen Journal at AUB." />
      </Head>

      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />

        <main className="max-w-4xl mx-auto px-6 py-20 text-gray-800">
          <h1 className="text-4xl font-bold text-center mb-10">About The Eigen Journal</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              The Eigen Journal is AUB’s premier student-led STEM publication. Our mission is to amplify the voices
              of aspiring scientists, engineers, and mathematicians by providing a platform for sharing original
              research, technical writing, and academic commentary across the fields of Computer Science, Mathematics,
              and Physics.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">What We Publish</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              We publish high-quality student-written content, including exploratory articles, research summaries,
              theoretical insights, and opinion pieces. We aim to make technical concepts accessible while maintaining
              academic rigor.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              The journal is run by a team of AUB students from the Computer Science, Math, and Physics departments,
              working collaboratively to review submissions, maintain editorial standards, and foster a community of
              scientific inquiry.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Why "Eigen"?</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              “Eigen” comes from the German word for “own” or “inherent.” In mathematics and physics, eigenvalues and
              eigenvectors represent the intrinsic structure of a system. The name reflects our commitment to surfacing
              original, authentic thought—insights that reveal the underlying structure of complex problems.
            </p>
          </section>
        </main>

        <Bottombar />
      </div>
    </>
  );
}
