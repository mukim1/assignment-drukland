import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Mail,
  MessageCircleMore,
  Search,
  ShoppingBasket,
  SquareUser,
  Truck,
  User,
} from "lucide-react";
import Form from "./form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top utility bar */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto flex justify-end space-x-5 text-sm text-gray-600 px-2">
          <Link
            href="/faq"
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <span> FAQ</span>
            <HelpCircle size={16} />
          </Link>
          <Link
            href="/inquiry"
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <span>Send Inquiry</span>
            <Mail size={16} />
          </Link>
          <Link
            href="/support"
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <span>Live Support</span>
            <MessageCircleMore size={16} />
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-900 flex items-center gap-1"
          >
            <span>Contact</span>
            <SquareUser size={16} />
          </Link>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white py-3 border-b border-gray-400 text-gray-900">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl lg:text-3xl font-bold text-black">
            Drukland.de
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/business"
              className="hover:text-gray-600 flex items-center gap-1"
            >
              <span>Business</span>
              <ChevronDown size={16} />
            </Link>
            <Link
              href="/products"
              className="hover:text-gray-600 flex items-center gap-1"
            >
              <span>Products</span>
              <ChevronDown size={16} />
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search"
                className="w-96 rounded-lg border border-gray-300 py-2 pl-12 pr-2 focus:border-gray-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Truck className="h-6 w-6 text-gray-600" />
              </Link>
              <Link href="/profile">
                <User className="h-6 w-6 text-gray-600" />
              </Link>
              <Link href="/profile">
                <ShoppingBasket className="h-6 w-6 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto my-12 flex flex-col lg:flex-row lg:space-x-12 px-2">
        {/* Service showcase */}
        <div className="flex-1 rounded-lg bg-white p-8 shadow-md">
          <div className="flex h-96 items-center justify-center text-gray-500 text-xl lg:text-2xl font-light">
            Image or Video <br /> of our services
          </div>
        </div>

        {/* Login form */}
        <div className="mt-8 w-full lg:mt-0 lg:w-96 text-gray-500 rounded-lg bg-white p-8 shadow-md">
          <div className="">
            <Link
              href="/"
              className="text-2xl lg:text-3xl text-black text-center block"
            >
              Drukland.de
            </Link>

            <h2 className="mt-5 text-center">Sign In to your account</h2>
            <p className="mb-6 text-center text-sm text-gray-600">
              Don&apos;t you have an account?{" "}
              <Link
                href="/register"
                className="text-black font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

            <Form />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 py-6 container mx-auto px-2 h-min">
        <div className="flex flex-col items-center justify-between space-y-4 text-sm text-gray-600 md:flex-row md:space-y-0">
          <div>All rights reserved © 2024 | Drukland.de</div>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-gray-900">
              Terms of Use
            </Link>
            <Link href="/sitemap" className="hover:text-gray-900">
              Sitemap
            </Link>
            <Link href="/company" className="hover:text-gray-900">
              Company information
            </Link>
            <Link href="/cookie-settings" className="hover:text-gray-900">
              Cookie settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
