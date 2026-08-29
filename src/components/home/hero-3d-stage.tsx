"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Play,
  TreePine,
  UtensilsCrossed,
  ShieldCheck,
  Globe2,
  Users,
  Compass,
  CheckCircle2,
} from "lucide-react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  name: string;
  country: string;
  size: number;
  color: string;
  pulsePhase: number;
}

const AFRICAN_NODES = [
  { name: "Abuja", country: "Nigeria", lat: 9.0765, lon: 7.3986 },
  { name: "Accra", country: "Ghana", lat: 5.6037, lon: -0.187 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219 },
  { name: "Addis Ababa", country: "Ethiopia", lat: 9.032, lon: 38.7482 },
  { name: "Johannesburg", country: "South Africa", lat: -26.2041, lon: 28.0473 },
  { name: "Cairo", country: "Egypt", lat: 30.0444, lon: 31.2357 },
  { name: "Dakar", country: "Senegal", lat: 14.7167, lon: -17.4677 },
  { name: "Kigali", country: "Rwanda", lat: -1.9706, lon: 30.1044 },
  { name: "Casablanca", country: "Morocco", lat: 33.5731, lon: -7.5898 },
  { name: "Dar es Salaam", country: "Tanzania", lat: -6.7924, lon: 39.2083 },
  { name: "Luanda", country: "Angola", lat: -8.839, lon: 13.2894 },
  { name: "Algiers", country: "Algeria", lat: 36.7538, lon: 3.0588 },
  { name: "Harare", country: "Zimbabwe", lat: -17.8252, lon: 31.0335 },
  { name: "Abidjan", country: "Côte d'Ivoire", lat: 5.3599, lon: -4.0083 },
  { name: "Kampala", country: "Uganda", lat: 0.3476, lon: 32.5825 },
  { name: "Windhoek", country: "Namibia", lat: -22.5597, lon: 17.0832 },
  { name: "Maputo", country: "Mozambique", lat: -25.9692, lon: 32.5732 },
  { name: "Gaborone", country: "Botswana", lat: -24.6282, lon: 25.9231 },
  { name: "Tunis", country: "Tunisia", lat: 36.8065, lon: 10.1815 },
  { name: "Lusaka", country: "Zambia", lat: -15.3875, lon: 28.3228 },
  { name: "Yaoundé", country: "Cameroon", lat: 3.848, lon: 11.5021 },
  { name: "Banjul", country: "Gambia", lat: 13.4549, lon: -16.579 },
  { name: "Antananarivo", country: "Madagascar", lat: -18.8792, lon: 47.5079 },
  { name: "Freetown", country: "Sierra Leone", lat: 8.484, lon: -13.2299 },
];

export function Hero3DMotionStage({
  onOpenVideo,
}: {
  onOpenVideo: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Mouse interaction state for 3D card tilt & canvas parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Generate 3D nodes mapped to spherical coords
    const nodes: Node3D[] = AFRICAN_NODES.map((city, index) => {
      const phi = (90 - city.lat) * (Math.PI / 180);
      const theta = (city.lon + 180) * (Math.PI / 180);
      const radius = 175;

      return {
        x: -(radius * Math.sin(phi) * Math.cos(theta)),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
        name: city.name,
        country: city.country,
        size: index === 0 ? 5.5 : 3.5, // Abuja highlight
        color: index === 0 ? "#D4A017" : "#E8C158",
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Background stardust floating 3D particles
    const particles = Array.from({ length: 90 }, () => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 600,
      size: Math.random() * 2 + 0.8,
      speed: Math.random() * 0.003 + 0.001,
      color: Math.random() > 0.4 ? "#D4A017" : "#163B2E",
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // 3D Kolanut Geometry (Polyhedral Vertices)
    const kolanutVertices = [
      { x: 0, y: -45, z: 0 },
      { x: 30, y: -15, z: 20 },
      { x: -30, y: -15, z: 20 },
      { x: 0, y: -15, z: -35 },
      { x: 35, y: 15, z: 15 },
      { x: -35, y: 15, z: 15 },
      { x: 0, y: 15, z: -30 },
      { x: 0, y: 45, z: 0 },
    ];

    const kolanutEdges = [
      [0, 1], [0, 2], [0, 3],
      [1, 2], [2, 3], [3, 1],
      [1, 4], [2, 5], [3, 6],
      [4, 5], [5, 6], [6, 4],
      [4, 7], [5, 7], [6, 7],
    ];

    let angleY = 0;
    let angleX = 0.2;
    let targetAngleX = 0.2;
    let targetAngleY = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 380;

      // Smooth interpolation for mouse parallax
      angleY += 0.005 + (targetAngleY - angleY) * 0.05;
      angleX += (targetAngleX - angleX) * 0.05;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 1. Draw Stardust Particles
      particles.forEach((p) => {
        // Rotate
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2 + 300);
        if (scale > 0) {
          const screenX = centerX + x1 * scale;
          const screenY = centerY + y1 * scale;

          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = p.color === "#D4A017"
            ? `rgba(212, 160, 23, ${p.opacity * scale})`
            : `rgba(22, 59, 46, ${p.opacity * scale * 1.5})`;
          ctx.fill();
        }
      });

      // 2. Draw 3D Orbit Rings
      const ringRadii = [180, 210, 240];
      ringRadii.forEach((radius, rIdx) => {
        ctx.beginPath();
        const segments = 64;
        const ringAngleOffset = (time * 0.0003 * (rIdx % 2 === 0 ? 1 : -1)) + rIdx;

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const rx = Math.cos(theta) * radius;
          const ry = Math.sin(theta) * radius * 0.35;
          const rz = Math.sin(theta) * radius * 0.85;

          // 3D Matrix transform
          const x1 = rx * Math.cos(ringAngleOffset) - rz * Math.sin(ringAngleOffset);
          const z1 = rz * Math.cos(ringAngleOffset) + rx * Math.sin(ringAngleOffset);
          const y1 = ry * cosX - z1 * sinX;
          const z2 = z1 * cosX + ry * sinX;

          const scale = fov / (fov + z2 + 300);
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.strokeStyle = rIdx === 0
          ? "rgba(212, 160, 23, 0.4)"
          : rIdx === 1
          ? "rgba(232, 193, 88, 0.2)"
          : "rgba(22, 59, 46, 0.4)";
        ctx.lineWidth = rIdx === 0 ? 1.5 : 1;
        ctx.stroke();
      });

      // 3. Draw 3D Sacred Kolanut Polyhedron (Central Core)
      const projectedKolanut = kolanutVertices.map((v) => {
        // Auto-rotation around all axes
        const kRotY = angleY * 1.5;
        const kRotX = angleX * 1.2;
        const x1 = v.x * Math.cos(kRotY) - v.z * Math.sin(kRotY);
        const z1 = v.z * Math.cos(kRotY) + v.x * Math.sin(kRotY);
        const y1 = v.y * Math.cos(kRotX) - z1 * Math.sin(kRotX);
        const z2 = z1 * Math.cos(kRotX) + v.y * Math.sin(kRotX);

        const scale = fov / (fov + z2 + 250);
        return {
          x: centerX + x1 * scale,
          y: centerY + y1 * scale,
          z: z2,
          scale,
        };
      });

      // Kolanut Edges
      ctx.beginPath();
      kolanutEdges.forEach(([start, end]) => {
        const p1 = projectedKolanut[start];
        const p2 = projectedKolanut[end];
        if (p1.scale > 0 && p2.scale > 0) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      });
      ctx.strokeStyle = "rgba(212, 160, 23, 0.75)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Kolanut Glowing Vertices
      projectedKolanut.forEach((p) => {
        if (p.scale > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = "#FFF3D1";
          ctx.shadowColor = "#D4A017";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 4. Project & Draw African Capital Constellation Nodes
      const projectedNodes = nodes.map((node) => {
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const scale = fov / (fov + z2 + 250);
        return {
          ...node,
          screenX: centerX + x1 * scale,
          screenY: centerY + y1 * scale,
          depth: z2,
          scale,
        };
      });

      // Sort by depth (painter's algorithm)
      projectedNodes.sort((a, b) => a.depth - b.depth);

      // Draw constellation connective lines between nearest nodes
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);

          if (dist < 110) {
            const alpha = Math.max(0, (1 - dist / 110) * 0.45 * Math.min(n1.scale, n2.scale));
            ctx.beginPath();
            ctx.moveTo(n1.screenX, n1.screenY);
            ctx.lineTo(n2.screenX, n2.screenY);
            ctx.strokeStyle = `rgba(212, 160, 23, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projectedNodes.forEach((node) => {
        if (node.scale <= 0) return;

        const pulse = Math.sin(time * 0.003 + node.pulsePhase) * 0.4 + 1;
        const radius = node.size * node.scale * pulse;

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${0.25 * node.scale})`;
        ctx.fill();

        // Solid node core
        ctx.beginPath();
        ctx.arc(node.screenX, node.screenY, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node label (only for major nodes when facing front)
        if (node.depth > -30) {
          ctx.font = "9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = `rgba(247, 243, 233, ${Math.min(1, (node.depth + 30) / 100)})`;
          ctx.textAlign = "center";
          ctx.fillText(node.name, node.screenX, node.screenY - radius - 5);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetAngleY = x * 0.8;
      targetAngleX = 0.2 - y * 0.6;
      setMousePos({ x: x * 20, y: y * 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[640px] lg:min-h-[760px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-accf-charcoal via-accf-green-deep/90 to-accf-charcoal text-accf-ivory"
    >
      {/* 3D Background Mathematical Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Atmospheric Radial Light Beam & Auroras */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-accf-gold/15 via-accf-green/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-12 right-12 w-96 h-96 bg-accf-gold/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accf-green/30 rounded-full blur-2xl" />
      </div>

      {/* Main Grid Content: Left Typography + Right Interactive 3D Hologram Cards */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Two-Tone Typography & CTA Movement */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-accf-green/80 border border-accf-gold/40 text-xs font-mono tracking-widest uppercase text-accf-gold shadow-lg backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-accf-gold animate-ping" />
            <span>Africa&apos;s Largest Food, Culture &amp; Peace Movement</span>
          </div>

          {/* H1 Two-Tone Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[0.92] tracking-tight text-accf-ivory drop-shadow-md">
            Take A Seat <br />
            <span className="gold-text-gradient italic font-normal">For Africa</span>
          </h1>

          {/* Subhead Tagline */}
          <div className="font-serif text-xl sm:text-2xl text-accf-gold-soft font-medium tracking-wide flex items-center gap-2">
            <span>Breaking The Kolanut For The Peace of Africa</span>
          </div>

          {/* Lede Body */}
          <p className="text-base sm:text-lg text-accf-ivory/85 max-w-2xl leading-relaxed font-normal">
            Uniting 54 African nations and the global Diaspora through ancestral food traditions,
            the 2km African Peace Table, and the Living African Kolanut Tree.
          </p>

          {/* Primary Action Row */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/membership/checkout"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accf-gold to-accf-gold-soft text-accf-charcoal font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-2xl shadow-accf-gold/20 inline-flex items-center gap-2.5 group"
            >
              <span>Take Your Digital Seat</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/kolanut-tree"
              className="px-7 py-4 rounded-xl bg-accf-charcoal-card border border-accf-gold/50 text-accf-ivory font-semibold text-sm hover:border-accf-gold hover:bg-accf-green/50 transition-all inline-flex items-center gap-2 backdrop-blur-md shadow-lg"
            >
              <TreePine className="w-4 h-4 text-accf-gold" />
              <span>Join The Kolanut Tree</span>
            </Link>

            <button
              onClick={onOpenVideo}
              className="px-5 py-4 rounded-xl text-sm text-accf-ivory hover:text-accf-gold transition-colors inline-flex items-center gap-3 group backdrop-blur-sm"
            >
              <span className="w-10 h-10 rounded-full bg-accf-gold/20 border border-accf-gold group-hover:bg-accf-gold group-hover:text-accf-charcoal text-accf-gold flex items-center justify-center transition-all shadow-md group-hover:scale-110">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              <span className="font-semibold">Watch Documentary</span>
            </button>
          </div>

          {/* Live Micro Metric Tickers */}
          <div className="pt-6 border-t border-accf-line/40 grid grid-cols-3 gap-4 text-xs font-mono text-accf-ivory/80">
            <div>
              <span className="text-accf-gold font-bold text-lg block">300M+</span>
              <span className="text-[10px] text-accf-ivory/60 uppercase">Digital Seats</span>
            </div>
            <div>
              <span className="text-accf-gold font-bold text-lg block">54</span>
              <span className="text-[10px] text-accf-ivory/60 uppercase">Nations Connected</span>
            </div>
            <div>
              <span className="text-accf-gold font-bold text-lg block">2 KM</span>
              <span className="text-[10px] text-accf-ivory/60 uppercase">Peace Table</span>
            </div>
          </div>
        </div>

        {/* Right Column: Spatial 3D Motion Interactive Hologram Cards */}
        <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[500px] flex items-center justify-center perspective-[1200px]">
          {/* Central 3D Sovereign Pass Card (Hover Tilt Reactive) */}
          <div
            onMouseEnter={() => setActiveCard(0)}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              transform: `rotateY(${mousePos.x * 0.8}deg) rotateX(${-mousePos.y * 0.8}deg) translateZ(30px)`,
              transition: "transform 0.15s ease-out",
            }}
            className="w-full max-w-sm bg-gradient-to-br from-accf-charcoal-card via-accf-green-deep to-accf-charcoal p-6 rounded-3xl border-2 border-accf-gold shadow-2xl backdrop-blur-xl relative overflow-hidden group cursor-pointer"
          >
            {/* Holographic Shimmer Beam */}
            <div className="absolute -inset-full bg-gradient-to-r from-transparent via-accf-gold/15 to-transparent rotate-45 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-accf-line">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=80&auto=format&fit=crop&q=80"
                  alt="ACCF Official Emblem"
                  className="w-10 h-10 rounded-full border border-accf-gold object-cover shadow"
                />
                <div>
                  <span className="text-[9px] font-mono uppercase text-accf-gold font-bold block">
                    Continental Sovereign Pass
                  </span>
                  <h4 className="font-serif font-bold text-sm text-accf-ivory">
                    Peace Table Delegate
                  </h4>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accf-gold text-accf-charcoal font-bold">
                VERIFIED
              </span>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center text-accf-ivory/80 font-mono text-[11px]">
                <span>Chair Sequence:</span>
                <strong className="text-accf-gold font-bold">AKDT-0000001</strong>
              </div>
              <div className="flex justify-between items-center text-accf-ivory/80 font-mono text-[11px]">
                <span>Peace Table Seat:</span>
                <strong className="text-accf-ivory">Abuja Hub &bull; Zone A</strong>
              </div>
              <div className="flex justify-between items-center text-accf-ivory/80 font-mono text-[11px]">
                <span>Ancestral Pledge:</span>
                <strong className="text-emerald-400">Broken &amp; Shared</strong>
              </div>
            </div>

            {/* Micro 3D Radar Wave */}
            <div className="p-3 bg-black/40 rounded-2xl border border-accf-line/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-mono text-accf-ivory/90">
                  54 Nations Broadcasting
                </span>
              </div>
              <Compass className="w-4 h-4 text-accf-gold animate-spin" style={{ animationDuration: "12s" }} />
            </div>

            <div className="mt-4 pt-3 border-t border-accf-line flex items-center justify-between text-[10px] font-mono text-accf-gold">
              <span>AFRICAN CULTURAL CULINARY FESTIVAL</span>
              <span>2026</span>
            </div>
          </div>

          {/* Floating 3D Satellite Card 1: 2km Peace Table (Top Right) */}
          <div
            style={{
              transform: `translate3d(${mousePos.x * -0.5 + 150}px, ${mousePos.y * -0.5 - 160}px, 60px)`,
              transition: "transform 0.25s ease-out",
              animationDuration: "5s",
            }}
            className="hidden sm:flex absolute -top-4 -right-6 p-4 bg-accf-charcoal/90 border border-accf-gold/60 rounded-2xl shadow-2xl backdrop-blur-md items-center gap-3 w-56 animate-bounce"
          >
            <div className="w-10 h-10 rounded-xl bg-accf-maroon flex items-center justify-center flex-shrink-0 text-accf-gold shadow">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-accf-ivory">2km Peace Table</div>
              <div className="text-[10px] font-mono text-accf-gold-soft">10,000 Seats at Eagle Sq.</div>
            </div>
          </div>

          {/* Floating 3D Satellite Card 2: African Kolanut Tree (Bottom Left) */}
          <div
            style={{
              transform: `translate3d(${mousePos.x * -0.6 - 130}px, ${mousePos.y * -0.6 + 170}px, 50px)`,
              transition: "transform 0.25s ease-out",
              animationDuration: "4s",
            }}
            className="hidden sm:flex absolute -bottom-6 -left-6 p-4 bg-accf-green-deep/90 border border-accf-gold/60 rounded-2xl shadow-2xl backdrop-blur-md items-center gap-3 w-60 animate-pulse"
          >
            <div className="w-10 h-10 rounded-xl bg-accf-green flex items-center justify-center flex-shrink-0 text-accf-gold shadow">
              <TreePine className="w-5 h-5" />
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-accf-ivory">Living Kolanut Tree</div>
              <div className="text-[10px] font-mono text-emerald-300">300M+ Digital Tree Nodes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
