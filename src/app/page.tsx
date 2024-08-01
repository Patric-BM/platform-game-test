"use client";
import React, { useRef, useEffect } from "react";
import { CanvasManager } from "./CanvasManager";

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasManagerRef = useRef<CanvasManager | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvasManagerRef.current = new CanvasManager(canvas);
    canvasManagerRef.current.initialize();
  }, []);

  return (
    <div className="bg-slate-400 flex items-center justify-center">
      <canvas className="bg-black" ref={canvasRef} width="800" height="600" />
    </div>
  );
};

export default Home;
