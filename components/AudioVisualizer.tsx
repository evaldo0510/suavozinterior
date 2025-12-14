import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  volume: number; // 0 to 1
  isActive: boolean;
  color: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ volume, isActive, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // State for organic movement
  const timeRef = useRef(0);
  const smoothedVolumeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Smooth volume transition (Neuroplasticity feel: quick to adapt, slow to forget)
      const targetVolume = isActive ? Math.max(0.05, volume) : 0;
      smoothedVolumeRef.current += (targetVolume - smoothedVolumeRef.current) * 0.1;
      
      const v = smoothedVolumeRef.current;
      timeRef.current += 0.01 + (v * 0.05); // Speed up slightly when loud

      // Clear with very slight fade for "dreamy" trails
      ctx.fillStyle = 'rgba(12, 10, 9, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      // Base size breathes slightly even when silent
      const baseRadius = 100 + (Math.sin(timeRef.current * 0.5) * 5); 
      const maxExpansion = 80;

      // Extract RGB
      const rgbMatch = color.match(/\d+\s*,\s*\d+\s*,\s*\d+/);
      const rgb = rgbMatch ? rgbMatch[0] : '120, 113, 108';

      // Draw Organic "Mind" Blob
      ctx.save();
      ctx.translate(centerX, centerY);

      // Create 3 layers of "fluid"
      for (let layer = 1; layer <= 3; layer++) {
        ctx.beginPath();
        const points = 100; // Resolution of the shape
        
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          
          // Organic distortion math
          // We combine multiple sine waves to create a non-repeating "blob" shape
          const wave1 = Math.sin(angle * 3 + timeRef.current * (layer * 0.5));
          const wave2 = Math.cos(angle * 5 - timeRef.current);
          const wave3 = Math.sin(angle * 7 + timeRef.current * 2);
          
          // The volume heavily influences how far the blob stretches
          const distortion = (wave1 + wave2 + wave3) * (v * maxExpansion);
          
          // Layer offset to create depth
          const layerOffset = (layer - 1) * 10;
          
          const r = baseRadius + distortion + layerOffset;
          
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();

        // Aesthetic: Soft, ethereal fill instead of hard lines
        if (layer === 1) {
            // Core
            ctx.fillStyle = `rgba(${rgb}, ${0.1 + v * 0.3})`;
            ctx.fill();
            // Subtle border
            ctx.strokeStyle = `rgba(${rgb}, ${0.3 + v * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        } else if (layer === 2) {
            // Middle Aura
            ctx.strokeStyle = `rgba(${rgb}, ${0.1 + v * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        } else {
            // Outer faint glow
            ctx.strokeStyle = `rgba(${rgb}, ${0.05 + v * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
      }
      
      // Inner "Nucleus" - The constant self
      const coreSize = 5 + (v * 10);
      ctx.beginPath();
      ctx.arc(0, 0, coreSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + v * 0.5})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${rgb}, 1)`;
      ctx.fill();

      ctx.restore();

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
      width={800} 
      height={800}
      className="w-full h-full object-contain"
    />
  );
};

export default AudioVisualizer;