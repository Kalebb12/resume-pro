import Link from "next/link";
import { FileText, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ResumePro</span>
            </Link>
            <p className="text-sm text-gray-600">
              AI-powered resume review to help you land your dream job.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Upload Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  <Twitter className="h-4 w-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} ResumePro. All rights reserved.
            </p>
            <p className="text-sm text-gray-600">
              Powered by{" "}
              <a
                href="https://clerk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Clerk
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
