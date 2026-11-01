"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import Container from "@/components/ui/Container";

// রঙ বদলাতে চাইলে শুধু এই তিনটা বদলালেই হবে
const ACCENT = "#E5252A";
const ACCENT_SOFT = "#FF6B6F";
const ACCENT_RGB = "229,37,42"; // canvas-এর জন্য R,G,B

// নীল চাইলে:
// const ACCENT = "#4F83FF";
// const ACCENT_SOFT = "#75A0FF";
// const ACCENT_RGB = "79,131,255";

/* ---------- কোড টাইপিং-এর ডেটা ---------- */

const C = {
  dim: "text-white/35",
  mute: "text-white/60",
  key: "text-[var(--accent-soft)]",
  name: "text-[#F5F7F6]",
  str: "text-white/85",
  fn: "text-[var(--accent)]",
};

// L(["dim", "text"], ...) দিলে {t, c} অবজেক্টের array বানিয়ে দেয়
const L = (...parts) => parts.map(([k, t]) => ({ t, c: C[k] }));

const snippets = [
  {
    file: "agency.config.js",
    lines: [
      L(["dim", "// .DevX — we build, you grow"]),
      L(["key", "const "], ["name", "agency"], ["mute", " = {"]),
      L(["mute", "  name: "], ["str", '".DevX"'], ["mute", ","]),
      L(["mute", "  home: "], ["str", '"Bangladesh"'], ["mute", ","]),
      L(["mute", "  reach: "], ["str", '"Worldwide"'], ["mute", ","]),
      L(["mute", "  promise: "], ["str", '"Clean code. Bold design."'], ["mute", ","]),
      L(["mute", "};"]),
    ],
  },
  {
    file: "launch.js",
    lines: [
      L(["dim", "// From idea to live website"]),
      L(["key", "function "], ["fn", "launch"], ["mute", "(idea) {"]),
      L(["key", "  return "], ["name", "design"], ["mute", "(idea)"]),
      L(["mute", "    ."], ["fn", "build"], ["mute", "()"]),
      L(["mute", "    ."], ["fn", "optimize"], ["mute", "()"]),
      L(["mute", "    ."], ["fn", "deploy"], ["mute", "(); "], ["dim", "// you grow"]),
      L(["mute", "}"]),
    ],
  },
  {
    file: "services.js",
    lines: [
      L(["dim", "// What we create for you"]),
      L(["key", "export const "], ["name", "services"], ["mute", " = ["]),
      L(["str", '  "Business Websites"'], ["mute", ","]),
      L(["str", '  "E-commerce"'], ["mute", ","]),
      L(["str", '  "Custom Solutions"'], ["mute", ","]),
      L(["mute", "];"]),
    ],
  },
  {
    file: "quality.js",
    lines: [
      L(["dim", "// Every project, every time"]),
      L(["key", "const "], ["name", "quality"], ["mute", " = {"]),
      L(["mute", "  fast: "], ["fn", "true"], ["mute", ","]),
      L(["mute", "  responsive: "], ["fn", "true"], ["mute", ","]),
      L(["mute", "  seoReady: "], ["fn", "true"], ["mute", ","]),
      L(["mute", "  madeToGrow: "], ["fn", "true"], ["mute", ","]),
      L(["mute", "};"]),
    ],
  },
];

function getLineLengths(snippet) {
  return snippet.lines.map((line) =>
    line.reduce((sum, part) => sum + part.t.length, 0)
  );
}

// লাইনের প্রথম `count` টা অক্ষর রেখে বাকিটা কেটে দেয়
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

/* ---------- গোল সার্কেলের ভেতরের কোড ---------- */

function CodeCircle() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(0);
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
      timer = setTimeout(() => setPhase("deleting"), 2500);
    } else if (phase === "deleting") {
      if (typed > 0) {
        // মোছার সময় একসাথে তিনটা করে যাবে, নাহলে অনেক ধীর লাগে
        timer = setTimeout(() => setTyped((n) => Math.max(0, n - 3)), 14);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => (i + 1) % snippets.length);
          setPhase("typing");
        }, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [typed, phase, totalChars]);

  const visible = lineLengths.map((len, i) => {
    const before = lineLengths.slice(0, i).reduce((a, b) => a + b, 0);
    return Math.max(0, Math.min(len, typed - before));
  });

  const firstIncomplete = visible.findIndex((v, i) => v < lineLengths[i]);
  const activeLine =
    firstIncomplete === -1 ? snippet.lines.length - 1 : firstIncomplete;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* ফাইলের নাম — পাশে ছোট তিনটা ডট দিলাম, editor-এর মতো লাগবে */}
      <div className="mb-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className="ml-1 font-mono text-[11px] tracking-wider text-white/50">
          {snippet.file}
        </span>
      </div>

      {/* উচ্চতা fix রাখা হয়েছে যাতে কোড বদলালে লেআউট না লাফায় */}
      <div className="min-h-[150px] font-mono text-[10px] leading-6 min-[400px]:min-h-[170px] min-[400px]:text-[10.5px] sm:min-h-[180px] sm:text-[12.5px]">
        {snippet.lines.map((line, i) => (
          <div key={`${index}-${i}`} className="flex">
            <span className="mr-3 w-4 select-none text-right text-white/20">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {sliceLine(line, visible[i]).map((part, j) => (
                <span key={j} className={part.c}>
                  {part.t}
                </span>
              ))}
              {i === activeLine && (
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-pulse bg-[var(--accent)]" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- ব্যাকগ্রাউন্ড network (মাউসে সাড়া দেয়) ---------- */

function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frameId = 0;
    const mouse = { x: -9999, y: -9999 };

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // মোবাইলে বিন্দু কম, না হলে ফোন গরম হয়ে যায়
      const density = width < 640 ? 18000 : 14000;
      const count = Math.min(90, Math.floor((width * height) / density));
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

        // মাউস কাছে এলে বিন্দু একটু সরে যাবে
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
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT_RGB},0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${ACCENT_RGB},${(1 - d / 120) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (dist < 170) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${ACCENT_RGB},${(1 - dist / 170) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      frameId = requestAnimationFrame(draw);
    }

    function onMove(e) {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      // grid আর glow এই দুটো CSS variable থেকে মাউসের জায়গা পায়
      parent.style.setProperty("--mx", `${mouse.x}px`);
      parent.style.setProperty("--my", `${mouse.y}px`);
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    // hero স্ক্রিনের বাইরে গেলে animation থামিয়ে দিচ্ছি
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!frameId) draw();
      } else {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });

    setup();
    io.observe(canvas);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
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

/* ---------- ভেসে ওঠা চিহ্ন ---------- */

// position fix করা, Math.random দিলে hydration error আসে
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
          animate={{ opacity: [0, 0.2, 0], y: [0, -50, -100] }}
          transition={{
            duration: item.dur,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{ left: item.left, top: item.top }}
          className="absolute font-mono text-lg font-semibold text-[var(--accent)]"
        >
          {item.s}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- সার্কেলের চারপাশের ছোট ট্যাগ ---------- */

const chips = [
  { label: "Fast", pos: "left-[-2%] top-[34%]", delay: 0, amp: 8 },
  { label: "SEO Ready", pos: "left-[4%] bottom-[10%]", delay: 1.2, amp: 10 },
  { label: "Responsive", pos: "right-[-2%] top-[62%]", delay: 0.6, amp: 9 },
];

/* ---------- বাম পাশের ভিজ্যুয়াল ---------- */

function HeroVisual() {
  const reduce = useReducedMotion();

  // মাউসের পজিশন (-0.5 থেকে 0.5) থেকে হালকা 3D tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);

  function onMove(e) {
    // টাচ ডিভাইসে tilt লাগবে না
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[300px] min-[400px]:max-w-[360px] sm:max-w-[420px] lg:max-w-[460px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="absolute inset-0"
      >
        {/* বাইরের ঘুরন্ত রিং */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-3 rounded-full border border-white/10 border-t-[var(--accent)]"
        />

        {/* উল্টো দিকে ঘুরবে এমন একটা পাতলা রিং */}
        <motion.div
          aria-hidden="true"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 hidden rounded-full border border-dashed border-white/[0.07] sm:block"
        />

        {/* মূল সার্কেল */}
        <div className="absolute inset-0 overflow-hidden rounded-full border border-white/10 bg-[#0C0E10] shadow-[0_0_80px_-20px_var(--accent)]">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 28% 22%, ${ACCENT}99, transparent 62%)`,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />

          {/* ওপর থেকে নিচে নেমে যাওয়া scan line */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              initial={{ top: "-15%" }}
              animate={{ top: "110%" }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear",
              }}
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
            />
          )}

          <CodeCircle />
        </div>

        {/* View Details */}
        <Link
          href="/work"
          className="group absolute right-0 top-[2%] z-10 flex items-center gap-3 text-sm font-semibold text-white sm:-right-6"
        >
          <span
            aria-hidden="true"
            className="absolute -right-6 -top-7 hidden h-20 w-20 rounded-full border transition-transform group-hover:scale-110 sm:block"
            style={{ borderColor: `${ACCENT}66` }}
          />
          <span className="relative">View Details</span>
          <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="relative h-px w-6 bg-white/40 sm:w-8" />
        </Link>

        {/* ছোট আর বড় লাল ডট */}
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[2%] top-[12%] h-3 w-3 rounded-full bg-[var(--accent)] sm:h-4 sm:w-4"
        />
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 top-[46%] h-5 w-5 rounded-full bg-[var(--accent)] shadow-[0_0_30px_var(--accent)] sm:-right-3 sm:h-7 sm:w-7"
        />

        {/* কাচের মতো ছোট ট্যাগ */}
        {chips.map((chip) => (
          <motion.span
            key={chip.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -chip.amp, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 1.2 + chip.delay * 0.3 },
              scale: { duration: 0.5, delay: 1.2 + chip.delay * 0.3 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: chip.delay },
            }}
            className={`absolute ${chip.pos} z-10 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/80 backdrop-blur-md sm:text-xs`}
          >
            {chip.label}
          </motion.span>
        ))}

        {/* নিচের ডানে CTA সার্কেল */}
        <Link
          href="/contact"
          aria-label="Start a project"
          className="group absolute -bottom-3 right-[4%] z-10 flex h-24 w-24 items-center justify-center sm:-bottom-2 sm:right-[6%] sm:h-32 sm:w-32"
        >
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-white/10 border-t-[var(--accent)]"
          />
          <span className="flex h-[78%] w-[78%] items-center justify-center rounded-full bg-[#111417] ring-1 ring-white/10 transition-transform group-hover:scale-105">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform duration-300 group-hover:rotate-45 sm:h-12 sm:w-12">
              <ArrowUpRight size={22} />
            </span>
          </span>
        </Link>
      </motion.div>
    </div>
  );
}

/* ---------- নিচের চলমান সার্ভিস লাইন ---------- */

const marqueeItems = [
  "Business Websites",
  "E-commerce",
  "Custom Solutions",
  "Landing Pages",
  "SEO Ready",
  "Fast & Responsive",
];

function ServiceMarquee() {
  const reduce = useReducedMotion();
  // দুইবার বসিয়েছি যাতে -50% গেলে ঠিক শুরুতে ফিরে আসে, কোনো jump না হয়
  const list = [...marqueeItems, ...marqueeItems];

  return (
    <div
      aria-hidden="true"
      className="relative border-t border-white/10 py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
    >
      <motion.div
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center"
      >
        {list.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-sm font-medium text-white/45 sm:px-8 sm:text-base">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- মূল Hero ---------- */

const gridLines = {
  backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
  backgroundSize: "56px 56px",
};
const gridMask =
  "radial-gradient(220px circle at var(--mx) var(--my), black, transparent)";

// হেডলাইনের শব্দগুলো নিচ থেকে উঠে আসবে
const lineVariant = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0 },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative isolate overflow-hidden bg-[#08090B] text-white"
      style={{
        "--mx": "50%",
        "--my": "40%",
        "--accent": ACCENT,
        "--accent-soft": ACCENT_SOFT,
      }}
    >
      {/* হালকা grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={gridLines}
      />

      {/* মাউসের কাছে grid একটু জ্বলে উঠবে */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{ ...gridLines, maskImage: gridMask, WebkitMaskImage: gridMask }}
      />

      {/* মাউসের পেছনে glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(380px circle at var(--mx) var(--my), ${ACCENT}24, transparent 70%)`,
        }}
      />

      {/* ধীরে নড়া বড় দুটো glow */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[360px] w-[360px] rounded-full blur-[110px] sm:h-[520px] sm:w-[520px] sm:blur-[130px]"
        style={{ background: `${ACCENT}22` }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[300px] w-[300px] rounded-full blur-[100px] sm:h-[420px] sm:w-[420px] sm:blur-[120px]"
        style={{ background: `${ACCENT}16` }}
      />

      <NetworkCanvas />
      <FloatingSymbols />

      {/* "Scroll Down" — শুধু বড় স্ক্রিনে */}
      <div className="absolute bottom-24 left-5 z-10 hidden flex-col items-center gap-4 xl:flex">
        <span className="rotate-180 text-xs uppercase tracking-[0.25em] text-white/70 [writing-mode:vertical-rl]">
          Scroll Down
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/20">
          {!reduce && (
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-[var(--accent)]"
            />
          )}
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--accent)]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
        </span>
      </div>

      <Container className="grid min-h-[640px] items-center gap-14 py-16 sm:py-20 lg:min-h-[720px] lg:grid-cols-2 lg:gap-12 lg:py-24">
        {/* লেখার অংশ — মোবাইলে ওপরে, ডেস্কটপে ডানে */}
        <div className="order-1 flex flex-col lg:order-2 lg:items-end lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-base text-[#A7B0AC] sm:text-lg"
          >
            <span>Specialized Services</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span className="h-px w-12 bg-white/25 sm:w-16" />
          </motion.div>

          {/* হেডলাইন: প্রতিটা লাইন overflow-hidden বক্সের ভেতর থেকে উঠে আসে */}
          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.16, delayChildren: 0.25 }}
            className="mt-6 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight min-[400px]:text-5xl sm:mt-8 sm:text-6xl lg:text-7xl"
          >
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={lineVariant}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block origin-bottom-left text-[#F5F7F6]"
              >
                We Build.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                variants={lineVariant}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block origin-bottom-left"
              >
                {/* "You Grow" এর ওপর দিয়ে আলো বয়ে যাবে */}
                <motion.span
                  animate={reduce ? undefined : { backgroundPosition: ["200% 0", "-100% 0"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(100deg, #F5F7F6 40%, ${ACCENT_SOFT} 50%, #F5F7F6 60%)`,
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  You Grow
                </motion.span>
                <span className="text-[var(--accent)]">.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 max-w-md text-base leading-8 text-[#A7B0AC] sm:mt-7 sm:text-lg"
          >
            We design and develop fast, modern websites that help
            businesses build trust, reach more customers, and grow online.
          </motion.p>

          {/* বাটন */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5 sm:mt-10"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-all duration-300 hover:shadow-[0_14px_50px_-8px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {/* hover করলে ওপর দিয়ে একটা আলো সরে যাবে */}
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
              />
              <span className="relative">Get Started</span>
              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/work"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Our Work
              <span className="h-px w-8 bg-white/40 transition-all duration-300 group-hover:w-14 group-hover:bg-[var(--accent)]" />
            </Link>
          </motion.div>
        </div>

        {/* ভিজ্যুয়াল — মোবাইলে নিচে, ডেস্কটপে বামে */}
        <div className="order-2 pb-4 lg:order-1 lg:pb-0">
          <HeroVisual />
        </div>
      </Container>

      <ServiceMarquee />
    </section>
  );
}
