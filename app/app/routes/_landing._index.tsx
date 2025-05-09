// @jsxImportSource react
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import {
  ArrowRight,
  CheckCircle,
  FileCheck,
  BarChart3,
  Users,
  Search,
  Shield,
  Clock,
  Trophy,
  Star,
} from "lucide-react";
import { EvervaultCard } from "~/components/ui/EvervaultCard";

export const meta: MetaFunction = () => {
  return [
    { title: "ReValidate - Strengthen Scientific Integrity" },
    {
      name: "description",
      content:
        "Our platform enables researchers to verify, replicate, and strengthen scientific studies with transparent methodologies.",
    },
  ];
};

export default function LandingIndex() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ReValidate Logo" className="h-14 w-14" />
            <span className="text-xl font-semibold tracking-tight">ReValidate</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Features
            </Link>
            <Link
              to="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              How it works
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Testimonials
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Pricing
            </Link>
          </nav>
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-slate-50 shadow-sm ring-offset-white transition-colors hover:bg-indigo-700 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
          >
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-50 py-28">
        <div className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="py-15 container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-500/20">
              <span>Science that stands the test of time</span>
            </div>
            <h1 className="mb-6 bg-gradient-to-r from-indigo-700 to-indigo-500 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
              Restore trust in science through rigorous revalidation
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-slate-600">
              The replication crisis undermines scientific credibility. Our platform enables
              researchers to verify, replicate, and strengthen scientific studies with transparent
              methodologies.
            </p>
            <p className="mb-10 text-lg font-medium text-indigo-600">
              Validate findings. Build confidence. Advance science.
            </p>
            <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex h-11 items-center justify-center rounded-full bg-indigo-600 px-8 text-sm font-medium text-slate-50 shadow-md ring-offset-white transition-colors hover:bg-indigo-700 hover:text-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
              >
                Start revalidating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.youtube.com/watch?v=qvAI-hRZBBc">
                  See how it works
                  <CheckCircle className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="mb-12 rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="relative mb-6 flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
                <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] opacity-40 [background-size:16px_16px]"></div>
                <div className="z-10 flex flex-col items-center">
                  <FileCheck className="mb-3 h-16 w-16 text-indigo-200" />
                  <span className="text-slate-400">
                    Dashboard preview: Grayscale interface with indigo highlights for actions and
                    progress indicators
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <span className="text-sm font-medium text-slate-500">Trusted by</span>
                <div className="flex flex-wrap justify-center gap-8">
                  <div className="h-8 font-medium text-slate-400 opacity-60">
                    Stanford University
                  </div>
                  <div className="h-8 font-medium text-slate-400 opacity-60">Nature</div>
                  <div className="h-8 font-medium text-slate-400 opacity-60">
                    Science Foundation
                  </div>
                  <div className="h-8 font-medium text-slate-400 opacity-60">MIT</div>
                  <div className="h-8 font-medium text-slate-400 opacity-60">OSF</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-4 text-lg font-medium text-slate-700">
              Transform hypothesis to verified knowledge in a transparent, collaborative ecosystem
            </p>
            <div className="flex justify-center">
              <div className="rounded-full bg-indigo-50 p-3">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-500/20">
              <span>Why choose us</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold">Why researchers choose ReValidate</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Our platform provides the tools and framework needed to ensure scientific integrity
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group rounded-xl border-slate-200 p-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-start">
                <div className="mb-6 rounded-xl bg-indigo-50 p-3 transition-colors group-hover:bg-indigo-100">
                  <Search className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Transparent Methodology</h3>
                <p className="mb-6 leading-relaxed text-slate-600">
                  Detailed protocols and complete methodologies ensure true replicability and build
                  trust in the scientific community.
                </p>
              </div>
            </Card>
            <Card className="group rounded-xl border-slate-200 p-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-start">
                <div className="mb-6 rounded-xl bg-indigo-50 p-3 transition-colors group-hover:bg-indigo-100">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Verification Framework</h3>
                <p className="mb-6 leading-relaxed text-slate-600">
                  Standardized protocols and statistical tools to verify or challenge existing
                  research with confidence and accuracy.
                </p>
              </div>
            </Card>
            <Card className="group rounded-xl border-slate-200 p-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex flex-col items-start">
                <div className="mb-6 rounded-xl bg-indigo-50 p-3 transition-colors group-hover:bg-indigo-100">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Collaborative Network</h3>
                <p className="mb-6 leading-relaxed text-slate-600">
                  Connect with peers for independent validation and strengthen the scientific
                  community through collective expertise.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Evervault Card Demo Section */}
      <section className="flex min-h-[350px] w-full flex-col items-center bg-white px-0 py-0">
        <div className="flex h-[350px] w-full items-center justify-center md:h-[420px]">
          <EvervaultCard text="Bringing trust with math" className="h-full w-full" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-500/20">
              <span>The process</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold">Revalidation in three simple steps</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Our structured approach ensures consistency and reliability across all revalidation
              projects.
            </p>
          </div>
          <div className="relative mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="absolute left-[20%] right-[20%] top-1/2 z-0 hidden h-0.5 -translate-y-1/2 bg-indigo-100 md:block"></div>
            <div className="relative z-10 flex flex-col items-center rounded-xl bg-slate-50 p-6 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 shadow-md">
                <span className="text-lg font-bold text-indigo-600">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Submit Study</h3>
              <p className="mb-4 leading-relaxed text-slate-600">
                Upload original research data and methodology for revalidation through our secure
                platform.
              </p>
              <div className="rounded-full bg-white p-2 shadow-sm">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center rounded-xl bg-slate-50 p-6 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 shadow-md">
                <span className="text-lg font-bold text-indigo-600">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Verify Process</h3>
              <p className="mb-4 leading-relaxed text-slate-600">
                Independent researchers replicate experiments following standardized protocols with
                complete transparency.
              </p>
              <div className="rounded-full bg-white p-2 shadow-sm">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center rounded-xl bg-slate-50 p-6 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 shadow-md">
                <span className="text-lg font-bold text-indigo-600">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Publish Results</h3>
              <p className="mb-4 leading-relaxed text-slate-600">
                Receive detailed revalidation reports with confidence metrics and recommendations
                for improvement.
              </p>
              <div className="rounded-full bg-white p-2 shadow-sm">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link to="/login">
              <Button className="rounded-full bg-indigo-600 px-8 shadow-md hover:bg-indigo-700">
                Start the revalidation process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-500/20">
              <span>Testimonials</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold">What researchers are saying</h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              Hear from scientists who have strengthened their research through our platform
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <Card className="rounded-xl border-slate-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-indigo-100 shadow-sm">
                    <span className="font-medium text-indigo-600">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Jane Doe</h4>
                    <p className="text-sm text-slate-500">Neuroscience Professor</p>
                  </div>
                </div>
                <div className="relative mb-4 text-indigo-50">
                  <div className="absolute left-0 top-0 -translate-x-2 -translate-y-3 transform text-indigo-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 opacity-20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-slate-600">
                  &quot;ReValidate helped confirm our key findings while identifying important
                  methodological improvements. Our work is now stronger and more credible.&quot;
                </p>
                <div className="mt-auto flex text-indigo-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Card>
            <Card className="rounded-xl border-slate-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-indigo-100 shadow-sm">
                    <span className="font-medium text-indigo-600">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Mark Smith</h4>
                    <p className="text-sm text-slate-500">Clinical Research Director</p>
                  </div>
                </div>
                <div className="relative mb-4 text-indigo-50">
                  <div className="absolute left-0 top-0 -translate-x-2 -translate-y-3 transform text-indigo-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 opacity-20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-slate-600">
                  &quot;The platform&apos;s rigorous approach revealed subtle statistical issues in
                  our initial analysis that we were able to correct before publication.&quot;
                </p>
                <div className="mt-auto flex text-indigo-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Card>
            <Card className="rounded-xl border-slate-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-indigo-100 shadow-sm">
                    <span className="font-medium text-indigo-600">AL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Anna Lee</h4>
                    <p className="text-sm text-slate-500">Psychology Researcher</p>
                  </div>
                </div>
                <div className="relative mb-4 text-indigo-50">
                  <div className="absolute left-0 top-0 -translate-x-2 -translate-y-3 transform text-indigo-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 opacity-20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-6 leading-relaxed text-slate-600">
                  &quot;ReValidate is transforming how we approach scientific validation. The
                  transparent ecosystem builds confidence in findings across disciplines.&quot;
                </p>
                <div className="mt-auto flex text-indigo-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-16 text-center">
            <p className="mb-6 font-medium text-slate-500">Featured in</p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              <div className="h-8 font-medium text-slate-400 opacity-60">Science</div>
              <div className="h-8 font-medium text-slate-400 opacity-60">Nature</div>
              <div className="h-8 font-medium text-slate-400 opacity-60">PNAS</div>
              <div className="h-8 font-medium text-slate-400 opacity-60">Cell</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-12 shadow-xl">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-500/20">
                <span>Get started</span>
              </div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Ready to strengthen scientific integrity?
              </h2>
            </div>
            <ul className="mx-auto mb-8 max-w-md space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-600" />
                </div>
                <span className="ml-3 text-slate-700">
                  Validate methods and reproduce results with confidence
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-600" />
                </div>
                <span className="ml-3 text-slate-700">
                  Join a community committed to scientific excellence
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-indigo-600" />
                </div>
                <span className="ml-3 text-slate-700">
                  Enhance the credibility and impact of your research
                </span>
              </li>
            </ul>
            <div className="text-center">
              <Button
                size="lg"
                className="rounded-full bg-indigo-600 px-8 shadow-lg hover:bg-indigo-700"
                asChild
              >
                <a href="https://cal.com/revalidate/30min">
                  Get started today
                  <Clock className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pb-8 pt-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-indigo-600" />
                <span className="text-lg font-semibold">ReValidate</span>
              </div>
              <p className="mb-4 leading-relaxed text-slate-500">
                Strengthening scientific integrity through transparent revalidation.
              </p>
            </div>
          </div>
          <Separator className="mb-8 bg-slate-200" />
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-slate-500 md:mb-0">
              © 2025 ReValidate. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="mr-2 text-xs text-slate-400">Made with</span>
              <span className="text-indigo-500">♥</span>
              <span className="ml-2 text-xs text-slate-400">for scientific integrity</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
