import React from "react";
import { Link } from "@remix-run/react";
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
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { EvervaultCard } from "../components/ui/EvervaultCard";

export default function Index() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileCheck className="h-8 w-8 text-indigo-600" />
            <span className="font-semibold text-xl tracking-tight">
              ReValidate
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="#features"
              className="text-slate-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              features
            </Link>
            <Link
              to="#how-it-works"
              className="text-slate-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              how it works
            </Link>
            <Link
              to="#testimonials"
              className="text-slate-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              testimonials
            </Link>
            <Link
              to="#pricing"
              className="text-slate-600 hover:text-indigo-600 transition text-sm font-medium"
            >
              pricing
            </Link>
          </nav>
          <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
            Get started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-50 py-21">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>
        <div className="container relative mx-auto py-15 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-6 ring-1 ring-inset ring-indigo-500/20">
              <span>Science that stands the test of time</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-indigo-500 leading-tight">
              Restore trust in science through rigorous revalidation
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              The replication crisis undermines scientific credibility. Our
              platform enables researchers to verify, replicate, and strengthen
              scientific studies with transparent methodologies.
            </p>
            <p className="text-lg font-medium mb-10 text-indigo-600">
              Validate findings. Build confidence. Advance science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full px-8"
              >
                Start revalidating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full px-8"
              >
                See how it works
                <CheckCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-8 mb-12 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="aspect-video bg-slate-50 rounded-lg flex items-center justify-center mb-6 overflow-hidden relative border border-slate-100">
                <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                <div className="z-10 flex flex-col items-center">
                  <FileCheck className="h-16 w-16 text-indigo-200 mb-3" />
                  <span className="text-slate-400">
                    Dashboard preview: Grayscale interface with indigo
                    highlights for actions and progress indicators
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-8 items-center">
                <span className="text-sm text-slate-500 font-medium">
                  Trusted by
                </span>
                <div className="flex flex-wrap gap-8 justify-center">
                  <div className="h-8 opacity-60 text-slate-400 font-medium">
                    Stanford University
                  </div>
                  <div className="h-8 opacity-60 text-slate-400 font-medium">
                    Nature
                  </div>
                  <div className="h-8 opacity-60 text-slate-400 font-medium">
                    Science Foundation
                  </div>
                  <div className="h-8 opacity-60 text-slate-400 font-medium">
                    MIT
                  </div>
                  <div className="h-8 opacity-60 text-slate-400 font-medium">
                    OSF
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center max-w-xl mx-auto">
            <p className="text-lg font-medium text-slate-700 mb-4">
              Transform hypothesis to verified knowledge in a transparent,
              collaborative ecosystem
            </p>
            <div className="flex justify-center">
              <div className="p-3 bg-indigo-50 rounded-full">
                <BarChart3 className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20">
              <span>Why choose us</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Why researchers choose ReValidate
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform provides the tools and framework needed to ensure
              scientific integrity
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group">
              <div className="flex flex-col items-start">
                <div className="p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors">
                  <Search className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Transparent Methodology
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Detailed protocols and complete methodologies ensure true
                  replicability and build trust in the scientific community.
                </p>
                <Button
                  variant="ghost"
                  className="text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
            <Card className="p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group">
              <div className="flex flex-col items-start">
                <div className="p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Verification Framework
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Standardized protocols and statistical tools to verify or
                  challenge existing research with confidence and accuracy.
                </p>
                <Button
                  variant="ghost"
                  className="text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
            <Card className="p-8 border-slate-200 hover:shadow-lg transition-all duration-300 rounded-xl group">
              <div className="flex flex-col items-start">
                <div className="p-3 bg-indigo-50 rounded-xl mb-6 group-hover:bg-indigo-100 transition-colors">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Collaborative Network
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Connect with peers for independent validation and strengthen
                  the scientific community through collective expertise.
                </p>
                <Button
                  variant="ghost"
                  className="text-indigo-600 p-0 hover:bg-transparent hover:text-indigo-700 group-hover:translate-x-1 transition-transform"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Evervault Card Demo Section */}
      <section className="flex flex-col items-center py-0 px-0 bg-white w-full min-h-[350px]">
        <div className="w-full h-[350px] md:h-[420px] flex items-center justify-center">
          <EvervaultCard
            text="Bringing trust with math"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20">
              <span>The process</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Revalidation in three simple steps
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our structured approach ensures consistency and reliability across
              all revalidation projects.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-indigo-100 -translate-y-1/2 z-0"></div>
            <div className="flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md">
                <span className="text-indigo-600 font-bold text-lg">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Study</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Upload original research data and methodology for revalidation
                through our secure platform.
              </p>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md">
                <span className="text-indigo-600 font-bold text-lg">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Verify Process</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Independent researchers replicate experiments following
                standardized protocols with complete transparency.
              </p>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex flex-col items-center text-center relative z-10 bg-slate-50 p-6 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 shadow-md">
                <span className="text-indigo-600 font-bold text-lg">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Publish Results</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Receive detailed revalidation reports with confidence metrics
                and recommendations for improvement.
              </p>
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-full px-8">
              Start the revalidation process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA MIDPOINT */}
      <section className="py-20 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Strengthen the foundation of scientific knowledge
          </h2>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-slate-100 shadow-lg rounded-full px-8"
          >
            Join the revalidation movement
          </Button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20">
              <span>Testimonials</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              What researchers are saying
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Hear from scientists who have strengthened their research through
              our platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
              <div className="flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm">
                    <span className="text-indigo-600 font-medium">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Jane Doe</h4>
                    <p className="text-sm text-slate-500">
                      Neuroscience Professor
                    </p>
                  </div>
                </div>
                <div className="mb-4 text-indigo-50 relative">
                  <div className="absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3">
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
                      className="w-8 h-8 opacity-20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "ReValidate helped confirm our key findings while identifying
                  important methodological improvements. Our work is now
                  stronger and more credible."
                </p>
                <div className="flex text-indigo-500 mt-auto">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Card>
            <Card className="p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
              <div className="flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm">
                    <span className="text-indigo-600 font-medium">MS</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Mark Smith</h4>
                    <p className="text-sm text-slate-500">
                      Clinical Research Director
                    </p>
                  </div>
                </div>
                <div className="mb-4 text-indigo-50 relative">
                  <div className="absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3">
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
                      className="w-8 h-8 opacity-20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "The platform's rigorous approach revealed subtle statistical
                  issues in our initial analysis that we were able to correct
                  before publication."
                </p>
                <div className="flex text-indigo-500 mt-auto">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
              </div>
            </Card>
            <Card className="p-8 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
              <div className="flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 border-2 border-white shadow-sm">
                    <span className="text-indigo-600 font-medium">AL</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Dr. Anna Lee</h4>
                    <p className="text-sm text-slate-500">
                      Psychology Researcher
                    </p>
                  </div>
                </div>
                <div className="mb-4 text-indigo-50 relative">
                  <div className="absolute text-indigo-100 top-0 left-0 transform -translate-x-2 -translate-y-3">
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
                      className="w-8 h-8 opacity-20"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "ReValidate is transforming how we approach scientific
                  validation. The transparent ecosystem builds confidence in
                  findings across disciplines."
                </p>
                <div className="flex text-indigo-500 mt-auto">
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
            <p className="text-slate-500 mb-6 font-medium">Featured in</p>
            <div className="flex flex-wrap justify-center gap-12 items-center">
              <div className="h-8 opacity-60 text-slate-400 font-medium">
                Science
              </div>
              <div className="h-8 opacity-60 text-slate-400 font-medium">
                Nature
              </div>
              <div className="h-8 opacity-60 text-slate-400 font-medium">
                PNAS
              </div>
              <div className="h-8 opacity-60 text-slate-400 font-medium">
                Cell
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-12 shadow-xl border border-slate-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 mb-4 ring-1 ring-inset ring-indigo-500/20">
                <span>Get started</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to strengthen scientific integrity?
              </h2>
            </div>
            <ul className="mb-8 space-y-4 max-w-md mx-auto">
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                </div>
                <span className="ml-3 text-slate-700">
                  Validate methods and reproduce results with confidence
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                </div>
                <span className="ml-3 text-slate-700">
                  Join a community committed to scientific excellence
                </span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 p-1">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5" />
                </div>
                <span className="ml-3 text-slate-700">
                  Enhance the credibility and impact of your research
                </span>
              </li>
            </ul>
            <div className="text-center">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 shadow-lg rounded-full px-8"
              >
                Get started today
                <Clock className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="h-6 w-6 text-indigo-600" />
                <span className="font-semibold text-lg">ReValidate</span>
              </div>
              <p className="text-slate-500 mb-4 leading-relaxed">
                Strengthening scientific integrity through transparent
                revalidation.
              </p>
              <div className="flex gap-4">
                <Link
                  to="#"
                  className="text-slate-400 hover:text-indigo-600 transition"
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
                  className="text-slate-400 hover:text-indigo-600 transition"
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
                  className="text-slate-400 hover:text-indigo-600 transition"
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
                  className="text-slate-400 hover:text-indigo-600 transition"
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
              <h4 className="font-semibold mb-4 text-slate-800">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#features"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#how-it-works"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    to="#pricing"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-800">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-800">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-slate-500 hover:text-indigo-600 transition text-sm"
                  >
                    Data Handling
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="bg-slate-200 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 mb-4 md:mb-0">
              © 2023 ReValidate. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="text-xs text-slate-400 mr-2">Made with</span>
              <span className="text-indigo-500">♥</span>
              <span className="text-xs text-slate-400 ml-2">
                for scientific integrity
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
