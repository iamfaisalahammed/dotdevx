"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "lucide-react";

import Container from "@/components/ui/Container";


const ACCENT = "#E5252A";
const ACCENT_SOFT = "#FF6B6F";



/* ---------- কোড টাইপিং-এর ডেটা (সাদা-ধূসরের সঙ্গে লালের মিশ্রণ) ---------- */

const C = {
  dim: "text-white/30",
  mute: "text-white/55",
  key: "text-[var(--accent-soft)]", // const, function, return
  name: "text-[#F5F7F6]",
  str: "text-white/85",
  fn: "text-white", // ফাংশনের নাম
  val: "text-[var(--accent)]", // true / মান
};

// L(["dim", "text"], ...) দিলে {t, c} অবজেক্টের array বানিয়ে দেয়
const L = (...parts) => parts.map(([k, t]) => ({ t, c: C[k] }));

// প্রতিটা snippet-এ ঠিক ৭ লাইন, যাতে প্যানেলের উচ্চতা কখনো না বদলায়
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
      L(["dim", ""]),
    ],
  },
  {
    file: "quality.js",
    lines: [
      L(["dim", "// Every project, every time"]),
      L(["key", "const "], ["name", "quality"], ["mute", " = {"]),
      L(["mute", "  fast: "], ["val", "true"], ["mute", ","]),
      L(["mute", "  responsive: "], ["val", "true"], ["mute", ","]),
      L(["mute", "  seoReady: "], ["val", "true"], ["mute", ","]),
      L(["mute", "  madeToGrow: "], ["val", "true"], ["mute", ","]),
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

/* ---------- কোড এডিটর — গ্যালাক্সির নিচে, নিজের জায়গায়, স্থির ---------- */

function CodePanel() {
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
    <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0B0E]/85 shadow-[0_30px_70px_-30px_rgba(229,37,42,0.35)] backdrop-blur-md">
      {/* ওপরের লাল আলোর রেখা */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
      />

      {/* ফাইলের নাম বার — উচ্চতা fix */}
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.06] px-4">
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-wider text-white/50 sm:text-[11px]">
          {snippet.file}
        </span>
      </div>

      {/* ৭ লাইন × 28px + padding = 236px fix উচ্চতা, তাই কখনো লাফাবে না */}
      <div className="h-[236px] overflow-hidden px-5 py-5 font-mono text-[11px] min-[400px]:text-[12px] sm:text-[13px]">
        {snippet.lines.map((line, i) => (
          <div key={`${index}-${i}`} className="flex h-7 items-center">
            <span className="mr-3 w-4 shrink-0 select-none text-right text-white/20">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {sliceLine(line, visible[i]).map((part, j) => (
                <span key={j} className={part.c}>
                  {part.t}
                </span>
              ))}
              {i === activeLine && (
                <span className="ml-0.5 inline-block h-3.5 w-[6px] animate-pulse bg-[var(--accent)] align-middle" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- পুরো hero-র তারা ভরা আকাশ (সাদা-কালো, মাউসে parallax) ---------- */

function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let stars = [];
    let frameId = 0;
    let shooting = null;
    let nextShot = 3500;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // মোবাইলে তারা কম, ফোন যেন গরম না হয়
      const density = width < 640 ? 5200 : 3400;
      const count = Math.min(400, Math.floor((width * height) / density));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random(); // 0 = দূরে, 1 = কাছে
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          r: 0.35 + depth * 1.1,
          base: 0.25 + depth * 0.65,
          speed: 0.6 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          drift: 0.012 + depth * 0.045,
          shade: 200 + Math.floor(Math.random() * 56), // ধূসর থেকে সাদা
        };
      });
      if (reduceMotion) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);

      // মাউসের অবস্থান ধীরে ধীরে অনুসরণ করবে
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      for (const s of stars) {
        if (!reduceMotion) {
          s.x -= s.drift;
          if (s.x < -2) s.x = width + 2;
        }
        const px = s.x + mouse.x * s.depth * 24;
        const py = s.y + mouse.y * s.depth * 16;
        const tw = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
        const a = s.base * tw;
        const rgb = `${s.shade},${s.shade},${s.shade}`;

        ctx.fillStyle = `rgba(${rgb},${a})`;
        if (s.r < 0.9) {
          ctx.fillRect(px, py, s.r * 1.6, s.r * 1.6);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, s.r, 0, Math.PI * 2);
          ctx.fill();
          // বড় তারার চারপাশে হালকা আভা
          if (s.r > 1.2) {
            ctx.fillStyle = `rgba(${rgb},${a * 0.1})`;
            ctx.beginPath();
            ctx.arc(px, py, s.r * 4.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // মাঝে মাঝে একটা উল্কা
      if (!reduceMotion) {
        if (!shooting && t > nextShot) {
          const fromLeft = Math.random() > 0.5;
          shooting = {
            x: Math.random() * width * 0.7 + (fromLeft ? 0 : width * 0.3),
            y: Math.random() * height * 0.35,
            vx: 7 + Math.random() * 3,
            vy: 3.2 + Math.random() * 1.5,
            life: 0,
          };
        }
        if (shooting) {
          const s = shooting;
          s.x += s.vx;
          s.y += s.vy;
          s.life += 1;
          const fade = Math.max(0, 1 - s.life / 55);
          const tail = 100;
          const len = Math.hypot(s.vx, s.vy);
          const ex = s.x - (s.vx / len) * tail;
          const ey = s.y - (s.vy / len) * tail;
          const g = ctx.createLinearGradient(s.x, s.y, ex, ey);
          g.addColorStop(0, `rgba(255,255,255,${0.85 * fade})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          if (s.life > 55) {
            shooting = null;
            nextShot = t + 5500 + Math.random() * 6000;
          }
        }
      }

      if (!reduceMotion) frameId = requestAnimationFrame(draw);
    }

    function onMove(e) {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5;
    }

    // hero স্ক্রিনের বাইরে গেলে animation থামিয়ে দিচ্ছি
    const io = new IntersectionObserver(([entry]) => {
      if (reduceMotion) return;
      if (entry.isIntersecting) {
        if (!frameId) frameId = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });

    setup();
    io.observe(canvas);
    parent.addEventListener("pointermove", onMove);
    window.addEventListener("resize", setup);

    return () => {
      cancelAnimationFrame(frameId);
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
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
];

function FloatingSymbols() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
      {floatingSymbols.map((item) => (
        <motion.span
          key={item.s}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0], y: [0, -50, -100] }}
          transition={{
            duration: item.dur,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{ left: item.left, top: item.top }}
          className="absolute font-mono text-lg font-semibold text-white"
        >
          {item.s}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- কোড এডিটরের পাশে ফিচার ট্যাগ (বাঁকা রেখার ওপর) ---------- */

const chips = [
  // top/left = বাঁকা রেখার ওপর বিন্দু (container-এর শতাংশে)
  { label: "Fast", top: "10%", left: "25%", delay: 0 },
  { label: "SEO Ready", top: "50%", left: "58%", delay: 0.15 },
  { label: "Responsive", top: "90%", left: "25%", delay: 0.3 },
];

function Chip({ label, delay, reduce }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={
        reduce
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, y: [0, -5, 0] }
      }
      transition={{
        opacity: { duration: 0.5, delay: 0.7 + delay },
        scale: { duration: 0.5, delay: 0.7 + delay },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0B0E]/80 px-3.5 py-2 text-[11px] font-medium text-white/80 shadow-[0_8px_24px_-12px_rgba(229,37,42,0.5)] backdrop-blur-md sm:text-xs"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
      {label}
    </motion.span>
  );
}

/* ---------- বাম পাশের ভিজ্যুয়াল: বড় কোড এডিটর ও পাশে বাঁকা ফিচার ---------- */

function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* View Details */}
      <Link
        href="/work"
        className="group mb-5 ml-auto flex w-fit items-center gap-3 text-sm font-semibold text-white"
      >
        <span>View Details</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
        <span className="h-px w-6 bg-white/40 transition-all duration-300 group-hover:w-10 group-hover:bg-[var(--accent)] sm:w-8" />
      </Link>

      <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-0">
        {/* কোড এডিটর */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-10 min-w-0 flex-1"
        >
          <CodePanel />
        </motion.div>

        {/* মোবাইল/ট্যাবলেট: এডিটরের নিচে সারি */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:hidden">
          {chips.map((c) => (
            <Chip key={c.label} label={c.label} delay={c.delay} reduce={reduce} />
          ))}
        </div>

        {/* ডেস্কটপ: এডিটরের ডান পাশে বাঁকা (arc) আকারে */}
        <div className="relative z-20 -ml-3 hidden w-[130px] shrink-0 md:block">
          <svg
            aria-hidden="true"
            viewBox="0 0 120 400"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M30 40 Q 110 200 30 360"
              fill="none"
              stroke="rgba(229,37,42,0.45)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {chips.map((c) => (
            <div
              key={c.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: c.top, left: c.left }}
            >
              <Chip label={c.label} delay={c.delay} reduce={reduce} />
            </div>
          ))}
        </div>
      </div>
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
    <div className="relative">
      {/* লাল রঙের পাতলা বিভাজক */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="relative bg-black/30 py-5 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <motion.div
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex w-max items-center"
        >
          {list.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-sm font-medium tracking-wide text-white/50 sm:px-8 sm:text-base">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]/70" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- মূল Hero ---------- */

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
        "--accent": ACCENT,
        "--accent-soft": ACCENT_SOFT,
      }}
    >
      {/* আগের মতোই subtle dark background ও soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 40%, rgba(255,255,255,0.05), transparent 70%), radial-gradient(ellipse 70% 50% at 85% 10%, rgba(255,255,255,0.03), transparent 70%), linear-gradient(180deg, #0A0B0E 0%, #08090B 60%, #060709 100%)",
        }}
      />

      {/* Nebula — ধীরে ভাসমান সাদা-ধূসর মেঘ */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-24 top-[4%] -z-10 h-[300px] w-[360px] rounded-full blur-[100px] sm:h-[480px] sm:w-[640px] sm:blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.11), rgba(255,255,255,0.03) 60%, transparent 75%)" }}
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 40, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[30%] top-[-12%] -z-10 h-[240px] w-[320px] rounded-full bg-white/[0.04] blur-[100px] sm:h-[360px] sm:w-[520px] sm:blur-[110px]"
      />

      {/* ব্যানারের UI-র পেছনে হালকা লাল আভা — গ্যালাক্সি থেকে দূরে, লেখা আর এডিটরের নিচে */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-10%] -z-10 h-[320px] w-[420px] rounded-full blur-[120px] sm:h-[420px] sm:w-[560px]"
        style={{ background: "radial-gradient(circle, rgba(229,37,42,0.14), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-[-12%] -z-10 h-[280px] w-[380px] rounded-full blur-[120px] sm:h-[380px] sm:w-[500px]"
        style={{ background: "radial-gradient(circle, rgba(229,37,42,0.10), transparent 70%)" }}
      />

      <StarField />
      <FloatingSymbols />

      {/* ধারের vignette — মাঝখানে দৃষ্টি টানে */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(8,9,11,0.65) 100%)",
        }}
      />

      {/* "Scroll Down" — শুধু বড় স্ক্রিনে */}
      <div className="absolute bottom-24 left-5 z-10 hidden flex-col items-center gap-4 xl:flex">
        <span className="rotate-180 text-xs uppercase tracking-[0.25em] text-white/60 [writing-mode:vertical-rl]">
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
        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/25">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
        </span>
      </div>

    <Container className="grid items-center gap-12 py-14 sm:gap-14 sm:py-20 lg:min-h-[760px] lg:grid-cols-2 lg:gap-12 lg:py-12 lg:-translate-y-22">
        {/* লেখার অংশ — মোবাইল/ট্যাবলেটে ওপরে ও বামে, ডেস্কটপে ডানে */}
        <div className="order-1 flex flex-col items-start lg:order-2 lg:items-end lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A7B0AC] backdrop-blur-md sm:text-[13px]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]" />
            </span>
            <span>Specialized Services</span>
          </motion.div>

          {/* হেডলাইন: প্রতিটা লাইন overflow-hidden বক্সের ভেতর থেকে উঠে আসে */}
          <motion.h1
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.16, delayChildren: 0.25 }}
            className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.03em] min-[400px]:text-5xl sm:mt-8 sm:text-6xl lg:text-7xl"
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
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.5 }}
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(100deg, #A7B0AC 40%, ${ACCENT_SOFT} 50%, #A7B0AC 60%)`,
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
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5 sm:mt-10 lg:justify-end"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-10px_var(--accent)] ring-1 ring-white/15 transition-all duration-300 hover:shadow-[0_12px_40px_-8px_var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
        <div className="order-2 lg:order-1">
          <HeroVisual />
        </div>
      </Container>

      <ServiceMarquee />
    </section>
  );
} 