"use client";

import React, { useState, useMemo, useRef } from "react";
import { TreeLeaf } from "@/types/master-models";
import {
  Sparkles,
  Heart,
  Globe2,
  ShieldCheck,
  Award,
  X,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";

interface BranchPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  region: "West Africa" | "East Africa" | "North Africa" | "Southern Africa" | "Central Africa" | "Diaspora";
}

// 48 predetermined branch attachment nodes across the 5 regional boughs
const LEAF_BRANCH_NODES: BranchPosition[] = [
  // 1. West Africa Canopy (Left Bough)
  { x: 260, y: 390, rotation: -35, scale: 1.1, region: "West Africa" },
  { x: 310, y: 360, rotation: -25, scale: 1.0, region: "West Africa" },
  { x: 200, y: 340, rotation: -45, scale: 1.15, region: "West Africa" },
  { x: 150, y: 290, rotation: -55, scale: 1.2, region: "West Africa" },
  { x: 180, y: 250, rotation: -40, scale: 1.0, region: "West Africa" },
  { x: 240, y: 270, rotation: -20, scale: 1.05, region: "West Africa" },
  { x: 280, y: 220, rotation: -15, scale: 1.1, region: "West Africa" },
  { x: 340, y: 250, rotation: -10, scale: 0.95, region: "West Africa" },
  { x: 220, y: 200, rotation: -30, scale: 1.1, region: "West Africa" },
  { x: 120, y: 240, rotation: -60, scale: 1.2, region: "West Africa" },

  // 2. East Africa Canopy (Right Bough)
  { x: 940, y: 390, rotation: 35, scale: 1.1, region: "East Africa" },
  { x: 890, y: 360, rotation: 25, scale: 1.0, region: "East Africa" },
  { x: 1000, y: 340, rotation: 45, scale: 1.15, region: "East Africa" },
  { x: 1050, y: 290, rotation: 55, scale: 1.2, region: "East Africa" },
  { x: 1020, y: 250, rotation: 40, scale: 1.0, region: "East Africa" },
  { x: 960, y: 270, rotation: 20, scale: 1.05, region: "East Africa" },
  { x: 920, y: 220, rotation: 15, scale: 1.1, region: "East Africa" },
  { x: 860, y: 250, rotation: 10, scale: 0.95, region: "East Africa" },
  { x: 980, y: 200, rotation: 30, scale: 1.1, region: "East Africa" },
  { x: 1080, y: 240, rotation: 60, scale: 1.2, region: "East Africa" },

  // 3. Central Africa Canopy (Center-Left Bough)
  { x: 440, y: 310, rotation: -20, scale: 1.05, region: "Central Africa" },
  { x: 410, y: 240, rotation: -25, scale: 1.1, region: "Central Africa" },
  { x: 470, y: 190, rotation: -10, scale: 1.0, region: "Central Africa" },
  { x: 380, y: 170, rotation: -35, scale: 1.15, region: "Central Africa" },
  { x: 330, y: 130, rotation: -45, scale: 1.2, region: "Central Africa" },
  { x: 430, y: 120, rotation: -15, scale: 1.0, region: "Central Africa" },
  { x: 490, y: 140, rotation: -5, scale: 1.1, region: "Central Africa" },
  { x: 360, y: 90, rotation: -40, scale: 1.15, region: "Central Africa" },

  // 4. North Africa Canopy (Center-Right Bough)
  { x: 760, y: 310, rotation: 20, scale: 1.05, region: "North Africa" },
  { x: 790, y: 240, rotation: 25, scale: 1.1, region: "North Africa" },
  { x: 730, y: 190, rotation: 10, scale: 1.0, region: "North Africa" },
  { x: 820, y: 170, rotation: 35, scale: 1.15, region: "North Africa" },
  { x: 870, y: 130, rotation: 45, scale: 1.2, region: "North Africa" },
  { x: 770, y: 120, rotation: 15, scale: 1.0, region: "North Africa" },
  { x: 710, y: 140, rotation: 5, scale: 1.1, region: "North Africa" },
  { x: 840, y: 90, rotation: 40, scale: 1.15, region: "North Africa" },

  // 5. Southern Africa & Diaspora (Crown & Apex)
  { x: 550, y: 230, rotation: -8, scale: 1.05, region: "Southern Africa" },
  { x: 650, y: 230, rotation: 8, scale: 1.05, region: "Southern Africa" },
  { x: 600, y: 180, rotation: 0, scale: 1.2, region: "Southern Africa" },
  { x: 540, y: 130, rotation: -12, scale: 1.1, region: "Diaspora" },
  { x: 660, y: 130, rotation: 12, scale: 1.1, region: "Diaspora" },
  { x: 600, y: 90, rotation: 0, scale: 1.3, region: "Diaspora" },
  { x: 570, y: 50, rotation: -10, scale: 1.15, region: "Diaspora" },
  { x: 630, y: 50, rotation: 10, scale: 1.15, region: "Diaspora" },
  { x: 600, y: 30, rotation: 0, scale: 1.35, region: "Southern Africa" },
  { x: 510, y: 80, rotation: -20, scale: 1.1, region: "Diaspora" },
  { x: 690, y: 80, rotation: 20, scale: 1.1, region: "Diaspora" },
  { x: 600, y: 280, rotation: 0, scale: 1.0, region: "Southern Africa" },
];

interface LivingKolanutTreeProps {
  leaves: TreeLeaf[];
  selectedRegion: string;
  searchQuery: string;
  onSelectLeaf: (leaf: TreeLeaf) => void;
  onOpenSignModal: () => void;
}

export function LivingKolanutTree({
  leaves,
  selectedRegion,
  searchQuery,
  onSelectLeaf,
  onOpenSignModal,
}: LivingKolanutTreeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Zoom & Pan state
  const [zoomLevel, setZoomLevel] = useState(1);

  // Hovered Leaf state
  const [hoveredLeaf, setHoveredLeaf] = useState<TreeLeaf | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number; nodeX: number; nodeY: number } | null>(null);
  const [blessedLeaves, setBlessedLeaves] = useState<Record<string, number>>({});

  // Map each leaf to a branch node position
  const mappedLeaves = useMemo(() => {
    return leaves.map((leaf, index) => {
      // Pick branch node
      const nodeIndex = index % LEAF_BRANCH_NODES.length;
      const baseNode = LEAF_BRANCH_NODES[nodeIndex];

      // Add pseudo-deterministic organic offset
      const seed = leaf.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const offsetX = ((seed % 20) - 10) * 1.5;
      const offsetY = (((seed * 7) % 20) - 10) * 1.5;

      return {
        ...leaf,
        posX: baseNode.x + offsetX,
        posY: baseNode.y + offsetY,
        rotation: baseNode.rotation + (seed % 15) - 7.5,
        scale: baseNode.scale * (0.9 + (seed % 20) / 100),
        boughRegion: baseNode.region,
      };
    });
  }, [leaves]);

  const handleLeafMouseEnter = (
    leaf: TreeLeaf,
    nodeX: number,
    nodeY: number,
    e: React.MouseEvent
  ) => {
    setHoveredLeaf(leaf);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate normalized position
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      setTooltipPos({ x: clientX, y: clientY, nodeX, nodeY });
    }
  };

  const handleLeafMouseLeave = () => {
    setHoveredLeaf(null);
    setTooltipPos(null);
  };

  const handleBless = (leafId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlessedLeaves((prev) => ({
      ...prev,
      [leafId]: (prev[leafId] || 0) + 1,
    }));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#0B1713] via-[#0E231B] to-[#0A120E] border-2 border-accf-gold/40 shadow-2xl select-none"
    >
      {/* Header Info Overlay */}
      <div className="absolute top-6 left-6 z-20 space-y-1 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accf-green-deep/90 border border-accf-gold/50 text-[10px] font-mono tracking-widest uppercase text-accf-gold backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-accf-gold animate-ping" />
          <span>The Living African Kolanut Tree</span>
        </div>
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-accf-ivory">
          300 Million Seats of Peace
        </h3>
        <p className="text-xs text-accf-ivory/70 max-w-sm font-light">
          Hover over any golden or emerald leaf to meet the sovereign member seated on Africa&apos;s tree.
        </p>
      </div>

      {/* Top Right Controls (Zoom + Count) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-accf-line text-[11px] font-mono text-accf-gold font-bold backdrop-blur-md">
          {leaves.length} Active Leaves Loaded
        </div>
        <div className="flex items-center bg-black/60 border border-accf-line rounded-xl p-1 backdrop-blur-md">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="p-1.5 hover:text-accf-gold text-accf-ivory/80 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1.5 hover:text-accf-gold text-accf-ivory/80 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 hover:text-accf-gold text-accf-ivory/80 transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main SVG Tree Canvas */}
      <div
        className="w-full h-[620px] sm:h-[740px] flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full max-h-[800px] overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Trunk Wood Grain Gradients */}
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E140D" />
              <stop offset="25%" stopColor="#3B2618" />
              <stop offset="50%" stopColor="#5E3F29" />
              <stop offset="75%" stopColor="#3B2618" />
              <stop offset="100%" stopColor="#1A110B" />
            </linearGradient>

            <linearGradient id="rootSoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E231B" />
              <stop offset="50%" stopColor="#1B120C" />
              <stop offset="100%" stopColor="#0A0806" />
            </linearGradient>

            {/* Golden Sap Glow */}
            <linearGradient id="sapGlow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#D4A017" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FDF3D6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D4A017" stopOpacity="0.2" />
            </linearGradient>

            {/* Canopy Foliage Gradients */}
            <radialGradient id="foliageWest" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1A4A38" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#0E2A20" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0E2A20" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="foliageEast" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#225E47" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#0E2A20" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0E2A20" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="foliageCrown" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2E6B52" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#D4A017" stopOpacity="0.2" />
              <stop offset="80%" stopColor="#0E2A20" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0E2A20" stopOpacity="0" />
            </radialGradient>

            {/* Gold Leaf Shimmer Gradient */}
            <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2CE" />
              <stop offset="50%" stopColor="#D4A017" />
              <stop offset="100%" stopColor="#966B08" />
            </linearGradient>

            {/* Emerald Leaf Gradient */}
            <linearGradient id="emeraldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#065F46" />
            </linearGradient>

            {/* Amber Leaf Gradient */}
            <linearGradient id="amberLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Leaf Glow Filter */}
            <filter id="leafGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="highlightGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ========================================================================= */}
          {/* 1. SOIL, SACRED EARTH & MYCORRHIZAL ENERGY VEINS                          */}
          {/* ========================================================================= */}
          <ellipse cx="600" cy="770" rx="460" ry="60" fill="url(#rootSoilGrad)" />

          {/* Glowing Mycorrhizal Soil Veins */}
          <g stroke="#D4A017" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
            <path d="M600,740 Q500,770 380,780 Q290,788 200,785" />
            <path d="M600,740 Q700,770 820,780 Q910,788 1000,785" />
            <path d="M580,750 Q480,785 340,795" />
            <path d="M620,750 Q720,785 860,795" />
          </g>

          {/* Deep Roots */}
          <g fill="url(#trunkGrad)" stroke="#1A110B" strokeWidth="2">
            <path d="M540,730 C480,750 360,765 240,775 C290,780 430,760 520,745 Z" />
            <path d="M660,730 C720,750 840,765 960,775 C910,780 770,760 680,745 Z" />
            <path d="M560,740 C520,760 460,775 380,785 C420,788 500,770 550,750 Z" />
            <path d="M640,740 C680,760 740,775 820,785 C780,788 700,770 650,750 Z" />
          </g>

          {/* ========================================================================= */}
          {/* 2. CANOPY FOLIAGE CLUSTERS (Atmospheric Background)                        */}
          {/* ========================================================================= */}
          {/* West Canopy Cloud */}
          <circle cx="250" cy="270" r="190" fill="url(#foliageWest)" />
          <circle cx="180" cy="220" r="140" fill="url(#foliageWest)" />

          {/* East Canopy Cloud */}
          <circle cx="950" cy="270" r="190" fill="url(#foliageEast)" />
          <circle cx="1020" cy="220" r="140" fill="url(#foliageEast)" />

          {/* Central & North Canopy */}
          <circle cx="430" cy="180" r="170" fill="url(#foliageWest)" />
          <circle cx="770" cy="180" r="170" fill="url(#foliageEast)" />

          {/* Crown Top Canopy */}
          <circle cx="600" cy="120" r="220" fill="url(#foliageCrown)" />
          <circle cx="600" cy="70" r="140" fill="url(#foliageCrown)" />

          {/* ========================================================================= */}
          {/* 3. MAJESTIC BAOBAB & KOLANUT TRUNK AND 5 CONTINENTAL BRANCHES             */}
          {/* ========================================================================= */}
          <g id="tree-trunk-and-boughs">
            {/* Main Massive Trunk */}
            <path
              d="M510,740 C530,620 545,510 560,450 C580,450 620,450 640,450 C655,510 670,620 690,740 C630,730 570,730 510,740 Z"
              fill="url(#trunkGrad)"
              stroke="#150D07"
              strokeWidth="3"
            />

            {/* Glowing Golden Sap Line ascending the heart of the tree */}
            <path
              d="M600,735 C595,640 605,530 600,450 C598,350 602,250 600,100"
              stroke="url(#sapGlow)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#leafGlow)"
            />

            {/* Branch 1: West Africa Bough (Left) */}
            <path
              d="M560,450 C500,430 380,390 280,360 C240,350 170,300 130,280 C160,290 260,320 340,335 C430,355 520,385 570,420 Z"
              fill="url(#trunkGrad)"
              stroke="#150D07"
              strokeWidth="2"
            />
            {/* Sub-branches West */}
            <path
              d="M340,335 C300,290 250,250 200,220 C230,240 290,270 330,300 Z"
              fill="url(#trunkGrad)"
            />
            <path
              d="M280,360 C240,380 180,390 140,410 C170,395 230,380 260,370 Z"
              fill="url(#trunkGrad)"
            />

            {/* Branch 2: East Africa Bough (Right) */}
            <path
              d="M640,450 C700,430 820,390 920,360 C960,350 1030,300 1070,280 C1040,290 940,320 860,335 C770,355 680,385 630,420 Z"
              fill="url(#trunkGrad)"
              stroke="#150D07"
              strokeWidth="2"
            />
            {/* Sub-branches East */}
            <path
              d="M860,335 C900,290 950,250 1000,220 C970,240 910,270 870,300 Z"
              fill="url(#trunkGrad)"
            />
            <path
              d="M920,360 C960,380 1020,390 1060,410 C1030,395 970,380 940,370 Z"
              fill="url(#trunkGrad)"
            />

            {/* Branch 3: Central Africa Bough (Center-Left) */}
            <path
              d="M580,430 C540,360 480,280 420,200 C390,160 340,120 300,90 C330,110 390,150 430,190 C480,250 530,330 585,380 Z"
              fill="url(#trunkGrad)"
              stroke="#150D07"
              strokeWidth="2"
            />
            <path
              d="M430,190 C460,150 500,120 530,90 C500,115 460,145 440,175 Z"
              fill="url(#trunkGrad)"
            />

            {/* Branch 4: North Africa Bough (Center-Right) */}
            <path
              d="M620,430 C660,360 720,280 780,200 C810,160 860,120 900,90 C870,110 810,150 770,190 C720,250 670,330 615,380 Z"
              fill="url(#trunkGrad)"
              stroke="#150D07"
              strokeWidth="2"
            />
            <path
              d="M770,190 C740,150 700,120 670,90 C700,115 740,145 760,175 Z"
              fill="url(#trunkGrad)"
            />

            {/* Branch 5: Southern Africa & Diaspora Apex Crown (Center Top) */}
            <path
              d="M590,410 C585,320 585,220 590,140 C590,100 580,60 560,30 C580,50 600,80 605,120 C610,210 615,310 610,410 Z"
              fill="url(#trunkGrad)"
              stroke="#150D07"
              strokeWidth="2"
            />
            <path
              d="M605,120 C625,90 655,65 680,40 C655,60 630,85 615,110 Z"
              fill="url(#trunkGrad)"
            />
          </g>

          {/* ========================================================================= */}
          {/* 4. INDIVIDUAL INTERACTIVE MEMBER LEAVES ATTACHED TO BRANCHES              */}
          {/* ========================================================================= */}
          <g id="interactive-leaves">
            {mappedLeaves.map((leaf) => {
              const isHovered = hoveredLeaf?.id === leaf.id;
              const isSelected = selectedRegion !== "All" && leaf.region === selectedRegion;
              const isDimmed = selectedRegion !== "All" && leaf.region !== selectedRegion;
              const isMatch =
                searchQuery.trim().length > 0 &&
                (leaf.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  leaf.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  leaf.chairNo.toLowerCase().includes(searchQuery.toLowerCase()));

              // Leaf Gradient selection based on leafType
              const leafGrad =
                leaf.leafType === "gold"
                  ? "url(#goldLeafGrad)"
                  : leaf.leafType === "emerald"
                  ? "url(#emeraldLeafGrad)"
                  : "url(#amberLeafGrad)";

              return (
                <g
                  key={leaf.id}
                  transform={`translate(${leaf.posX}, ${leaf.posY}) rotate(${leaf.rotation}) scale(${
                    isHovered ? leaf.scale * 1.55 : isMatch ? leaf.scale * 1.35 : leaf.scale
                  })`}
                  className={`cursor-pointer transition-all duration-300 ${
                    isDimmed ? "opacity-25" : "opacity-100"
                  }`}
                  onMouseEnter={(e) => handleLeafMouseEnter(leaf, leaf.posX, leaf.posY, e)}
                  onMouseLeave={handleLeafMouseLeave}
                  onClick={() => onSelectLeaf(leaf)}
                >
                  {/* Glowing beacon ring for search match or hover */}
                  {(isHovered || isMatch) && (
                    <circle
                      cx="0"
                      cy="-20"
                      r="32"
                      fill="none"
                      stroke="#D4A017"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      className="animate-spin"
                      style={{ animationDuration: "6s" }}
                    />
                  )}

                  {/* Pulsing Aura Halo */}
                  <circle
                    cx="0"
                    cy="-20"
                    r={isHovered ? "28" : "18"}
                    fill={leaf.leafType === "gold" ? "#D4A017" : "#10B981"}
                    fillOpacity={isHovered ? 0.6 : 0.25}
                    filter="url(#leafGlow)"
                  />

                  {/* Realistic African Leaf Geometry */}
                  <path
                    d="M0,0 C-10,-14 -16,-28 0,-44 C16,-28 10,-14 0,0 Z"
                    fill={leafGrad}
                    stroke="#FDF3D6"
                    strokeWidth={isHovered ? "2.5" : "1.2"}
                    filter={isHovered ? "url(#highlightGlow)" : "none"}
                  />

                  {/* Central Vein */}
                  <path
                    d="M0,0 L0,-40 M0,-12 L-6,-18 M0,-12 L6,-18 M0,-24 L-7,-30 M0,-24 L7,-30"
                    stroke="#FFF7D6"
                    strokeWidth="1"
                    strokeOpacity="0.75"
                    fill="none"
                  />

                  {/* Sacred Golden Kolanut Fruit / Bead at base */}
                  <circle
                    cx="0"
                    cy="-2"
                    r={isHovered ? 4.5 : 3}
                    fill="#FDF3D6"
                    stroke="#966B08"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Floating Interactive Member Tooltip / Glass Card */}
      {hoveredLeaf && tooltipPos && (
        <div
          style={{
            left: `${Math.min(Math.max(tooltipPos.x - 140, 20), (containerRef.current?.clientWidth || 900) - 320)}px`,
            top: `${Math.max(tooltipPos.y - 200, 20)}px`,
          }}
          className="absolute z-50 w-72 sm:w-80 p-4 rounded-2xl bg-accf-charcoal/95 border-2 border-accf-gold shadow-2xl backdrop-blur-xl pointer-events-auto animate-in fade-in zoom-in-95 duration-150 text-accf-ivory space-y-3"
        >
          {/* Member Header */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <img
                src={hoveredLeaf.photoUrl}
                alt={hoveredLeaf.memberName}
                className="w-12 h-12 rounded-full object-cover border-2 border-accf-gold shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accf-gold text-accf-charcoal flex items-center justify-center text-[9px] font-bold">
                ✓
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-accf-gold font-bold uppercase tracking-wider">
                  {hoveredLeaf.region}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-accf-green text-accf-gold font-semibold">
                  {hoveredLeaf.leafType === "gold" ? "Ambassador" : "Member"}
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm text-accf-ivory truncate">
                {hoveredLeaf.memberName}
              </h4>
              <div className="font-mono text-[10px] text-accf-ivory/70 flex items-center gap-1.5">
                <span>{hoveredLeaf.country}</span>
                <span>&bull;</span>
                <span className="text-accf-gold font-semibold">{hoveredLeaf.chairNo}</span>
              </div>
            </div>
          </div>

          {/* Member Peace Pledge */}
          <div className="p-2.5 rounded-xl bg-black/50 border border-accf-line/40 text-xs">
            <p className="italic text-accf-gold-soft font-serif line-clamp-3 leading-relaxed">
              &ldquo;{hoveredLeaf.pledgeText}&rdquo;
            </p>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1 border-t border-accf-line/40 text-xs">
            <button
              onClick={(e) => handleBless(hoveredLeaf.id, e)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accf-green/60 hover:bg-accf-green text-accf-gold transition-colors text-[11px] font-semibold"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-red-400" />
              <span>Bless Leaf ({(blessedLeaves[hoveredLeaf.id] || 0) + 12})</span>
            </button>

            <button
              onClick={() => onSelectLeaf(hoveredLeaf)}
              className="text-[11px] font-bold text-accf-gold hover:underline flex items-center gap-1"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Floating Bar */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-accf-charcoal/90 border border-accf-gold/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accf-green flex items-center justify-center text-accf-gold font-bold shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-accf-ivory">
              Claim Your Leaf on Africa&apos;s Tree
            </div>
            <div className="text-[10px] font-mono text-accf-gold-soft">
              Every pledge plants a permanent digital seat for unity and food security.
            </div>
          </div>
        </div>

        <button
          onClick={onOpenSignModal}
          className="px-6 py-2.5 rounded-xl bg-accf-gold text-accf-charcoal font-bold text-xs uppercase tracking-wider hover:bg-accf-gold-soft transition-transform hover:scale-105 shadow-lg flex items-center gap-2 flex-shrink-0"
        >
          <span>Sign Tree &amp; Sprout Your Leaf</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

