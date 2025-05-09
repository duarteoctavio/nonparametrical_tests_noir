// @jsxImportSource react
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/landing/button";
import { Card } from "~/components/landing/card";
import { Separator } from "~/components/landing/separator";
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
import { EvervaultCard } from "~/components/landing/EvervaultCard";

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
            <FileCheck className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-semibold tracking-tight">ReValidate</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              features
            </Link>
            <Link
              to="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              how it works
            </Link>
            <Link
              to="#testimonials"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              testimonials
            </Link>
            <Link
              to="#pricing"
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              pricing
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
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-indigo-600 px-8 text-indigo-600 hover:bg-indigo-50"
              >
                See how it works
                <CheckCircle className="ml-2 h-5 w-5" />
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
                <Button
                  variant="ghost"
                  className="p-0 text-indigo-600 transition-transform hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
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
                <Button
                  variant="ghost"
                  className="p-0 text-indigo-600 transition-transform hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
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
                <Button
                  variant="ghost"
                  className="p-0 text-indigo-600 transition-transform hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
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
            <Button className="rounded-full bg-indigo-600 px-8 shadow-md hover:bg-indigo-700">
              Start the revalidation process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA MIDPOINT */}
      <section className="bg-gradient-to-br from-indigo-500 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">
            Strengthen the foundation of scientific knowledge
          </h2>
          <Button
            size="lg"
            className="rounded-full bg-white px-8 text-indigo-700 shadow-lg hover:bg-slate-100"
          >
            Join the revalidation movement
          </Button>
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
              >
                Get started today
                <Clock className="ml-2 h-5 w-5" />
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
              <div className="flex gap-4">
                <Link
                  to="#"
                  className="text-slate-400 transition hover:text-indigo-600"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-slate-400 transition hover:text-indigo-600"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-slate-400 transition hover:text-indigo-600"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-slate-400 transition hover:text-indigo-600"
                  aria-label="Dribbble"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-800">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#features"
                    className="text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#how-it-works"
                    className="text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    to="#pricing"
                    className="text-sm text-slate-500 transition hover:text-indigo-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-800">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-slate-800">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-slate-500 transition hover:text-indigo-600">
                    Data Handling
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="mb-8 bg-slate-200" />
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-slate-500 md:mb-0">
              © 2023 ReValidate. All rights reserved.
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
