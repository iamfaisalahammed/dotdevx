
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center bg-[#08090B] text-white">
      <Container className="py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#2BFF88]">
          Error 404
        </p>

        <h1 className="mt-6 text-6xl font-bold tracking-tight sm:text-8xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
          Page not found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/50">
          The page you are looking for may have been moved,
          removed, or does not exist.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#2BFF88] px-6 py-3.5 text-sm font-semibold text-[#04120A] hover:bg-[#52FF9D]"
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white hover:border-[#2BFF88]/40 hover:text-[#2BFF88]"
          >
            <ArrowLeft size={17} />
            Contact Us
          </Link>
        </div>
      </Container>
    </main>
  );
}
