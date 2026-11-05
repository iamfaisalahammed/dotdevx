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
      L(["dim", "// .DevX — Built for growth"]),
      L(["key", "const "], ["name", "agency"], ["mute", " = {"]),
      L(["mute", "  name: "], ["str", '".DevX"'], ["mute", ","]),
      L(["mute", "  basedIn: "], ["str", '"Bangladesh"'], ["mute", ","]),
      L(["mute", "  serving: "], ["str", '"Worldwide"'], ["mute", ","]),
      L(["mute", "  focus: "], ["str", '"Design. Develop. Deliver."'], ["mute", ","]),
      L(["mute", "};"]),
    ],
  },
{
  file: "launch.js",
  lines: [
    L(["dim", "// From idea to live website"]),
    L(["key", "function "], ["fn", "launch"], ["mute", "(idea) {"]),
    L(["key", "  return "], ["name", "plan"], ["mute", "(idea)"]),
    L(["mute", "    ."], ["fn", "design"], ["mute", "()"]),
    L(["mute", "    ."], ["fn", "develop"], ["mute", "()"]),
    L(["mute", "    ."], ["fn", "optimize"], ["mute", "()"]),
    L(["mute", "    ."], ["fn", "deploy"], ["mute", "(); "], ["dim", "// ready to grow"]),
    L(["mute", "}"]),
  ],
},
{
  file: "services.js",
  lines: [
    L(["dim", "// What we create for you"]),
    L(["key", "export const "], ["name", "services"], ["mute", " = ["]),
    L(["str", '  "Business Websites"'], ["mute", ","]),
    L(["str", '  "E-commerce Websites"'], ["mute", ","]),
    L(["str", '  "Custom Web Solutions"'], ["mute", ","]),
    L(["mute", "];"]),
    L(["dim", ""]),
  ],
},{
  file: "quality.js",
  lines: [
    L(["dim", "// Built with quality in mind"]),
    L(["key", "const "], ["name", "quality"], ["mute", " = {"]),
    L(["mute", "  performance: "], ["val", "true"], ["mute", ","]),
    L(["mute", "  responsive: "], ["val", "true"], ["mute", ","]),
    L(["mute", "  cleanCode: "], ["val", "true"], ["mute", ","]),
    L(["mute", "  scalability: "], ["val", "true"], ["mute", ","]),
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
    <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0B0E]/85 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
      {/* ওপরের লাল আলোর রেখা */}
      <span
        aria-hidden="true"
        className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
      />

      {/* ফাইলের নাম বার — উচ্চতা fix */}
      <div className="flex h-11 items-center gap-2 border-b border-white/[0.06] px-5">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="ml-2 truncate font-mono text-[11px] tracking-wider text-white/50 sm:text-xs">
          {snippet.file}
        </span>
      </div>

      {/* ৭ লাইন × 32px + padding 40px = 264px fix উচ্চতা, তাই কখনো লাফাবে না */}
      <div className="h-[264px] overflow-hidden px-6 py-5 font-mono text-[12px] min-[400px]:text-[13px] sm:text-[14px]">
        {snippet.lines.map((line, i) => (
          <div key={`${index}-${i}`} className="flex h-8 items-center">
            <span className="mr-4 w-4 shrink-0 select-none text-right text-white/20">
              {i + 1}
            </span>
            <span className="whitespace-pre">
              {sliceLine(line, visible[i]).map((part, j) => (
                <span key={j} className={part.c}>
                  {part.t}
                </span>
              ))}
              {i === activeLine && (
                <span className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-[var(--accent)] align-middle" />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}



const CONSTELLATIONS = [
  {
    name: "Orion",
    cx: 0.13,
    cy: 0.77,
    size: 170,
    stars: [
      { n: "Betelgeuse", x: -4.79, y: -7.41, m: 0.5, lab: "l" },
      { n: "Bellatrix", x: 2.72, y: -6.35, m: 1.64, lab: "r" },
      { n: "Meissa", x: 0.23, y: -9.93, m: 3.39, lab: "t" },
      { n: "Alnitak", x: -1.19, y: 1.94, m: 1.77, lab: "l" },
      { n: "Alnilam", x: -0.05, y: 1.2, m: 1.69, lab: "rb" },
      { n: "Mintaka", x: 1.0, y: 0.3, m: 2.23, lab: "r" },
      { n: "Saiph", x: -2.94, y: 9.67, m: 2.06, lab: "l" },
      { n: "Rigel", x: 5.37, y: 8.2, m: 0.13, lab: "r" },
    ],
    lines: [[2, 0], [2, 1], [0, 3], [1, 5], [3, 4], [4, 5], [3, 6], [5, 7]],
  },
  {
    name: "Big Dipper",
    cx: 0.34,
    cy: 0.8,
    size: 200,
    stars: [
      { n: "Dubhe", x: 11.5, y: -6.75, m: 1.79, lab: "r" },
      { n: "Merak", x: 11.77, y: -1.38, m: 2.37, lab: "r" },
      { n: "Phecda", x: 4.33, y: 1.31, m: 2.44, lab: "b" },
      { n: "Megrez", x: 1.23, y: -2.03, m: 3.31, lab: "t" },
      { n: "Alioth", x: -4.3, y: -0.96, m: 1.76, lab: "t" },
      { n: "Mizar", x: -8.59, y: 0.07, m: 2.23, lab: "b" },
      { n: "Alkaid", x: -11.97, y: 5.69, m: 1.86, lab: "l" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  },
  {
    name: "Cassiopeia",
    cx: 0.54,
    cy: 0.8,
    size: 130,
    stars: [
      { n: "Caph", x: 6.35, y: 0.85, m: 2.28, lab: "r" },
      { n: "Schedar", x: 2.44, y: 3.46, m: 2.24, lab: "b" },
      { n: "γ Cas", x: 0.41, y: -0.72, m: 2.15, lab: "t" },
      { n: "Ruchbah", x: -3.22, y: -0.24, m: 2.68, lab: "b" },
      { n: "Segin", x: -6.8, y: -3.67, m: 3.35, lab: "l" },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: "Cygnus",
    cx: 0.72,
    cy: 0.78,
    size: 150,
    stars: [
      { n: "Deneb", x: -5.78, y: -7.28, m: 1.25, lab: "l" },
      { n: "Sadr", x: -2.0, y: -2.26, m: 2.2, lab: "l" },
      { n: "Gienah", x: -6.73, y: 4.03, m: 2.46, lab: "l" },
      { n: "Fawaris", x: 5.31, y: -7.13, m: 2.87, lab: "r" },
      { n: "Albireo", x: 8.12, y: 10.04, m: 3.18, lab: "r" },
    ],
    lines: [[0, 1], [1, 4], [3, 1], [1, 2]],
  },
  {
    name: "Crux",
    cx: 0.89,
    cy: 0.8,
    size: 100,
    stars: [
      { n: "Gacrux", x: -0.14, y: -2.89, m: 1.64, lab: "t" },
      { n: "Acrux", x: 0.43, y: 3.1, m: 0.77, lab: "b" },
      { n: "Mimosa", x: -2.21, y: -0.31, m: 1.25, lab: "l" },
      { n: "Imai", x: 1.86, y: -1.25, m: 2.8, lab: "r" },
    ],
    lines: [[0, 1], [2, 3]],
  },
];

// নামের অবস্থান: [তারা থেকে dx, dy, text-align]
const LABEL_POS = {
  l: [-9, 0, "right"],
  r: [9, 0, "left"],
  t: [0, -12, "center"],
  b: [0, 12, "center"],
  lt: [-8, -9, "right"],
  rt: [8, -9, "left"],
  lb: [-8, 9, "right"],
  rb: [8, 9, "left"],
};

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
    let constellations = [];
    let frameId = 0;
    let meteors = [];
    let nextShot = 1800;

    // নতুন একটা ধূমকেতু আকাশের ওপর থেকে নামবে
    function spawnMeteor() {
      const dir = Math.random() > 0.5 ? 1 : -1;
      const speed = 8 + Math.random() * 5;
      const angle = ((22 + Math.random() * 20) * Math.PI) / 180;
      meteors.push({
        x: dir === 1 ? Math.random() * width * 0.7 : width * 0.3 + Math.random() * width * 0.7,
        y: -10 + Math.random() * height * 0.3,
        vx: Math.cos(angle) * speed * dir,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 35,
        tail: 110 + Math.random() * 90,
      });
    }
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: -9999, py: -9999 };

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
      // আসল নক্ষত্রমণ্ডল — শুধু বড় স্ক্রিনে (মাউস থাকে যেখানে)
      const k = Math.min(1.15, Math.max(0.8, width / 1280));
      constellations =
        width < 1024
          ? []
          : CONSTELLATIONS.map((def) => {
              const xs = def.stars.map((st) => st.x);
              const ys = def.stars.map((st) => st.y);
              const mx = (Math.min(...xs) + Math.max(...xs)) / 2;
              const my = (Math.min(...ys) + Math.max(...ys)) / 2;
              const extent = Math.max(
                Math.max(...xs) - Math.min(...xs),
                Math.max(...ys) - Math.min(...ys)
              );
              const scale = (def.size * k) / extent;
              const list = def.stars.map((st, i) => ({
                name: st.n,
                x: width * def.cx + (st.x - mx) * scale,
                y: height * def.cy + (st.y - my) * scale,
                r: Math.min(2.2, Math.max(0.9, 1.0 + (2.6 - st.m) * 0.42)),
                alpha: Math.min(0.95, Math.max(0.55, 0.55 + (3.5 - st.m) * 0.13)),
                lab: LABEL_POS[st.lab],
                sp: 0.8 + ((i * 37) % 12) / 10,
                ph: i * 1.3,
              }));
              return {
                name: def.name,
                lines: def.lines,
                stars: list,
                hover: 0,
                minX: Math.min(...list.map((st) => st.x)),
                maxX: Math.max(...list.map((st) => st.x)),
                minY: Math.min(...list.map((st) => st.y)),
                maxY: Math.max(...list.map((st) => st.y)),
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
        // মাউসের কাছের তারাগুলো বেশি উজ্জ্বল হবে
        const near = Math.max(0, 1 - Math.hypot(px - mouse.px, py - mouse.py) / 240);
        const a = Math.min(1, s.base * tw + near * near * 0.7);
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

      // আসল নক্ষত্রমণ্ডল: তারাগুলো সবসময় থাকে, মাউস কাছে গেলে হালকা রেখা ও আসল নাম ফুটে ওঠে
      const cox = mouse.x * 14;
      const coy = mouse.y * 9;
      ctx.letterSpacing = "1px";
      for (const c of constellations) {
        const near =
          mouse.px > c.minX + cox - 70 &&
          mouse.px < c.maxX + cox + 70 &&
          mouse.py > c.minY + coy - 70 &&
          mouse.py < c.maxY + coy + 70;
        c.hover += ((near ? 1 : 0) - c.hover) * 0.07;
        const h = c.hover;

        if (h > 0.02) {
          ctx.strokeStyle = `rgba(255,255,255,${0.16 * h})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          for (const [i, j] of c.lines) {
            ctx.moveTo(c.stars[i].x + cox, c.stars[i].y + coy);
            ctx.lineTo(c.stars[j].x + cox, c.stars[j].y + coy);
          }
          ctx.stroke();
        }

        for (const st of c.stars) {
          const x = st.x + cox;
          const y = st.y + coy;
          const tw = reduceMotion ? 1 : 0.8 + 0.2 * Math.sin(t * 0.0013 * st.sp + st.ph);
          const a = Math.min(1, st.alpha * tw + h * 0.15);

          ctx.fillStyle = `rgba(255,255,255,${a * 0.12})`;
          ctx.beginPath();
          ctx.arc(x, y, st.r * 3.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.beginPath();
          ctx.arc(x, y, st.r, 0, Math.PI * 2);
          ctx.fill();

          if (h > 0.02) {
            ctx.strokeStyle = `rgba(255,255,255,${0.2 * h})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(x, y, st.r + 5, 0, Math.PI * 2);
            ctx.stroke();

            ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
            ctx.textBaseline = "middle";
            ctx.textAlign = st.lab[2];
            ctx.fillStyle = `rgba(255,255,255,${0.42 * h})`;
            ctx.fillText(st.name, x + st.lab[0], y + st.lab[1]);
          }
        }

        if (h > 0.02) {
          ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
          ctx.letterSpacing = "3px";
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(255,255,255,${0.22 * h})`;
          ctx.fillText(c.name.toUpperCase(), (c.minX + c.maxX) / 2 + cox, c.maxY + 34 + coy);
          ctx.letterSpacing = "1px";
        }
      }

      // মাঝে মাঝে একটা উল্কা
      if (!reduceMotion) {
        // ধূমকেতু পড়ছে — মাথা সাদা, লেজ লালে মিলিয়ে যায়
        if (t > nextShot) {
          spawnMeteor();
          if (Math.random() < 0.25) spawnMeteor();
          nextShot = t + 2800 + Math.random() * 3600;
        }
        meteors = meteors.filter((m) => m.life <= m.maxLife);
        for (const m of meteors) {
          m.x += m.vx;
          m.y += m.vy;
          m.life += 1;
          const fade = Math.min(1, m.life / 8) * Math.max(0, 1 - m.life / m.maxLife);
          const len = Math.hypot(m.vx, m.vy);
          const ex = m.x - (m.vx / len) * m.tail;
          const ey = m.y - (m.vy / len) * m.tail;
          const g = ctx.createLinearGradient(m.x, m.y, ex, ey);
          g.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
          g.addColorStop(0.3, `rgba(255,120,124,${0.5 * fade})`);
          g.addColorStop(1, "rgba(229,37,42,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.7;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
          ctx.fillStyle = `rgba(255,255,255,${0.2 * fade})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

      }

      if (!reduceMotion) frameId = requestAnimationFrame(draw);
    }

    function onMove(e) {
      if (e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.px = e.clientX - rect.left;
      mouse.py = e.clientY - rect.top;
    }

    function onLeave() {
      mouse.px = -9999;
      mouse.py = -9999;
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
 { label: "Modern Design", top: "10%", left: "25%", delay: 0 },
{ label: "Reliable", top: "50%", left: "58%", delay: 0.15 },
{ label: "User Friendly", top: "90%", left: "25%", delay: 0.3 },
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
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-[#0A0B0E]/80 px-3.5 py-2 text-[11px] font-medium text-white/80 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md sm:text-xs"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {label}
    </motion.span>
  );
}

/* ---------- ডান পাশের ভিজ্যুয়াল: কোড এডিটর ও পাশে বাঁকা ফিচার ---------- */

function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[700px] lg:ml-auto lg:mr-0">
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
        <div className="relative z-20 -ml-3 hidden w-[140px] shrink-0 md:block">
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

/* ---------- কমেট কার্সর — মাউস একটা ছোট তারা, পেছনে সাদা থেকে লালে মেলানো লেজ ---------- */

function CometCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;

    // লেজের প্রতিটা বিন্দু এত ms টিকে থাকে। মাউস যত জোরে নড়ে, বিন্দুগুলো তত দূরে দূরে পড়ে — তাই লেজ লম্বা হয়
    const LIFE = 520;
    const WHITE = [255, 255, 255];
    const SOFT = [255, 107, 111];
    const RED = [229, 37, 42];

    const pts = [];
    const head = { x: 0, y: 0, tx: 0, ty: 0, on: false, a: 0 };
    let width = 0;
    let height = 0;
    let frameId = 0;

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function mix(c1, c2, k) {
      return [
        c1[0] + (c2[0] - c1[0]) * k,
        c1[1] + (c2[1] - c1[1]) * k,
        c1[2] + (c2[2] - c1[2]) * k,
      ];
    }

    function frame(now) {
      ctx.clearRect(0, 0, width, height);

      head.x += (head.tx - head.x) * 0.5;
      head.y += (head.ty - head.y) * 0.5;
      head.a += ((head.on ? 1 : 0) - head.a) * 0.15;

      if (head.on) {
        const last = pts[pts.length - 1];
        if (!last || Math.hypot(head.x - last.x, head.y - last.y) > 0.6) {
          pts.push({ x: head.x, y: head.y, t: now });
        }
      }
      while (pts.length && now - pts[0].t > LIFE) pts.shift();

      // লেজ: নতুন অংশ সাদা ও মোটা, পুরোনো অংশ লাল ও সরু, শেষে মিলিয়ে যায়
      ctx.lineCap = "butt";
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const k = 1 - (now - p1.t) / LIFE;
        if (k <= 0) continue;
        const c = k > 0.55 ? mix(SOFT, WHITE, (k - 0.55) / 0.45) : mix(RED, SOFT, k / 0.55);
        const rgb = `${c[0] | 0},${c[1] | 0},${c[2] | 0}`;

        // মূল লেজ
        ctx.strokeStyle = `rgba(${rgb},${Math.pow(k, 1.3) * 0.9})`;
        ctx.lineWidth = 0.6 + k * 3.4;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      // মাথা: ছোট উজ্জ্বল তারা
      if (head.a > 0.01) {
        const { x, y, a } = head;
        const pulse = 6 + Math.sin(now * 0.006) * 1.5;

        const g = ctx.createRadialGradient(x, y, 0, x, y, 18);
        g.addColorStop(0, `rgba(255,255,255,${0.35 * a})`);
        g.addColorStop(0.4, `rgba(255,255,255,${0.08 * a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255,255,255,${0.7 * a})`;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - pulse, y);
        ctx.lineTo(x + pulse, y);
        ctx.moveTo(x, y - pulse);
        ctx.lineTo(x, y + pulse);
        ctx.stroke();

        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // মাউস hero-র ভেতরে থাকলে বা লেজ বাকি থাকলে চলবে, নাহলে থামবে
      if (head.on || head.a > 0.01 || pts.length) {
        frameId = requestAnimationFrame(frame);
      } else {
        frameId = 0;
      }
    }

    function onMove(e) {
      if (e.pointerType !== "mouse") return;
      const rect = parent.getBoundingClientRect();
      head.tx = e.clientX - rect.left;
      head.ty = e.clientY - rect.top;
      if (!head.on) {
        head.x = head.tx;
        head.y = head.ty;
        head.on = true;
        pts.length = 0;
        parent.style.cursor = "none"; // আসল কার্সরের বদলে তারাটাই দেখা যাবে (লিংকে হাতের চিহ্ন থাকবে)
      }
      if (!frameId) frameId = requestAnimationFrame(frame);
    }

    function onLeave() {
      head.on = false;
      parent.style.cursor = "";
    }

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(parent);
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      parent.style.cursor = "";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30"
    />
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
      className="relative isolate overflow-hidden bg-black text-white"
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
            "radial-gradient(ellipse 80% 60% at 75% 40%, rgba(255,255,255,0.05), transparent 70%), radial-gradient(ellipse 70% 50% at 15% 10%, rgba(255,255,255,0.03), transparent 70%), linear-gradient(180deg, #0A0B0E 0%, #08090B 60%, #060709 100%)",
        }}
      />

      {/* Nebula — ধীরে ভাসমান সাদা-ধূসর মেঘ */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-[4%] -z-10 h-[300px] w-[360px] rounded-full blur-[100px] sm:h-[480px] sm:w-[640px] sm:blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.11), rgba(255,255,255,0.03) 60%, transparent 75%)" }}
      />
      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[30%] top-[-12%] -z-10 h-[240px] w-[320px] rounded-full bg-black blur-[100px] sm:h-[360px] sm:w-[520px] sm:blur-[110px]"
      />

      <StarField />
      <FloatingSymbols />
      <CometCursor />

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

      <Container className="grid items-center gap-12 py-14 sm:gap-14 sm:py-20 lg:min-h-[760px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-12 lg:-translate-y-22">
        {/* লেখার অংশ — সব স্ক্রিনেই বামে ও ওপরে */}
        <div className="order-1 flex flex-col items-start text-left xl:pl-10">
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
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5 sm:mt-10"
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

        {/* ভিজ্যুয়াল — মোবাইলে নিচে, ডেস্কটপে ডানে */}
        <div className="order-2">
          <HeroVisual />
        </div>
      </Container>
      <ServiceMarquee />
    </section>
  );
}