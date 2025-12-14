import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  volume: number; // 0 to 1
  isActive: boolean;
  color: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ volume, isActive, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Smooth out volume changes but allow for sharper attacks
  const smoothedVolumeRef = useRef(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Phase for sine waves
    let phase = 0;

    const render = () => {
      // Non-linear sensitivity: boost lower volumes, cap higher
      const targetVolume = isActive ? Math.max(0.02, volume * 1.5) : 0.01;
      
      // Responsive smoothing: attack fast, release slow
      if (targetVolume > smoothedVolumeRef.current) {
         smoothedVolumeRef.current += (targetVolume - smoothedVolumeRef.current) * 0.3; // Fast attack
      } else {
         smoothedVolumeRef.current += (targetVolume - smoothedVolumeRef.current) * 0.05; // Slow decay
      }
      
      const v = smoothedVolumeRef.current;
      
      // Update rotation based on intensity
      rotationRef.current += 0.005 + (v * 0.05);

      // Clear with trail effect
      ctx.fillStyle = 'rgba(12, 10, 9, 0.25)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 20;

      // Extract RGB values for robust rgba creation
      const rgbMatch = color.match(/\d+\s*,\s*\d+\s*,\s*\d+/);
      const rgb = rgbMatch ? rgbMatch[0] : '120, 113, 108';

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationRef.current);
      ctx.translate(-centerX, -centerY);

      // Draw multiple rings
      const rings = 4;
      
      for (let i = 0; i < rings; i++) {
        ctx.beginPath();
        
        // Dynamic radius calculation
        const baseR = (maxRadius * 0.3) + (i * 25);
        // Exaggerate the expansion for visual impact
        const expansion = (v * 120) * (1 - i * 0.15); 
        
        // Add complex sine wave wobble
        const wobble = Math.sin(phase * 2 + i) * (5 + v * 10);
        
        const r = Math.max(0, baseR + expansion + wobble);
        
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        
        // Dynamic line width
        ctx.lineWidth = 1 + (v * 8 * (1 - i/rings));
        
        // Dynamic opacity based on volume
        const alpha = Math.max(0, 0.4 + (v * 0.6) - (i * 0.1));
        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.stroke();
      }
      
      // Inner glowing core
      ctx.beginPath();
      const coreBase = maxRadius * 0.15;
      const corePulse = v * 60;
      ctx.arc(centerX, centerY, coreBase + corePulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${0.2 + v * 0.5})`;
      ctx.fill();
      
      // Core highlight
      ctx.beginPath();
      ctx.arc(centerX, centerY, (coreBase + corePulse) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + v * 0.3})`;
      ctx.fill();

      ctx.restore();

      phase += 0.05;
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [volume, isActive, color]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-full h-full max-w-[400px] max-h-[400px]"
    />
  );
};

export default AudioVisualizer;