import { useEffect, useRef } from "react";

/**
 * Live "reality model" for the solution hero: a point-cloud asset that rotates
 * slowly while a laser scan plane sweeps up through it. Captured points light
 * up, sensors ping once reached, and a HUD reports scan progress.
 *
 * Plain canvas 2D with a hand-rolled 3D projection: no WebGL or extra
 * dependency. Pauses off screen and renders one finished frame for visitors
 * who prefer reduced motion.
 */

export type ModelVariant = "tower" | "city" | "factory" | "terrain" | "racks";

const variantBySlug: Record<string, ModelVariant> = {
  "strategic-advisory": "city",
  "digital-engineering-bim": "tower",
  "reality-capture": "tower",
  "geospatial-intelligence": "terrain",
  "project-cost-information-management": "tower",
  "systems-data-integration": "city",
  "digital-twins": "tower",
  "asset-management": "factory",
  "smart-cities": "city",
  "smart-factories": "factory",
  "analytics-ai-automation": "city",
  "high-performance-computing": "racks",
};

const variantLabel: Record<ModelVariant, string> = {
  tower: "Tower · LOD 400",
  city: "Urban block · 1:500",
  factory: "Industrial site · LOD 300",
  terrain: "Terrain · DEM 0.5 m",
  racks: "Data hall · 6 racks",
};

const ORANGE = "241,89,35";
const STEEL = "185,200,216";
const LINE = "31,74,117";

type Box = { x: number; z: number; w: number; d: number; h: number; fh?: number };
type Model = { pts: Float32Array; edges: Float32Array; sensors: number[]; top: number };

// Deterministic so every visit draws the same model.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function boxesFor(variant: ModelVariant): { boxes: Box[]; terrain: boolean } {
  const r = rng(7);
  switch (variant) {
    case "tower":
      return {
        terrain: false,
        boxes: [
          { x: 0, z: 0, w: 1.3, d: 1.3, h: 0.35, fh: 0.12 }, // podium
          { x: -0.15, z: -0.1, w: 0.75, d: 0.75, h: 2.1 },
          { x: 0.35, z: 0.3, w: 0.45, d: 0.45, h: 1.3 },
        ],
      };
    case "city": {
      const boxes: Box[] = [];
      for (let i = -2; i <= 2; i++)
        for (let j = -2; j <= 2; j++) {
          if (r() < 0.18) continue;
          const tall = i === 0 && j === 0;
          boxes.push({
            x: i * 0.48,
            z: j * 0.48,
            w: 0.3 + r() * 0.08,
            d: 0.3 + r() * 0.08,
            h: tall ? 1.6 : 0.25 + r() * r() * 1.1,
          });
        }
      return { terrain: false, boxes };
    }
    case "factory":
      return {
        terrain: false,
        boxes: [
          { x: -0.3, z: 0, w: 1.5, d: 0.9, h: 0.45, fh: 0.15 },
          { x: 0.75, z: -0.35, w: 0.5, d: 0.5, h: 0.3, fh: 0.15 },
          { x: 0.7, z: 0.45, w: 0.16, d: 0.16, h: 1.25, fh: 0.15 }, // stack
          { x: 0.95, z: 0.45, w: 0.16, d: 0.16, h: 1.0, fh: 0.15 },
          { x: -0.65, z: 0.75, w: 0.35, d: 0.35, h: 0.6, fh: 0.15 }, // silo
        ],
      };
    case "racks":
      return {
        terrain: false,
        boxes: Array.from({ length: 6 }, (_, i) => ({
          x: (i % 3) * 0.55 - 0.55,
          z: Math.floor(i / 3) * 0.75 - 0.37,
          w: 0.32,
          d: 0.45,
          h: 1.15,
          fh: 0.09,
        })),
      };
    case "terrain":
      return {
        terrain: true,
        boxes: [
          { x: -0.35, z: 0.2, w: 0.18, d: 0.18, h: 0.35 },
          { x: 0.1, z: -0.3, w: 0.14, d: 0.22, h: 0.25 },
          { x: 0.45, z: 0.35, w: 0.2, d: 0.14, h: 0.3 },
        ],
      };
  }
}

const terrainY = (x: number, z: number) =>
  0.16 + 0.14 * Math.sin(x * 2.1 + 0.6) * Math.cos(z * 1.7) + 0.07 * Math.sin(x * 4.3 - z * 3.1);

function buildModel(variant: ModelVariant): Model {
  const { boxes, terrain } = boxesFor(variant);
  const r = rng(11);
  const p: number[] = [];
  const e: number[] = [];
  const jitter = () => (r() - 0.5) * 0.012;

  if (terrain) {
    for (let i = 0; i <= 44; i++)
      for (let j = 0; j <= 44; j++) {
        const x = -1.1 + (i / 44) * 2.2;
        const z = -1.1 + (j / 44) * 2.2;
        p.push(x, terrainY(x, z), z);
      }
  }

  for (const b of boxes) {
    const base = terrain ? terrainY(b.x, b.z) : 0;
    const fh = b.fh ?? 0.1;
    const x0 = b.x - b.w / 2;
    const x1 = b.x + b.w / 2;
    const z0 = b.z - b.d / 2;
    const z1 = b.z + b.d / 2;
    const y0 = base;
    const y1 = base + b.h;
    // Facade lattice: one ring of points per floor, like a scanned slab edge.
    const perim = 2 * (b.w + b.d);
    const steps = Math.max(8, Math.round(perim / 0.06));
    for (let y = y0; y <= y1 + 1e-6; y += fh) {
      for (let k = 0; k < steps; k++) {
        let t = (k / steps) * perim;
        let x: number, z: number;
        if (t < b.w) [x, z] = [x0 + t, z0];
        else if ((t -= b.w) < b.d) [x, z] = [x1, z0 + t];
        else if ((t -= b.d) < b.w) [x, z] = [x1 - t, z1];
        else [x, z] = [x0, z1 - (t - b.w)];
        p.push(x + jitter(), y + jitter(), z + jitter());
      }
    }
    // Mullions between floors
    for (let k = 0; k < steps; k += 3) {
      let t = (k / steps) * perim;
      let x: number, z: number;
      if (t < b.w) [x, z] = [x0 + t, z0];
      else if ((t -= b.w) < b.d) [x, z] = [x1, z0 + t];
      else if ((t -= b.d) < b.w) [x, z] = [x1 - t, z1];
      else [x, z] = [x0, z1 - (t - b.w)];
      for (let y = y0 + fh / 2; y < y1; y += fh) p.push(x + jitter(), y, z + jitter());
    }
    // Roof
    for (let i = 1; i < 6; i++)
      for (let j = 1; j < 6; j++)
        p.push(x0 + (b.w * i) / 6 + jitter(), y1, z0 + (b.d * j) / 6 + jitter());
    // Wireframe edges
    const c: [number, number][] = [
      [x0, z0],
      [x1, z0],
      [x1, z1],
      [x0, z1],
    ];
    for (let i = 0; i < 4; i++) {
      const [ax, az] = c[i]!;
      const [bx, bz] = c[(i + 1) % 4]!;
      e.push(ax, y0, az, bx, y0, bz, ax, y1, az, bx, y1, bz, ax, y0, az, ax, y1, az);
    }
  }

  // Normalise: centre on x/z, fit within the scene radius.
  let minX = Infinity,
    maxX = -Infinity,
    minZ = Infinity,
    maxZ = -Infinity,
    maxY = 0;
  for (let i = 0; i < p.length; i += 3) {
    minX = Math.min(minX, p[i]!);
    maxX = Math.max(maxX, p[i]!);
    maxY = Math.max(maxY, p[i + 1]!);
    minZ = Math.min(minZ, p[i + 2]!);
    maxZ = Math.max(maxZ, p[i + 2]!);
  }
  const cx = (minX + maxX) / 2;
  const cz = (minZ + maxZ) / 2;
  const s = 1 / Math.max((maxX - minX) / 2, (maxZ - minZ) / 2, maxY / 1.2);
  const norm = (arr: number[]) => {
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (arr[i]! - cx) * s;
      arr[i + 1] = arr[i + 1]! * s;
      arr[i + 2] = (arr[i + 2]! - cz) * s;
    }
    return new Float32Array(arr);
  };
  const pts = norm(p);
  const edges = norm(e);

  // Sensors: a few of the highest points, spread around the model.
  const order = Array.from({ length: pts.length / 3 }, (_, i) => i).sort(
    (a, b) => pts[b * 3 + 1]! - pts[a * 3 + 1]!,
  );
  const sensors: number[] = [];
  for (const i of order) {
    if (sensors.length === 4) break;
    const far = sensors.every((j) => {
      const dx = pts[i * 3]! - pts[j * 3]!;
      const dz = pts[i * 3 + 2]! - pts[j * 3 + 2]!;
      return dx * dx + dz * dz > 0.25;
    });
    if (far) sensors.push(i);
  }
  return { pts, edges, sensors, top: maxY * s };
}

const CYCLE = 10; // seconds per scan, including the hold at the top
const SWEEP = 0.68; // share of the cycle spent sweeping

export function RealityModel({ slug, tags }: { slug: string; tags: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const hudPct = useRef<HTMLSpanElement>(null);
  const hudPts = useRef<HTMLSpanElement>(null);
  const variant = variantBySlug[slug] ?? "tower";

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;

    const model = buildModel(variant);
    const n = model.pts.length / 3;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      visible = true,
      lastHud = 0;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const start = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = el.clientWidth;
      h = el.clientHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    const io = new IntersectionObserver(([en]) => (visible = en?.isIntersecting ?? true));
    io.observe(el);
    const onMove = (ev: PointerEvent) => {
      const b = el.getBoundingClientRect();
      mouse.tx = (ev.clientX - b.left) / b.width - 0.5;
      mouse.ty = (ev.clientY - b.top) / b.height - 0.5;
    };
    const onLeave = () => (mouse.tx = mouse.ty = 0);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const draw = (now: number) => {
      const t = reduce ? CYCLE * 0.9 : (now - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      const yaw = (reduce ? 0.7 : t * 0.14) + mouse.x * 0.6;
      const pitch = 0.5 + mouse.y * 0.25;
      const cy0 = Math.cos(yaw),
        sy0 = Math.sin(yaw),
        cp = Math.cos(pitch),
        sp = Math.sin(pitch);
      const S = Math.min(w, h) * 0.3;
      const cx = w / 2;
      const cyS = h * 0.54;
      const midY = model.top * 0.45;
      const D = 4.5;
      const proj = (x: number, y: number, z: number) => {
        const xr = x * cy0 - z * sy0;
        const zr = x * sy0 + z * cy0;
        const ys = (y - midY) * cp + zr * sp;
        const depth = zr * cp - (y - midY) * sp;
        const k = D / (D + depth);
        return [cx + xr * k * S, cyS - ys * k * S, k] as const;
      };

      // Scan progress: sweep up, then hold the finished capture.
      const phase = (t % CYCLE) / CYCLE;
      const prog = Math.min(phase / SWEEP, 1);
      const ease = prog < 1 ? 1 - Math.pow(1 - prog, 1.6) : 1;
      const scanY = -0.05 + ease * (model.top + 0.1);
      const holding = prog >= 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Ground grid
      ctx.lineWidth = 1;
      for (let g = -6; g <= 6; g++) {
        const v = g * 0.2;
        const a = 0.28 * (1 - Math.abs(g) / 7);
        ctx.strokeStyle = `rgba(${LINE},${a})`;
        for (const [x0, z0, x1, z1] of [
          [v, -1.2, v, 1.2],
          [-1.2, v, 1.2, v],
        ] as [number, number, number, number][]) {
          const [ax, ay] = proj(x0, 0, z0);
          const [bx, by] = proj(x1, 0, z1);
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      // Wireframe: captured edges brighten
      const E = model.edges;
      for (let i = 0; i < E.length; i += 6) {
        const done = Math.max(E[i + 1]!, E[i + 4]!) <= scanY;
        ctx.strokeStyle = done ? `rgba(${STEEL},0.4)` : `rgba(${LINE},0.7)`;
        const [ax, ay] = proj(E[i]!, E[i + 1]!, E[i + 2]!);
        const [bx, by] = proj(E[i + 3]!, E[i + 4]!, E[i + 5]!);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // Points
      const P = model.pts;
      let captured = 0;
      for (let i = 0; i < P.length; i += 3) {
        const y = P[i + 1]!;
        const [x2, y2, k] = proj(P[i]!, y, P[i + 2]!);
        const d = scanY - y;
        let size: number;
        if (!holding && Math.abs(d) < 0.035) {
          ctx.fillStyle = `rgba(${ORANGE},0.95)`;
          size = 2.2 * k;
        } else if (d > 0) {
          captured++;
          ctx.fillStyle = `rgba(255,255,255,${Math.min(0.95, 0.35 + 0.45 * k)})`;
          size = 1.5 * k;
        } else {
          ctx.fillStyle = `rgba(${STEEL},0.22)`;
          size = 1.2 * k;
        }
        ctx.fillRect(x2 - size / 2, y2 - size / 2, size, size);
      }

      // Scan plane
      if (!holding) {
        const c = [
          [-1.05, -1.05],
          [1.05, -1.05],
          [1.05, 1.05],
          [-1.05, 1.05],
        ].map(([x, z]) => proj(x!, scanY, z!));
        ctx.beginPath();
        c.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fillStyle = `rgba(${ORANGE},0.07)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${ORANGE},0.55)`;
        ctx.stroke();
      }

      // Sensors: ping once the scan has reached them
      for (const [si, s] of model.sensors.entries()) {
        const y = P[s * 3 + 1]!;
        if (y > scanY) continue;
        const [x2, y2, k] = proj(P[s * 3]!, y, P[s * 3 + 2]!);
        const [, yTop] = proj(P[s * 3]!, y + 0.22, P[s * 3 + 2]!);
        ctx.strokeStyle = `rgba(${ORANGE},0.7)`;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2, yTop);
        ctx.stroke();
        // diamond marker
        const r = 4 * k;
        ctx.fillStyle = `rgb(${ORANGE})`;
        ctx.beginPath();
        ctx.moveTo(x2, yTop - r);
        ctx.lineTo(x2 + r, yTop);
        ctx.lineTo(x2, yTop + r);
        ctx.lineTo(x2 - r, yTop);
        ctx.closePath();
        ctx.fill();
        if (!reduce) {
          const pulse = (t * 0.8 + si * 0.25) % 1;
          ctx.strokeStyle = `rgba(${ORANGE},${0.6 * (1 - pulse)})`;
          ctx.beginPath();
          ctx.arc(x2, yTop, r + pulse * 18 * k, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // HUD, throttled to avoid layout churn
      if (now - lastHud > 120 || reduce) {
        lastHud = now;
        if (hudPct.current)
          hudPct.current.textContent = String(Math.round((captured / n) * 100)).padStart(3, "0");
        if (hudPts.current) hudPts.current.textContent = (captured * 1240).toLocaleString("en-US");
      }
    };

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [variant]);

  const pins = ["left-0 top-[16%]", "right-0 top-[38%]", "bottom-[14%] left-[2%]"];

  return (
    <div
      ref={wrap}
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[32rem] select-none"
    >
      {/* Soft floor glow */}
      <div className="absolute inset-x-[15%] bottom-[18%] h-1/3 rounded-full bg-brand/10 blur-3xl" />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />

      {/* Viewfinder corners */}
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((c) => (
        <span key={c} className={`absolute h-6 w-6 border-brand/70 ${c}`} />
      ))}

      {/* HUD */}
      <div className="label absolute left-3 top-3 flex items-center gap-2 text-[10px] text-mist">
        <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-brand" />
        Live · Reality model
      </div>
      <div className="label absolute right-3 top-3 text-right text-[10px] text-slate-grey">
        {variantLabel[variant]}
      </div>
      <div className="label absolute bottom-3 left-3 right-3 flex items-end justify-between text-[10px] text-slate-grey">
        <span>
          Scan{" "}
          <span ref={hudPct} className="text-brand">
            000
          </span>
          %
        </span>
        <span>
          <span ref={hudPts} className="text-mist">
            0
          </span>{" "}
          pts
        </span>
      </div>

      {/* Pinned capabilities */}
      {tags.slice(0, 3).map((t, i) => (
        <span
          key={t}
          className={`reveal absolute flex max-w-[15rem] items-center gap-2 border border-line bg-night/85 px-3 py-2 backdrop-blur ${pins[i]}`}
          style={{ animationDelay: `${0.8 + i * 0.25}s` }}
        >
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-brand" />
          <span className="label truncate text-[11px] text-mist">{t}</span>
        </span>
      ))}
    </div>
  );
}
