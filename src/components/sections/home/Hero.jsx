"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/* ১. কোড এডিটরের লেখা — একটার পর একটা টাইপ হবে, মুছবে, আবার আসবে     */
/* ------------------------------------------------------------------ */
const snippets = [
  {
    file: "agency.config.js",
    lines: [
      [{ t: "// .DevX — we build, you grow", c: "text-white/35" }],
      [
        { t: "const ", c: "text-[#75A0FF]" },
        { t: "agency", c: "text-[#F5F7F6]" },
        { t: " = {", c: "text-white/60" },
      ],
      [
        { t: "  name: ", c: "text-white/60" },
        { t: '".DevX"', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: "  home: ", c: "text-white/60" },
        { t: '"Bangladesh"', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: "  reach: ", c: "text-white/60" },
        { t: '"Worldwide"', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: "  promise: ", c: "text-white/60" },
        { t: '"Clean code. Bold design."', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [{ t: "};", c: "text-white/60" }],
    ],
  },
  {
    file: "launch.js",
    lines: [
      [{ t: "// From idea to live website", c: "text-white/35" }],
      [
        { t: "function ", c: "text-[#75A0FF]" },
        { t: "launch", c: "text-[#4F83FF]" },
        { t: "(idea) {", c: "text-white/60" },
      ],
      [
        { t: "  return ", c: "text-[#75A0FF]" },
        { t: "design", c: "text-[#F5F7F6]" },
        { t: "(idea)", c: "text-white/60" },
      ],
      [
        { t: "    .", c: "text-white/60" },
        { t: "build", c: "text-[#4F83FF]" },
        { t: "()", c: "text-white/60" },
      ],
      [
        { t: "    .", c: "text-white/60" },
        { t: "optimize", c: "text-[#4F83FF]" },
        { t: "()", c: "text-white/60" },
      ],
      [
        { t: "    .", c: "text-white/60" },
        { t: "deploy", c: "text-[#4F83FF]" },
        { t: "(); ", c: "text-white/60" },
        { t: "// you grow", c: "text-white/35" },
      ],
      [{ t: "}", c: "text-white/60" }],
    ],
  },
  {
    file: "services.js",
    lines: [
      [{ t: "// What we create for you", c: "text-white/35" }],
      [
        { t: "export const ", c: "text-[#75A0FF]" },
        { t: "services", c: "text-[#F5F7F6]" },
        { t: " = [", c: "text-white/60" },
      ],
      [
        { t: '  "Business Websites"', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: '  "E-commerce"', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: '  "Custom Solutions"', c: "text-[#9CC0FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [{ t: "];", c: "text-white/60" }],
    ],
  },
  {
    file: "quality.js",
    lines: [
      [{ t: "// Every project, every time", c: "text-white/35" }],
      [
        { t: "const ", c: "text-[#75A0FF]" },
        { t: "quality", c: "text-[#F5F7F6]" },
        { t: " = {", c: "text-white/60" },
      ],
      [
        { t: "  fast: ", c: "text-white/60" },
        { t: "true", c: "text-[#4F83FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: "  responsive: ", c: "text-white/60" },
        { t: "true", c: "text-[#4F83FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: "  seoReady: ", c: "text-white/60" },
        { t: "true", c: "text-[#4F83FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [
        { t: "  madeToGrow: ", c: "text-white/60" },
        { t: "true", c: "text-[#4F83FF]" },
        { t: ",", c: "text-white/60" },
      ],
      [{ t: "};", c: "text-white/60" }],
    ],
  },
];

// একটি স্নিপেটের প্রতিটি লাইনের অক্ষর সংখ্যা
function getLineLengths(snippet) {
  return snippet.lines.map((line) =>
    line.reduce((sum, part) => sum + part.t.length, 0)
  );
}

// লাইনের কতটুকু অংশ দেখানো হবে সেটা কেটে নেয়
function sliceLine(line, count) {
  let remaining = count;
  const out = [];
  for (const part of line) {
    if (remaining <= 0) break;
    out.push({ ...part, t: part.t.slice(0, remaining) });
    remaining -= part.t.length;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* ২. কোড এডিটর উইন্ডো (টাইপ → থামা → মোছা → পরের কোড)                */
/* ------------------------------------------------------------------ */
function CodeWindow() {
  const [index, setIndex] = useState(0); // এখন কোন স্নিপেট
  const [typed, setTyped] = useState(0); // কতগুলো অক্ষর দেখা যাচ্ছে
  const [phase, setPhase] = useState("typing"); // typing | waiting | deleting

  const snippet = snippets[index];
  const lineLengths = getLineLengths(snippet);
  const totalChars = lineLengths.reduce((a, b) => a + b, 0);

  useEffect(() => {
    let timer;

    if (phase === "typing") {
      if (typed < totalChars) {
        timer = setTimeout(() => setTyped((n) => n + 1), 32);
      } else {
        timer = setTimeout(() => setPhase("waiting"), 0);
      }
    } else if (phase === "waiting") {
      // টাইপ শেষ হলে ২.৫ সেকেন্ড কোডটা দেখা যাবে
      timer = setTimeout(() => setPhase("deleting"), 2500);
    } else if (phase === "deleting") {
      if (typed > 0) {
        // মোছার সময় একসাথে ৩টা অক্ষর যাবে, তাই দ্রুত মুছবে
        timer = setTimeout(() => setTyped((n) => Math.max(0, n - 3)), 14);
      } else {
        // মোছা শেষ — পরের কোডে যাও
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % snippets.length);
          setPhase("typing");
        }, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [typed, phase, totalChars]);

  // প্রতিটি লাইনে কতগুলো অক্ষর দেখাবে (কোনো ভ্যারিয়েবল না বদলিয়ে)
  const visible = lineLengths.map((len, i) => {
    // এই লাইনের আগের সব লাইনের মোট অক্ষর
    const before = lineLengths.slice(0, i).reduce((a, b) => a + b, 0);
    return Math.max(0, Math.min(len, typed - before));
  });

  // কার্সর কোন লাইনে থাকবে
  const firstIncomplete = visible.findIndex((v, i) => v < lineLengths[i]);
  const activeLine =
    firstIncomplete === -1 ? snippet.lines.length - 1 : firstIncomplete;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0E10] shadow-2xl shadow-black/40">
      {/* উপরের বার */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#111417] px-5 py-3.5">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4F83FF]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#75A0FF]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <span className="text-xs text-white/40">{snippet.file}</span>
        <span className="w-10" />
      </div>

      {/* কোড এরিয়া — উচ্চতা ফিক্সড, তাই লেখা বদলালেও লেআউট লাফায় না */}
      <div className="min-h-[300px] p-5 font-mono text-[12.5px] leading-7 sm:p-6 sm:text-[13.5px]">
        {snippet.lines.map((line, i) => (
          <div key={`${index}-${i}`} className="flex">
            <span className="mr-5 w-5 select-none text-right text-white/20">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {sliceLine(line, visible[i]).map((part, j) => (
                <span key={j} className={part.c}>
                  {part.t}
                </span>
              ))}
              {/* ব্লিংকিং কার্সর */}
              {i === activeLine && (
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-[#4F83FF]" />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* নিচের স্ট্যাটাস বার */}
      <div className="flex items-center justify-between border-t border-white/10 bg-[#111417] px-5 py-2.5 text-[11px] text-white/35">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4F83FF]" />
          JavaScript
        </span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ৩. Tech ব্যাকগ্রাউন্ড — মাউসে সাড়া দেওয়া নীল network                 */
/* ------------------------------------------------------------------ */
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    // যারা কম animation পছন্দ করে, তাদের জন্য বন্ধ থাকবে
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frameId;
    const mouse = { x: -9999, y: -9999 };

    // স্ক্রিনের সাইজ অনুযায়ী canvas ও বিন্দুর সংখ্যা ঠিক করে
    function setup() {
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // মাউসের কাছে এলে বিন্দু ধাক্কা খেয়ে সরে যাবে
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0) {
          const force = (140 - dist) / 140;
          p.x += (dx / dist) * force * 2.2;
          p.y += (dy / dist) * force * 2.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // কিনারায় পৌঁছালে উল্টো দিকে ফিরবে
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // বিন্দু আঁকা
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(117,160,255,0.65)";
        ctx.fill();

        // কাছাকাছি বিন্দুর সঙ্গে লাইন
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(79,131,255,${(1 - d / 120) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // মাউসের কাছে থাকলে মাউসের সঙ্গেও লাইন জোড়া লাগবে
        if (dist < 170) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(117,160,255,${(1 - dist / 170) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      frameId = requestAnimationFrame(draw);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // grid ও glow-এর জন্য মাউসের পজিশন CSS variable-এ রাখা হচ্ছে
      parent.style.setProperty("--mx", `${mouse.x}px`);
      parent.style.setProperty("--my", `${mouse.y}px`);
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    setup();
    draw();
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setup);

    // কম্পোনেন্ট বন্ধ হলে সব পরিষ্কার করে দেয়
    return () => {
      cancelAnimationFrame(frameId);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
}

/* ------------------------------------------------------------------ */
/* ৪. ভেসে ওঠা কোড চিহ্ন (ফিক্সড পজিশন, তাই hydration সমস্যা নেই)       */
/* ------------------------------------------------------------------ */
const floatingSymbols = [
  { s: "</>", left: "6%", top: "18%", delay: 0, dur: 9 },
  { s: "{ }", left: "44%", top: "8%", delay: 1.5, dur: 11 },
  { s: "=>", left: "88%", top: "14%", delay: 3, dur: 10 },
  { s: "01", left: "10%", top: "72%", delay: 2, dur: 12 },
  { s: "( )", left: "52%", top: "86%", delay: 4, dur: 9 },
  { s: "#", left: "92%", top: "70%", delay: 1, dur: 13 },
  { s: "[ ]", left: "30%", top: "50%", delay: 5, dur: 11 },
];

function FloatingSymbols() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {floatingSymbols.map((item) => (
        <motion.span
          key={item.s}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.22, 0], y: [0, -50, -100] }}
          transition={{
            duration: item.dur,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{ left: item.left, top: item.top }}
          className="absolute font-mono text-lg font-semibold text-[#4F83FF]"
        >
          {item.s}
        </motion.span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ৫. মূল Hero                                                         */
/* ------------------------------------------------------------------ */
const wordVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#08090B] text-white"
      style={{ "--mx": "50%", "--my": "40%" }}
    >
      {/* হালকা grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(#4F83FF_1px,transparent_1px),linear-gradient(90deg,#4F83FF_1px,transparent_1px)] [background-size:56px_56px]"
      />

      {/* মাউসের কাছে grid উজ্জ্বল হবে */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(#4F83FF_1px,transparent_1px),linear-gradient(90deg,#4F83FF_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(220px_circle_at_var(--mx)_var(--my),black,transparent)]"
      />

      {/* মাউসের পেছনে ঘোরা নীল glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(380px_circle_at_var(--mx)_var(--my),rgba(79,131,255,0.14),transparent_70%)]"
      />

      {/* ধীরে নড়া বড় glow */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-[#4F83FF]/[0.13] blur-[130px]"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#75A0FF]/[0.08] blur-[120px]"
      />

      {/* network canvas + ভাসমান চিহ্ন */}
      <NetworkCanvas />
      <FloatingSymbols />

      <Container className="grid min-h-[760px] items-center gap-16 py-24 lg:grid-cols-2 lg:gap-10 lg:py-28">
        {/* বাম পাশ: লেখা */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#4F83FF]" />
              Web Development Agency
            </Badge>
          </motion.div>

          {/* টাইটেল */}
          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.18, delayChildren: 0.2 }}
            className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={wordVariant}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="inline-block text-[#F5F7F6]"
              >
                We Build.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={wordVariant}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="inline-block bg-gradient-to-r from-[#4F83FF] via-[#75A0FF] to-[#4F83FF] bg-clip-text text-transparent"
              >
                You Grow.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-7 max-w-xl text-base leading-8 text-[#A7B0AC] sm:text-lg"
          >
            We design and develop fast, modern websites that help
            businesses build trust, reach more customers, and grow online.
          </motion.p>

          {/* বাটন (এখানে সরাসরি নীল করা হয়েছে) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#4F83FF] px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4F83FF]/25 transition-all hover:bg-[#75A0FF] hover:shadow-[#75A0FF]/30"
            >
              Start a Project
              <ArrowUpRight size={18} />
            </Link>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-semibold text-white transition-colors hover:border-[#75A0FF]/60 hover:text-[#75A0FF]"
            >
              Explore Our Work
              <ArrowRight size={17} />
            </Link>
          </motion.div>

          {/* সার্ভিসের তালিকা */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-sm text-white/45"
          >
            <span>Business Websites</span>
            <span className="h-1 w-1 rounded-full bg-[#4F83FF]" />
            <span>E-commerce</span>
            <span className="h-1 w-1 rounded-full bg-[#4F83FF]" />
            <span>Custom Solutions</span>
          </motion.div>
        </div>

        {/* ডান পাশ: কোড এডিটর */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-[#4F83FF]/[0.10] blur-2xl" />
          <CodeWindow />
        </motion.div>
      </Container>
    </section>
  );
}