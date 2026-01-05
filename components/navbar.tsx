"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useRouter } from "next/router";

export function Navbar() {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">ResumePro</span>
        </Link>

        {/* Navigation Links - Hidden on mobile, shown on desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Pricing
          </Link>
          <Link
            href="#features"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Features
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <Button
              size="sm"
              onClick={() => {
                // TODO: Navigate to upload page
                router.push("/upload");
              }}
            >
              Get Started
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
