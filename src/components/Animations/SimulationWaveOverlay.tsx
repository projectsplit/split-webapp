import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

interface WaveConfig {
  baseY: number;
  amplitude: number;
  wavelength: number;
  speed: number;
  thickness: number;
  glow: number;
  color: string;
  opacity: number;
  phase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
}

const WAVES: WaveConfig[] = [
  // Deep background — slow, sweeping, subtle
  { baseY: 0.22, amplitude: 85, wavelength: 950, speed: 0.25, thickness: 1.5, glow: 50, color: '#8300e7', opacity: 0.07, phase: 0 },
  { baseY: 0.78, amplitude: 75, wavelength: 880, speed: 0.2, thickness: 1.5, glow: 45, color: '#8300e7', opacity: 0.055, phase: Math.PI },

  // Mid background
  { baseY: 0.32, amplitude: 58, wavelength: 580, speed: 0.45, thickness: 1.5, glow: 38, color: '#ac5ee7', opacity: 0.11, phase: 1.2 },
  { baseY: 0.68, amplitude: 52, wavelength: 520, speed: 0.4, thickness: 1.5, glow: 34, color: '#ac5ee7', opacity: 0.09, phase: 3.8 },

  // Core layer — the main visible waves
  { baseY: 0.4, amplitude: 44, wavelength: 400, speed: 0.7, thickness: 1.5, glow: 28, color: '#ddb7ff', opacity: 0.19, phase: 0.5 },
  { baseY: 0.5, amplitude: 50, wavelength: 360, speed: 0.6, thickness: 1.5, glow: 26, color: '#E151EE', opacity: 0.24, phase: 2.3 },
  { baseY: 0.6, amplitude: 40, wavelength: 340, speed: 0.8, thickness: 1.5, glow: 24, color: '#E151EE', opacity: 0.21, phase: 4.1 },

  // Bright accent — fast, detailed
  { baseY: 0.46, amplitude: 32, wavelength: 270, speed: 1.0, thickness: 1, glow: 18, color: '#ddb7ff', opacity: 0.32, phase: 1.8 },
  { baseY: 0.54, amplitude: 26, wavelength: 230, speed: 1.15, thickness: 0.8, glow: 14, color: '#E151EE', opacity: 0.28, phase: 5.0 },
];

const MAX_PARTICLES = 25;
const PARTICLE_COLORS = ['#E151EE', '#ddb7ff', '#ac5ee7'];

function getWaveY(
  x: number,
  wave: WaveConfig,
  time: number,
  w: number,
  h: number,
  originX: number,
  originY: number,
): number {
  const baseY = wave.baseY * h;
  const t = time;

  const p1 = Math.sin((x / wave.wavelength) * Math.PI * 2 + t * wave.speed + wave.phase);
  const p2 = Math.sin((x / (wave.wavelength * 1.7)) * Math.PI * 2 + t * wave.speed * 0.6 + wave.phase * 1.3) * 0.3;
  const p3 = Math.sin((x / (wave.wavelength * 0.5)) * Math.PI * 2 + t * wave.speed * 1.3 + wave.phase * 0.7) * 0.12;

  const drift = Math.sin(t * 0.15 + wave.phase) * 8;

  const dx = (x - originX) / w;
  const dy = (baseY - originY) / h;
  const dist = Math.sqrt(dx * dx + dy * dy * 3);
  const envelope = Math.exp(-dist * dist * 1.8) * 0.65 + 0.35;

  return baseY + (p1 + p2 + p3) * wave.amplitude * envelope + drift;
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  wave: WaveConfig,
  time: number,
  w: number,
  h: number,
  originX: number,
  originY: number,
  fadeIn: number,
) {
  const step = 3;

  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  for (let x = 0; x <= w; x += step) {
    const y = getWaveY(x, wave, time, w, h, originX, originY);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  // Glow pass — wide, soft, transparent
  ctx.globalAlpha = wave.opacity * fadeIn * 0.35;
  ctx.strokeStyle = wave.color;
  ctx.lineWidth = wave.thickness * 8;
  ctx.shadowBlur = wave.glow;
  ctx.shadowColor = wave.color;
  ctx.stroke();

  // Core pass — thin, bright
  ctx.globalAlpha = wave.opacity * fadeIn;
  ctx.lineWidth = wave.thickness;
  ctx.shadowBlur = wave.glow * 0.4;
  ctx.stroke();

  ctx.restore();
}

function spawnParticle(particles: Particle[], w: number, h: number, originX: number, originY: number) {
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * Math.min(w, h) * 0.35;
  particles.push({
    x: originX + Math.cos(angle) * dist,
    y: originY + Math.sin(angle) * dist,
    vx: -(0.5 + Math.random() * 1.5),
    vy: (Math.random() - 0.5) * 0.4,
    size: 0.8 + Math.random() * 1.8,
    opacity: 0.2 + Math.random() * 0.4,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    life: 1,
  });
}

function updateAndDrawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  dt: number,
) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy + Math.sin(p.x * 0.01 + p.life * 5) * 0.2;
    p.life -= dt * 0.15;

    if (p.x < -20 || p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    const alpha = p.opacity * Math.min(1, p.life) * Math.min(1, p.life * 3);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

interface SimulationWaveOverlayProps {
  isActive: boolean;
  isResim:boolean;
}

export const SimulationWaveOverlay = ({ isActive, isResim }: SimulationWaveOverlayProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef(0);
  const startTimeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      setFading(false);
      startTimeRef.current = performance.now();
      particlesRef.current = [];
    } else if (visible) {
      setFading(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isActive, visible]);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    let lastFrameTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      const elapsed = (now - startTimeRef.current) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const originX = w * 0.65;
      const originY = h * 0.45;

      ctx.clearRect(0, 0, w, h);

      // Radial glow from origin — pulsing
      const pulse = Math.sin(elapsed * 0.8) * 0.3 + 0.7;
      const grad = ctx.createRadialGradient(
        originX, originY, 0,
        originX, originY, Math.max(w, h) * 0.65,
      );
      grad.addColorStop(0, `rgba(225, 81, 238, ${0.1 * pulse})`);
      grad.addColorStop(0.15, `rgba(131, 0, 231, ${0.06 * pulse})`);
      grad.addColorStop(0.4, `rgba(131, 0, 231, ${0.025 * pulse})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw waves with staggered fade-in
      WAVES.forEach((wave, i) => {
        const delay = i * 0.13;
        const fadeIn = Math.min(1, Math.max(0, (elapsed - delay) / 1.8));
        if (fadeIn <= 0) return;
        drawWave(ctx, wave, elapsed, w, h, originX, originY, fadeIn);
      });

      // Particles
      if (elapsed > 0.5 && particlesRef.current.length < MAX_PARTICLES && Math.random() < 0.25) {
        spawnParticle(particlesRef.current, w, h, originX, originY);
      }
      updateAndDrawParticles(ctx, particlesRef.current, dt);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <Overlay $fading={fading}>
      <Backdrop />
      <WaveCanvas ref={canvasRef} />
      <StatusContainer>
        <GlowRing />
        <StatusLabel>{isResim?"RE-SIMULATING":"SIMULATING"}</StatusLabel>
        <DotTrail>
          <AnimDot $delay={0}>.</AnimDot>
          <AnimDot $delay={0.3}>.</AnimDot>
          <AnimDot $delay={0.6}>.</AnimDot>
        </DotTrail>
      </StatusContainer>
    </Overlay>,
    document.body,
  );
};

/* ── Styled Components ───────────────────────────────── */

const Overlay = styled.div<{ $fading: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 9999;
  opacity: ${p => (p.$fading ? 0 : 1)};
  transition: opacity 1.2s ease;
  pointer-events: ${p => (p.$fading ? 'none' : 'all')};
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.88;
`;

const WaveCanvas = styled.canvas`
  position: absolute;
  inset: 0;
`;

const StatusContainer = styled.div`
  position: absolute;
  bottom: 3.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 1;
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 8px rgba(225, 81, 238, 0.6),
                0 0 20px rgba(225, 81, 238, 0.25),
                0 0 40px rgba(131, 0, 231, 0.1);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 12px rgba(225, 81, 238, 0.8),
                0 0 30px rgba(225, 81, 238, 0.4),
                0 0 60px rgba(131, 0, 231, 0.15);
    transform: scale(1.15);
  }
`;

const GlowRing = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, #E151EE 30%, #8300e7 100%);
  animation: ${pulseGlow} 2s ease-in-out infinite;
`;

const StatusLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  color: #ddb7ff;
  text-shadow: 0 0 16px rgba(225, 81, 238, 0.35);
`;

const DotTrail = styled.span`
  display: inline-flex;
  gap: 1px;
  margin-left: -0.5rem;
`;

const dotPulse = keyframes`
  0%, 20% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const AnimDot = styled.span<{ $delay: number }>`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.7rem;
  color: #ddb7ff;
  text-shadow: 0 0 16px rgba(225, 81, 238, 0.35);
  animation: ${dotPulse} 1.5s ease-in-out infinite;
  animation-delay: ${p => p.$delay}s;
`;
