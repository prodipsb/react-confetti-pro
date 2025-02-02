import * as React from "react";
import { useEffect, useRef } from "react";

interface ConfettiProps {
  particleCount?: number;
  colors?: string[];
  duration?: number;
  direction?: "left" | "center" | "right" | "both"; // New direction prop
}

const Confetti: React.FC<ConfettiProps> = ({
  particleCount = 150,
  colors = ["#4CAF50", "#FFC107", "#FF5722", "#2196F3"],
  duration = 3000,
  direction = "center", // Default direction is "center"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const getStartingPosition = () => {
      switch (direction) {
        case "left":
          return { x: canvasWidth * 0.25, y: canvasHeight / 2 };
        case "right":
          return { x: canvasWidth * 0.75, y: canvasHeight / 2 };
        case "both":
          return Math.random() > 0.5
            ? { x: canvasWidth * 0.25, y: canvasHeight / 2 }
            : { x: canvasWidth * 0.75, y: canvasHeight / 2 };
        case "center":
        default:
          return { x: canvasWidth / 2, y: canvasHeight / 2 };
      }
    };

    const particles = Array.from({ length: particleCount }, () => {
      const { x, y } = getStartingPosition();
      return {
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocityX: (Math.random() - 0.5) * 12, // Horizontal velocity
        velocityY: (Math.random() - 1) * 10, // Vertical velocity
        size: Math.random() * 10 + 5, // Random size between 5 and 15
        shape: ["circle", "square", "rectangle"][Math.floor(Math.random() * 3)], // Random shapes
        rotation: Math.random() * 360, // Initial rotation
        rotationSpeed: Math.random() * 10 - 5, // Rotation speed (-5 to 5)
        opacity: Math.random() * 0.8 + 0.2, // Random opacity
        flipSpeed: Math.random() * 5 + 2, // Flip speed for the page effect
        flip: 0, // Initial flip state
      };
    });

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.1; // Gravity effect
        particle.rotation += particle.rotationSpeed; // Increment rotation
        particle.flip += particle.flipSpeed; // Increment flip effect

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180); // Apply rotation
        ctx.globalAlpha = particle.opacity;

        // Page flip effect: alternate scaling on x-axis
        const flipFactor = Math.abs(Math.sin((particle.flip * Math.PI) / 180)) * 2 - 1;

        ctx.scale(flipFactor, 1); // Flip along the x-axis for page flip

        ctx.fillStyle = particle.color;
        if (particle.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.shape === "square") {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else if (particle.shape === "rectangle") {
          ctx.fillRect(-particle.size, -particle.size / 4, particle.size * 2, particle.size / 2);
        }

        ctx.restore();
      });
    };

    const interval = setInterval(() => {
      drawParticles();
    }, 30);

    const clearParticles = () => {
      particles.length = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    setTimeout(() => {
      clearInterval(interval);
      clearParticles();
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [particleCount, colors, duration, direction]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}
    />
  );
};

export default Confetti;
