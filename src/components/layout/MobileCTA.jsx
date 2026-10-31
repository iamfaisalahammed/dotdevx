import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function MobileCTA() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello DotDevX, I would like to discuss a project."
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#08090B]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>
        ) : (
          <Link
            href="/services"
            className="flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Our Services
          </Link>
        )}

        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2BFF88] py-3 text-sm font-semibold text-[#04120A] transition-colors hover:bg-[#52FF9D]"
        >
          Start a Project
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </div>
  );
}