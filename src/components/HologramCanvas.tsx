import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HologramCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    
    // Set sizing with device pixel ratio support
    const resizeRenderer = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(dpr);
    };
    resizeRenderer();

    // Initial hologram color from computed CSS style
    const getHologramColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--hologram-color")
        .trim();
      return color || "#00ffc2";
    };

    const geometry = new THREE.IcosahedronGeometry(10, 1);
    const material = new THREE.MeshBasicMaterial({
      color: getHologramColor(),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const wireframe = new THREE.Mesh(geometry, material);
    scene.add(wireframe);

    camera.position.z = 25;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      wireframe.rotation.x += 0.005 + mouseY * 0.02;
      wireframe.rotation.y += 0.005 + mouseX * 0.02;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      resizeRenderer();
    };
    window.addEventListener("resize", handleResize);

    // Watch for theme changes to update wireframe color
    const observer = new MutationObserver(() => {
      material.color.set(getHologramColor());
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="absolute top-0 left-0 w-full h-full z-5 pointer-events-none"
    />
  );
}
