"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/* ভাসমান কোড চিহ্ন (ফিক্সড পজিশন, তাই hydration সমস্যা নেই) */
const symbols = [
  { s: "</>", left: "5%", top: "14%", delay: 0, dur: 10 },
  { s: "{ }", left: "46%", top: "6%", delay: 1.5, dur: 12 },
  { s: "=>", left: "90%", top: "18%", delay: 3, dur: 11 },
  { s: "01", left: "8%", top: "78%", delay: 2, dur: 13 },
  { s: "( )", left: "54%", top: "88%", delay: 4, dur: 10 },
  { s: "#", left: "93%", top: "74%", delay: 1, dur: 12 },
];

/* মাউসে সাড়া দেওয়া নীল network canvas */
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // মাউসের ইভেন্ট ধরা হবে পুরো সেকশনে (canvas নিজে pointer-events-none)
    const section = canvas.closest("section");
    if (!section) return;

    // কম animation পছন্দ করলে বন্ধ থাকবে
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frameId;
    const mouse = { x: -9999, y: -9999 };

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // সেকশন বড় হলেও সর্বোচ্চ ৬০টা বিন্দু, যাতে হালকা থাকে
      const count = Math.min(60, Math.floor((width * height) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // মাউসের কাছে এলে বিন্দু সরে যাবে
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
        ctx.fillStyle = "rgba(117,160,255,0.6)";
        ctx.fill();

        // কাছাকাছি বিন্দুর সঙ্গে লাইন
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(79,131,255,${(1 - d / 120) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // মাউসের কাছে থাকলে মাউসের সঙ্গেও লাইন
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
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // grid ও glow-এর জন্য মাউসের পজিশন CSS variable-এ রাখা হচ্ছে
      section.style.setProperty("--mx", `${mouse.x}px`);
      section.style.setProperty("--my", `${mouse.y}px`);
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    setup();
    draw();
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setup);

    // কম্পোনেন্ট বন্ধ হলে সব পরিষ্কার
    return () => {
      cancelAnimationFrame(frameId);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />;
}

/* যেকোনো সেকশনের ভেতরে বসবে। সেকশনে "relative isolate overflow-hidden" লাগবে */
export default function SectionBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {/* হালকা grid */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#4F83FF_1px,transparent_1px),linear-gradient(90deg,#4F83FF_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* মাউসের কাছে grid উজ্জ্বল হবে */}
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#4F83FF_1px,transparent_1px),linear-gradient(90deg,#4F83FF_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,40%),black,transparent)]" />

      {/* মাউসের পেছনে ঘোরা নীল glow */}
      <div className="absolute inset-0 [background:radial-gradient(380px_circle_at_var(--mx,50%)_var(--my,40%),rgba(79,131,255,0.12),transparent_70%)]" />

      {/* ধীরে নড়া বড় glow */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#4F83FF]/[0.10] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-32 h-[360px] w-[360px] rounded-full bg-[#75A0FF]/[0.07] blur-[110px]"
      />

      <NetworkCanvas />

      {/* ভাসমান কোড চিহ্ন */}
      {symbols.map((item) => (
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
          className="absolute font-mono text-lg font-semibold text-[#4F83FF]"
        >
          {item.s}
        </motion.span>
      ))}
    </div>
  );
}