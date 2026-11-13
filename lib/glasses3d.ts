/**
 * 3D glasses for the hero. Loaded with a dynamic import so three.js never blocks the first paint.
 * Ported from the prototype (three r128). Modern three uses colour management and physical
 * light units, so we switch those off / rescale to keep the approved look.
 */
import * as THREE from 'three';

export type GlassesState = { ry: number; rx: number; x: number; tint: number };

export type GlassesHandle = { dispose: () => void };

export function initGlasses(
  canvas: HTMLCanvasElement,
  state: GlassesState,
  opts: { reduce: boolean; observe: Element },
): GlassesHandle | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  // r128 treated hex colours as linear and encoded the output to sRGB: reproduce that.
  THREE.ColorManagement.enabled = false;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const PI = Math.PI; // legacy light intensities × π = physical units
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 10);
  const group = new THREE.Group();
  scene.add(group);

  const frameMat = new THREE.MeshStandardMaterial({ color: 0x16171d, metalness: 0.55, roughness: 0.26 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xd9a24a, metalness: 1, roughness: 0.22 });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfe0ff, metalness: 0, roughness: 0.05, transparent: true, opacity: 0.18,
    clearcoat: 1, clearcoatRoughness: 0.05, side: THREE.DoubleSide, depthWrite: false,
  });
  const clear = new THREE.Color(0xcfe0ff);
  const amber = new THREE.Color(0xe8a23e);

  function rr(p: THREE.Shape | THREE.Path, x: number, y: number, w: number, h: number, r: number) {
    p.moveTo(x + r, y);
    p.lineTo(x + w - r, y);
    p.quadraticCurveTo(x + w, y, x + w, y + r);
    p.lineTo(x + w, y + h - r);
    p.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    p.lineTo(x + r, y + h);
    p.quadraticCurveTo(x, y + h, x, y + h - r);
    p.lineTo(x, y + r);
    p.quadraticCurveTo(x, y, x + r, y);
  }
  const W = 1.95, H = 1.55, R = 0.62, T = 0.15;
  const rimShape = new THREE.Shape();
  rr(rimShape, -W / 2, -H / 2, W, H, R);
  const hole = new THREE.Path();
  rr(hole, -W / 2 + T, -H / 2 + T, W - 2 * T, H - 2 * T, R - T);
  rimShape.holes.push(hole);
  const rimGeo = new THREE.ExtrudeGeometry(rimShape, {
    depth: 0.16, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 3, curveSegments: 28,
  });
  rimGeo.center();
  const lensShape = new THREE.Shape();
  rr(lensShape, -W / 2 + T, -H / 2 + T, W - 2 * T, H - 2 * T, R - T);
  const lensGeo = new THREE.ShapeGeometry(lensShape, 28);
  const dotGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.05, 16);

  [-1.12, 1.12].forEach((x) => {
    const rim = new THREE.Mesh(rimGeo, frameMat);
    rim.position.x = x;
    group.add(rim);
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(x, 0, 0.01);
    group.add(lens);
    const dot = new THREE.Mesh(dotGeo, goldMat);
    dot.rotation.x = Math.PI / 2;
    dot.position.set(x + (x > 0 ? 0.78 : -0.78), 0.5, 0.14);
    group.add(dot);
  });
  const bridgeCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.17, 0.32, 0), new THREE.Vector3(0, 0.56, 0.03), new THREE.Vector3(0.17, 0.32, 0),
  );
  group.add(new THREE.Mesh(new THREE.TubeGeometry(bridgeCurve, 24, 0.06, 12, false), goldMat));
  [-1, 1].forEach((side) => {
    const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.24), goldMat);
    hinge.position.set(side * 2.1, 0.36, -0.04);
    group.add(hinge);
    const temple = new THREE.Group();
    temple.position.set(side * 2.14, 0.36, -0.12);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.11, 2.7), frameMat);
    arm.position.z = -1.35;
    temple.add(arm);
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.11, 0.7), frameMat);
    tip.position.set(0, -0.2, -2.95);
    tip.rotation.x = 0.55;
    temple.add(tip);
    temple.rotation.y = side * 0.06;
    group.add(temple);
  });

  scene.add(new THREE.AmbientLight(0xffffff, 0.38 * PI));
  const key = new THREE.DirectionalLight(0xffffff, 1.15 * PI);
  key.position.set(4, 5, 6);
  scene.add(key);
  // decay 0 ≈ r128's linear falloff inside the cut-off distance
  const warm = new THREE.PointLight(0xf5b65a, 1.5 * PI, 24, 0);
  warm.position.set(-4, -1.5, 4);
  scene.add(warm);
  const cool = new THREE.PointLight(0x8fa2ff, 1.1 * PI, 24, 0);
  cool.position.set(3, 2.5, -4);
  scene.add(cool);
  const top = new THREE.PointLight(0xffffff, 0.6 * PI, 20, 0);
  top.position.set(0, 4, 2);
  scene.add(top);

  let mobile = false;
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    mobile = w < 760;
    group.scale.setScalar(mobile ? 0.62 : 0.95);
  }

  const reduce = opts.reduce;
  const t0 = performance.now();
  function frame(now: number) {
    const t = (now - t0) / 1000;
    group.rotation.y = state.ry + (reduce ? 0 : Math.sin(t * 0.7) * 0.05);
    group.rotation.x = state.rx + (reduce ? 0 : Math.sin(t * 0.5) * 0.02);
    group.position.x = mobile ? 0 : state.x * 1.9;
    group.position.y = mobile ? 1.15 : 0.1;
    lensMat.color.copy(clear).lerp(amber, state.tint);
    lensMat.opacity = 0.16 + 0.36 * state.tint;
    renderer.render(scene, camera);
  }

  const onResize = () => {
    resize();
    if (reduce) frame(performance.now());
  };
  window.addEventListener('resize', onResize);
  resize();

  // Pause rendering when the hero is off screen.
  let visible = true;
  let raf = 0;
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0 })
    : null;
  io?.observe(opts.observe);
  function loop(now: number) {
    if (visible) frame(now);
    raf = requestAnimationFrame(loop);
  }
  if (reduce) frame(performance.now());
  else raf = requestAnimationFrame(loop);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener('resize', onResize);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      [frameMat, goldMat, lensMat].forEach((m) => m.dispose());
      renderer.dispose();
    },
  };
}
