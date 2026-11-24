import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Interactive Three.js 3D Automotive Precision Studio:
 * - Fully touchable & draggable 360° in 3D space (OrbitControls with smooth damping)
 * - Sculpted aerodynamic coupe silhouette with metallic titanium-midnight Standox finish
 * - Crisp sky-cyan CAD wireframe edges & sweeping laser-alignment scan plane
 * - Rotating calibration turntable rings & floating metallic particles
 * - Page scroll preserved (enableZoom = false) so scrolling down stays effortless
 */
export function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.045);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.6, 2.25, 5.4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Lighting — bright, sleek paint-booth studio setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 6.5, 20);
    cyanRimLight.position.set(-4.5, 2.5, 3.2);
    scene.add(cyanRimLight);

    const steelRimLight = new THREE.PointLight(0x818cf8, 4.0, 18);
    steelRimLight.position.set(4.5, 1.8, -3.5);
    scene.add(steelRimLight);

    const overheadStrip = new THREE.SpotLight(0xe0f2fe, 3.4, 22, Math.PI / 3.5, 0.6);
    overheadStrip.position.set(0, 7.5, 0);
    scene.add(overheadStrip);

    // OrbitControls — lets users click/touch & drag the car freely in 3D!
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false; // keep page scrolling smooth
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.3;
    controls.minPolarAngle = Math.PI / 6;
    controls.maxPolarAngle = Math.PI / 2.04;

    // Main turntable assembly
    const studioGroup = new THREE.Group();
    const updateGroupOffset = (w: number) => {
      const offsetX = w >= 1024 ? 1.55 : 0;
      studioGroup.position.x = offsetX;
      studioGroup.position.y = w >= 1024 ? -0.3 : -0.45;
      studioGroup.scale.setScalar(w >= 1024 ? 1.12 : 0.88);
      // Orbit smoothly around the car's actual center
      controls.target.set(offsetX, 0.45, 0);
      controls.update();
    };
    updateGroupOffset(width);
    scene.add(studioGroup);

    // --- 1. Sculpted Sports Coupe Silhouette ---
    const carGroup = new THREE.Group();
    studioGroup.add(carGroup);

    const carShape = new THREE.Shape();
    carShape.moveTo(-2.35, 0.28);
    carShape.lineTo(-2.3, 0.56);
    carShape.quadraticCurveTo(-1.8, 0.78, -1.05, 0.84);
    carShape.quadraticCurveTo(-0.45, 1.32, 0.15, 1.36);
    carShape.quadraticCurveTo(1.15, 1.35, 1.85, 0.94);
    carShape.lineTo(2.3, 0.86);
    carShape.lineTo(2.38, 0.42);
    carShape.lineTo(2.12, 0.28);
    carShape.lineTo(1.82, 0.28);
    carShape.absarc(1.42, 0.34, 0.44, 0, Math.PI, false);
    carShape.lineTo(-0.98, 0.28);
    carShape.absarc(-1.42, 0.34, 0.44, 0, Math.PI, false);
    carShape.lineTo(-2.35, 0.28);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 1.56,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.14,
      bevelThickness: 0.16,
    };

    const carBodyGeo = new THREE.ExtrudeGeometry(carShape, extrudeSettings);
    carBodyGeo.center();
    carBodyGeo.translate(0, 0.78, 0);

    const carBodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      emissive: 0x082f49,
      emissiveIntensity: 0.4,
    });
    const carBodyMesh = new THREE.Mesh(carBodyGeo, carBodyMat);
    carGroup.add(carBodyMesh);

    const edgesGeo = new THREE.EdgesGeometry(carBodyGeo, 14);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.78,
    });
    const carWireframe = new THREE.LineSegments(edgesGeo, edgesMat);
    carGroup.add(carWireframe);

    // Headlights & Taillights
    const headlightGeo = new THREE.BoxGeometry(0.08, 0.1, 0.38);
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xf0f9ff });
    const hlLeft = new THREE.Mesh(headlightGeo, headlightMat);
    hlLeft.position.set(-2.34, 0.66, 0.52);
    const hlRight = hlLeft.clone();
    hlRight.position.z = -0.52;
    carGroup.add(hlLeft, hlRight);

    const taillightGeo = new THREE.BoxGeometry(0.08, 0.08, 1.38);
    const taillightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const tailLightBar = new THREE.Mesh(taillightGeo, taillightMat);
    tailLightBar.position.set(2.38, 0.78, 0);
    carGroup.add(tailLightBar);

    // --- Front & Rear Showroom Number Plates with Official FPB Logo ---
    const textureLoader = new THREE.TextureLoader();
    const plateLogoTex = textureLoader.load('/fpb-logo.png');
    plateLogoTex.colorSpace = THREE.SRGBColorSpace;
    plateLogoTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const plateBackGeo = new THREE.BoxGeometry(0.72, 0.18, 0.024);
    const plateBackMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      metalness: 0.15,
    });
    const plateFrameGeo = new THREE.BoxGeometry(0.76, 0.21, 0.016);
    const plateFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8,
    });
    const plateFaceGeo = new THREE.PlaneGeometry(0.64, 0.145);
    const plateFaceMat = new THREE.MeshBasicMaterial({
      map: plateLogoTex,
      transparent: true,
    });

    const createNumberPlate = () => {
      const pGroup = new THREE.Group();
      const frame = new THREE.Mesh(plateFrameGeo, plateFrameMat);
      frame.position.z = -0.006;
      const backing = new THREE.Mesh(plateBackGeo, plateBackMat);
      const face = new THREE.Mesh(plateFaceGeo, plateFaceMat);
      face.position.z = 0.013;
      pGroup.add(frame, backing, face);
      return pGroup;
    };

    // Front number plate (facing forward along -X)
    const frontPlate = createNumberPlate();
    frontPlate.position.set(-2.51, 0.44, 0);
    frontPlate.rotation.y = -Math.PI / 2;
    carGroup.add(frontPlate);

    // Rear number plate (facing backward along +X)
    const rearPlate = createNumberPlate();
    rearPlate.position.set(2.53, 0.48, 0);
    rearPlate.rotation.y = Math.PI / 2;
    carGroup.add(rearPlate);

    // 4 Precision Alloy Wheels
    const wheelPositions: [number, number, number][] = [
      [-1.42, 0.4, 0.82],
      [-1.42, 0.4, -0.82],
      [1.42, 0.4, 0.82],
      [1.42, 0.4, -0.82],
    ];

    const tireGeo = new THREE.CylinderGeometry(0.39, 0.39, 0.24, 28);
    tireGeo.rotateX(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.7,
      metalness: 0.25,
    });

    const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.26, 12);
    rimGeo.rotateX(Math.PI / 2);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.12,
    });

    const rimRingGeo = new THREE.TorusGeometry(0.28, 0.018, 8, 24);
    const rimRingMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    const wheels: THREE.Group[] = [];
    wheelPositions.forEach(([x, y, z]) => {
      const wGroup = new THREE.Group();
      wGroup.position.set(x, y, z);
      wGroup.add(new THREE.Mesh(tireGeo, tireMat));
      wGroup.add(new THREE.Mesh(rimGeo, rimMat));
      const ring = new THREE.Mesh(rimRingGeo, rimRingMat);
      ring.position.z = z > 0 ? 0.125 : -0.125;
      wGroup.add(ring);
      carGroup.add(wGroup);
      wheels.push(wGroup);
    });

    // --- 2. Chassis Laser Alignment Scanner Plane ---
    const scannerGroup = new THREE.Group();
    const scanPlaneGeo = new THREE.PlaneGeometry(2.6, 1.85);
    scanPlaneGeo.rotateY(Math.PI / 2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.y = 0.9;
    scannerGroup.add(scanPlane);

    const scanBorderGeo = new THREE.EdgesGeometry(scanPlaneGeo);
    const scanBorderMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.9,
    });
    const scanBorder = new THREE.LineSegments(scanBorderGeo, scanBorderMat);
    scanBorder.position.y = 0.9;
    scannerGroup.add(scanBorder);
    carGroup.add(scannerGroup);

    // --- 3. Calibration Turntable & Grid Floor ---
    const outerRingGeo = new THREE.TorusGeometry(3.25, 0.025, 16, 96);
    outerRingGeo.rotateX(Math.PI / 2);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.position.y = 0.02;
    studioGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(2.75, 0.012, 12, 72);
    innerRingGeo.rotateX(Math.PI / 2);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.4,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.y = 0.02;
    studioGroup.add(innerRing);

    const gridHelper = new THREE.GridHelper(18, 28, 0x1e3a5f, 0x111827);
    gridHelper.position.y = 0;
    studioGroup.add(gridHelper);

    // --- 4. Floating Metallic Paint-Mist / Spark Particles ---
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cSky = new THREE.Color(0x38bdf8);
    const cIce = new THREE.Color(0xbae6fd);
    const cGold = new THREE.Color(0xfbbf24);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 6.0;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = 0.2 + Math.random() * 3.8;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      const pick = Math.random();
      const col = pick < 0.5 ? cSky : pick < 0.82 ? cIce : cGold;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    studioGroup.add(particles);

    // Pause auto-rotate briefly while user drags, resume gently afterwards
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;
    const onControlStart = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      controls.autoRotate = false;
    };
    const onControlEnd = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 2800);
    };
    controls.addEventListener('start', onControlStart);
    controls.addEventListener('end', onControlEnd);

    // Double-click resets camera view smoothly
    const handleDblClick = () => {
      camera.position.set(4.6, 2.25, 5.4);
      controls.update();
    };
    renderer.domElement.addEventListener('dblclick', handleDblClick);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateGroupOffset(w);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      controls.update();

      carGroup.position.y = Math.sin(elapsed * 1.4) * 0.035;
      scannerGroup.position.x = Math.sin(elapsed * 1.2) * 2.45;

      wheels.forEach((w) => {
        w.rotation.z = -elapsed * 1.5;
      });

      outerRing.rotation.z = elapsed * 0.14;
      innerRing.rotation.z = -elapsed * 0.24;
      particles.rotation.y = elapsed * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      renderer.domElement.removeEventListener('dblclick', handleDblClick);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      carBodyGeo.dispose();
      carBodyMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      plateLogoTex.dispose();
      plateBackGeo.dispose();
      plateBackMat.dispose();
      plateFrameGeo.dispose();
      plateFrameMat.dispose();
      plateFaceGeo.dispose();
      plateFaceMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing select-none"
      title="Click and drag to rotate the 3D car (double-click to reset)"
    />
  );
}
