"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { MessageCircleMore, X } from "lucide-react";

const WHATSAPP_NUMBER = "8801820037321";

const WhatsAppIcon = ({ className = "" }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.68-1.71A12.94 12.94 0 0 0 16.003 29C23.17 29 29 23.17 29 16S23.17 3 16.003 3zm0 23.7c-1.95 0-3.86-.53-5.53-1.52l-.4-.24-3.96 1.01 1.06-3.86-.26-.4A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.7 10.7zm5.87-8c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.26-.19.21-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.68s1.15 3.11 1.31 3.32c.16.21 2.27 3.46 5.5 4.85.77.33 1.37.53 1.84.68.77.25 1.47.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37z" />
  </svg>
);

const pillClass =
  "group flex items-center gap-3 rounded-full border border-black/10 bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-black shadow-[0_0_0_1px_rgba(0,0,0,0.25),0_12px_32px_rgba(0,0,0,0.5)] transition-transform duration-200 active:scale-95";

const iconCircle =
  "flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover:scale-105";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Tawk-এর ডিফল্ট ভাসমান আইকন (মানুষের মতো বাবল) সবসময় লুকিয়ে রাখা
  useEffect(() => {
    const hide = () => window.Tawk_API?.hideWidget?.();

    window.Tawk_API = window.Tawk_API || {};
    const prevLoad = window.Tawk_API.onLoad;
    window.Tawk_API.onLoad = () => {
      prevLoad?.();
      hide();
    };
    window.Tawk_API.onChatMinimized = hide;

    hide(); // স্ক্রিপ্ট আগেই লোড হয়ে থাকলে
    let tries = 0;
    const timer = setInterval(() => {
      hide();
      if (++tries >= 10) clearInterval(timer);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 250);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

    useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 250;
      setVisible(show);
      if (!show) setOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openLiveChat = () => {
    window.Tawk_API?.showWidget?.();
    window.Tawk_API?.maximize?.();
    setOpen(false);
  };

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 28 };

  const item = (i) => ({
    initial: { opacity: 0, y: 16, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { ...spring, delay: reduce ? 0 : i * 0.06 } },
    exit: { opacity: 0, y: 12, scale: 0.9, transition: { duration: 0.15 } },
  });

  return (
    <AnimatePresence>
      {visible && (
        <>
          <AnimatePresence>
            {open && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px]"
              />
            )}
          </AnimatePresence>

          <motion.div
            key="fab"
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            transition={spring}
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
          >
            <AnimatePresence>
              {open && (
                <>
                  {/* Live Chat: সরাসরি লাল */}
                  <motion.button
                    key="chat"
                    {...item(1)}
                    type="button"
                    onClick={openLiveChat}
                    className={pillClass}
                  >
                    Live Chat
                    <span className={`${iconCircle} bg-[#E11D2E]`}>
                      <MessageCircleMore size={20} strokeWidth={2.2} />
                    </span>
                  </motion.button>

                  {/* WhatsApp: সরাসরি সবুজ */}
                  <motion.a
                    key="wa"
                    {...item(0)}
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className={pillClass}
                  >
                    WhatsApp
                    <span className={`${iconCircle} bg-[#25D366]`}>
                      <WhatsAppIcon className="h-6 w-6" />
                    </span>
                  </motion.a>
                </>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close contact menu" : "Open contact menu"}
              aria-expanded={open}
              whileTap={{ scale: 0.92 }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-[0_0_0_1px_rgba(0,0,0,0.4),0_12px_32px_rgba(0,0,0,0.55)] transition-transform duration-200 hover:scale-105"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "chat"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className="flex"
                >
                  {open ? <X size={24} strokeWidth={2.4} /> : <MessageCircleMore size={24} strokeWidth={2.2} />}
                </motion.span>
              </AnimatePresence>

              {!open && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-black bg-white" />
                </span>
              )}
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}