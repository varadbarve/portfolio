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

    // Track original positions for explosion and glitch offsets
    const positionAttribute = geometry.attributes.position;
    const originalPositions = positionAttribute.clone();

    // Mouse velocity and speed tracking
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastTime = Date.now();
    let mouseSpeed = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        mouseSpeed = dist / dt; // pixels per ms
        
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        lastTime = now;
      }

      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation & Integration states
    let explodeFactor = 0;
    let targetExplodeFactor = 0;
    let glitchFactor = 0;
    const targetGlitchFactor = 0;
    let isDisintegrated = false;

    const handleInitializeCore = () => {
      isDisintegrated = false;
      targetExplodeFactor = 0.0;
      glitchFactor = 3.5; // Strong glitch jitter effect
    };
    window.addEventListener("initialize-core", handleInitializeCore);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Decelerate tracking speed over time
      mouseSpeed *= 0.95;

      // Spin speed threshold check (disintegrate at max speed)
      if (mouseSpeed > 4.5 && !isDisintegrated) {
        isDisintegrated = true;
        targetExplodeFactor = 1.0;
        glitchFactor = 1.5; // Burst of exit glitch
      }

      // Interpolate factors
      explodeFactor += (targetExplodeFactor - explodeFactor) * 0.08;
      
      if (glitchFactor > 0.01) {
        glitchFactor += (targetGlitchFactor - glitchFactor) * 0.06;
      } else {
        glitchFactor = 0;
      }

      // Update material opacity (fade out if disintegrated, fade back in otherwise)
      const targetOpacity = isDisintegrated ? 0 : 0.8;
      material.opacity += (targetOpacity - material.opacity) * 0.08;

      // Update geometry positions array with offsets
      const positions = positionAttribute.array as Float32Array;
      const originals = originalPositions.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        const ox = originals[i];
        const oy = originals[i + 1];
        const oz = originals[i + 2];

        // Radial normal outward direction
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / (dist || 1);
        const ny = oy / (dist || 1);
        const nz = oz / (dist || 1);

        // Apply high-frequency noise jitter for glitched state
        let jx = 0, jy = 0, jz = 0;
        if (glitchFactor > 0) {
          jx = (Math.random() - 0.5) * glitchFactor * 2.5;
          jy = (Math.random() - 0.5) * glitchFactor * 2.5;
          jz = (Math.random() - 0.5) * glitchFactor * 2.5;
        }

        positions[i] = ox + nx * explodeFactor * 25 + jx;
        positions[i + 1] = oy + ny * explodeFactor * 25 + jy;
        positions[i + 2] = oz + nz * explodeFactor * 25 + jz;
      }
      positionAttribute.needsUpdate = true;

      // Rotate hologram based on coordinates
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
      window.removeEventListener("initialize-core", handleInitializeCore);
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
