"use client";

import {
  Upload,
  Sparkles,
  Lock,
  Zap,
  FileText,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Placeholder handlers for navigation

const handleViewPricing = () => {
  // TODO: Scroll to pricing section or navigate to pricing page
  const pricingSection = document.getElementById("pricing");
  pricingSection?.scrollIntoView({ behavior: "smooth" });
};

const handleUpgrade = () => {
  // TODO: Navigate to Clerk billing checkout
  console.log("Navigate to Clerk billing checkout");
};

export default function Home() {
  const router = useRouter();
  const handleUploadResume = () => {
    router.push("/upload");
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            {/* Main headline - clear value proposition */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Get instant, AI-powered feedback on your resume
            </h1>

            {/* Subheadline explaining free vs paid value */}
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
              Upload your resume for free. Unlock detailed insights with
              ResumePro.
            </p>

            {/* CTA buttons - primary and secondary actions */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={handleUploadResume}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upload Resume
              </Button>
              <Button onClick={handleViewPricing} variant="outline" size="lg">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How ResumePro Works Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How ResumePro Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get professional resume feedback in three simple steps
            </p>
          </div>

          {/* Three-step layout with icons */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-3">
              {/* Step 1: Upload */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Upload
                    className="h-8 w-8 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  1. Upload your resume
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Upload your resume as a PDF file
                </p>
              </div>

              {/* Step 2: Receive feedback */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Sparkles
                    className="h-8 w-8 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  2. Receive instant AI feedback
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Get immediate analysis powered by AI
                </p>
              </div>

              {/* Step 3: Upgrade */}
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Lock className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  3. Upgrade to unlock full analysis
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Access detailed insights and improvement tips
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose ResumePro
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to improve your resume
            </p>
          </div>

          {/* Features grid - responsive layout */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature: AI-powered analysis */}
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Sparkles
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  AI-powered resume analysis
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Advanced AI technology provides comprehensive feedback on your
                  resume
                </p>
              </div>

              {/* Feature: Actionable suggestions */}
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <CheckCircle2
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Actionable improvement suggestions
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Get specific, actionable tips to enhance your resume's
                  effectiveness
                </p>
              </div>

              {/* Feature: ATS-friendly feedback */}
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <FileText
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  ATS-friendly feedback
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Optimize your resume for Applicant Tracking Systems
                </p>
              </div>

              {/* Feature: Secure authentication */}
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Shield
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Secure authentication with Clerk
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Your data is protected with industry-standard security
                </p>
              </div>

              {/* Feature: Fast experience */}
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Zap className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Fast, browser-based experience
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  No downloads required. Get feedback instantly in your browser
                </p>
              </div>

              {/* Feature: No payment to try */}
              <div className="flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <CheckCircle2
                    className="h-6 w-6 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  No payment required to try
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Start with free basic feedback. Upgrade when you're ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section id="pricing" className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the plan that works for you
            </p>
          </div>

          {/* Pricing cards - two column layout on larger screens */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Free Plan Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-base text-gray-600">
                        Basic resume summary
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-green-600"
                        aria-hidden="true"
                      />
                      <span className="text-base text-gray-600">
                        Limited feedback
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Pro Plan Card - highlighted/recommended */}
              <Card className="relative border-2 border-blue-600 shadow-lg">
                {/* Recommended badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    Recommended
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Full access to all features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-blue-600"
                        aria-hidden="true"
                      />
                      <span className="text-base text-gray-600">
                        Full AI analysis
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-blue-600"
                        aria-hidden="true"
                      />
                      <span className="text-base text-gray-600">
                        Detailed improvement tips
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-blue-600"
                        aria-hidden="true"
                      />
                      <span className="text-base text-gray-600">
                        Exportable feedback
                      </span>
                    </li>
                  </ul>
                  <Button
                    onClick={handleUpgrade}
                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Upgrade with Secure Checkout
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Powered by Clerk secure checkout
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trust & Transparency
            </h2>
            <div className="mt-8 space-y-4 text-left text-base leading-7 text-gray-600">
              <p>
                <strong className="font-semibold text-gray-900">
                  Secure payments:
                </strong>{" "}
                Payments run in test mode for demo purposes. All transactions
                are processed securely through Clerk Billing.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">
                  Authentication & billing:
                </strong>{" "}
                Your account security and payment processing are handled
                entirely by Clerk, a trusted platform used by thousands of
                applications.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">
                  Data privacy:
                </strong>{" "}
                Resume data is not permanently stored. Analysis results may be
                temporarily saved in your browser's localStorage for demo
                purposes only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call To Action Section */}
      <section className="bg-blue-600 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to improve your resume?
          </h2>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Join thousands of job seekers who have improved their resumes with
            ResumePro's AI-powered feedback.
          </p>
          <div className="mt-10">
            <Button
              onClick={handleUploadResume}
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              Get Resume Feedback
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
