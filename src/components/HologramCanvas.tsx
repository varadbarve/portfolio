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

    // Use non-indexed geometry so faces do not share vertices.
    // This allows individual triangular faces to fly apart as separate pieces!
    const baseGeometry = new THREE.IcosahedronGeometry(10, 1);
    const geometry = baseGeometry.toNonIndexed();
    baseGeometry.dispose(); // clean up base geometry

    const material = new THREE.MeshBasicMaterial({
      color: getHologramColor(),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const wireframe = new THREE.Mesh(geometry, material);
    scene.add(wireframe);

    camera.position.z = 25;

    // Track original positions for individual face vectors
    const positionAttribute = geometry.attributes.position;
    const originalPositions = positionAttribute.clone();
    
    // Calculate direction vector for each individual face (triangle)
    const faceDirections: THREE.Vector3[] = [];
    const originalsArray = originalPositions.array as Float32Array;
    for (let i = 0; i < originalsArray.length; i += 9) {
      const x1 = originalsArray[i], y1 = originalsArray[i+1], z1 = originalsArray[i+2];
      const x2 = originalsArray[i+3], y2 = originalsArray[i+4], z2 = originalsArray[i+5];
      const x3 = originalsArray[i+6], y3 = originalsArray[i+7], z3 = originalsArray[i+8];

      // Find the geometric center of this face
      const cx = (x1 + x2 + x3) / 3;
      const cy = (y1 + y2 + y3) / 3;
      const cz = (z1 + z2 + z3) / 3;

      // Normalise center to get direction vector pointing outwards
      const len = Math.sqrt(cx*cx + cy*cy + cz*cz) || 1;
      faceDirections.push(new THREE.Vector3(cx / len, cy / len, cz / len));
    }

    // Mouse coordinates and edge check config
    let mouseX = 0;
    let mouseY = 0;
    const EDGE_MARGIN = 55; // Margin in pixels from viewport borders

    // Animation & Integration states
    let explodeFactor = 0;
    let targetExplodeFactor = 0;
    let glitchFactor = 0;
    const targetGlitchFactor = 0;
    let isDisintegrated = false;

    // Smooth scroll integration state
    let scrollRotationBoost = 0;
    let scrollDepthTarget = 25;
    let scrollVelocityRipple = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;

      // Check if mouse is near viewport borders
      const nearLeft = e.clientX < EDGE_MARGIN;
      const nearRight = e.clientX > window.innerWidth - EDGE_MARGIN;
      const nearTop = e.clientY < EDGE_MARGIN;
      const nearBottom = e.clientY > window.innerHeight - EDGE_MARGIN;

      if ((nearLeft || nearRight || nearTop || nearBottom) && !isDisintegrated) {
        isDisintegrated = true;
        targetExplodeFactor = 1.0;
        glitchFactor = 2.0; // exit glitch burst
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeaveWindow = () => {
      if (!isDisintegrated) {
        isDisintegrated = true;
        targetExplodeFactor = 1.0;
        glitchFactor = 2.0;
      }
    };
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    const handleInitializeCore = () => {
      isDisintegrated = false;
      targetExplodeFactor = 0.0;
      glitchFactor = 3.5; // strong glitch jitter upon rebuild
    };
    window.addEventListener("initialize-core", handleInitializeCore);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate factors
      explodeFactor += (targetExplodeFactor - explodeFactor) * 0.08;
      
      if (glitchFactor > 0.01) {
        glitchFactor += (targetGlitchFactor - glitchFactor) * 0.06;
      } else {
        glitchFactor = 0;
      }

      // Update material opacity
      const targetOpacity = isDisintegrated ? 0 : 0.8;
      material.opacity += (targetOpacity - material.opacity) * 0.08;

      // Update position coordinates face by face
      const positions = positionAttribute.array as Float32Array;
      const originals = originalPositions.array as Float32Array;

      for (let f = 0; f < faceDirections.length; f++) {
        const dir = faceDirections[f];
        const idx = f * 9;

        // Radial explosion vector specific to this face
        const explodeX = dir.x * explodeFactor * 30;
        const explodeY = dir.y * explodeFactor * 30;
        const explodeZ = dir.z * explodeFactor * 30;

        // Apply offsets to all three vertices of this face
        for (let v = 0; v < 3; v++) {
          const vidx = idx + v * 3;
          const ox = originals[vidx];
          const oy = originals[vidx + 1];
          const oz = originals[vidx + 2];

          // High frequency glitch jitter + scroll velocity ripple
          let jx = 0, jy = 0, jz = 0;
          if (glitchFactor > 0 || scrollVelocityRipple > 0.05) {
            const jitterMagnitude = glitchFactor * 2.5 + scrollVelocityRipple;
            jx = (Math.random() - 0.5) * jitterMagnitude;
            jy = (Math.random() - 0.5) * jitterMagnitude;
            jz = (Math.random() - 0.5) * jitterMagnitude;
          }

          positions[vidx] = ox + explodeX + jx;
          positions[vidx + 1] = oy + explodeY + jy;
          positions[vidx + 2] = oz + explodeZ + jz;
        }
      }
      positionAttribute.needsUpdate = true;

      // --- Scroll-driven effects ---
      const smoothScroll = (window as Window & {
        __smoothScroll?: {
          current: number;
          velocity: number;
        };
      }).__smoothScroll;
      if (smoothScroll) {
        // Rotation boost: increases as user scrolls through hero zone (0–100vh)
        const heroProgress = Math.min(smoothScroll.current / window.innerHeight, 1);
        const targetBoost = heroProgress * 0.04;
        scrollRotationBoost += (targetBoost - scrollRotationBoost) * 0.05;

        // Depth pull: camera eases from z=25 to z=35 as user scrolls past hero
        scrollDepthTarget = 25 + heroProgress * 10;
        camera.position.z += (scrollDepthTarget - camera.position.z) * 0.06;

        // Velocity ripple: subtle vertex displacement proportional to scroll speed
        const absVelocity = Math.abs(smoothScroll.velocity);
        const targetRipple = Math.min(absVelocity * 0.15, 2.5);
        scrollVelocityRipple += (targetRipple - scrollVelocityRipple) * 0.1;
      }

      // Rotate hologram based on coordinates + scroll boost
      wireframe.rotation.x += 0.005 + mouseY * 0.02 + scrollRotationBoost;
      wireframe.rotation.y += 0.005 + mouseX * 0.02 + scrollRotationBoost * 0.7;

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
      window.removeEventListener("mouseleave", handleMouseLeaveWindow);
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
