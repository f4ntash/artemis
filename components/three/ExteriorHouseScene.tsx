"use client";

import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo } from "react";
import * as THREE from "three";

const MODEL_PATH = "/models/exterior_house.glb";

// ============================================================
// EXTERIOR HOUSE CAMERA CONFIG
// Ajustar encuadre, zoom y limites de orbita solamente aca.
// ============================================================
const EXTERIOR_HOUSE_CAMERA_CONFIG = {
  direction: [4.4, 1.5, 4] as [number, number, number],
  target: [0, 0, 0] as [number, number, number],
  fov: 36,
  fitPadding: 1.06,
  minDistanceFactor: 0.58,
  maxDistanceFactor: 1.8,
  azimuthRange: THREE.MathUtils.degToRad(60),
  minPolarAngle: THREE.MathUtils.degToRad(36),
  maxPolarAngle: THREE.MathUtils.degToRad(82),
};

const INITIAL_AZIMUTH = Math.atan2(
  EXTERIOR_HOUSE_CAMERA_CONFIG.direction[0],
  EXTERIOR_HOUSE_CAMERA_CONFIG.direction[2],
);

function ExteriorHouseModel() {
  const gltf = useGLTF(MODEL_PATH);
  const { scene, center, radius } = useMemo(() => {
    const clonedScene = gltf.scene.clone(true);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clonedScene);
    const modelCenter = box.getCenter(new THREE.Vector3());
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    return {
      scene: clonedScene,
      center: modelCenter,
      radius: sphere.radius,
    };
  }, [gltf.scene]);

  return (
    <>
      <CameraAndControls radius={radius} />
      <primitive object={scene} position={[-center.x, -center.y, -center.z]} />
    </>
  );
}

function CameraAndControls({ radius }: { radius: number }) {
  const { camera, size } = useThree();
  const config = EXTERIOR_HOUSE_CAMERA_CONFIG;
  const aspect = Math.max(size.width / Math.max(size.height, 1), 0.01);
  const verticalFov = THREE.MathUtils.degToRad(config.fov);
  const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
  const fitDistance = (radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2)) * config.fitPadding;

  useLayoutEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const direction = new THREE.Vector3(...config.direction).normalize();

    perspectiveCamera.fov = config.fov;
    perspectiveCamera.near = 0.01;
    perspectiveCamera.far = Math.max(100, fitDistance * 12);
    perspectiveCamera.position.copy(direction.multiplyScalar(fitDistance));
    perspectiveCamera.lookAt(...config.target);
    perspectiveCamera.updateProjectionMatrix();
  }, [camera, config, fitDistance]);

  return (
    <OrbitControls
      makeDefault
      target={config.target}
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      enableRotate
      enableZoom
      minDistance={fitDistance * config.minDistanceFactor}
      maxDistance={fitDistance * config.maxDistanceFactor}
      minAzimuthAngle={INITIAL_AZIMUTH - config.azimuthRange}
      maxAzimuthAngle={INITIAL_AZIMUTH + config.azimuthRange}
      minPolarAngle={config.minPolarAngle}
      maxPolarAngle={config.maxPolarAngle}
    />
  );
}

export default function ExteriorHouseScene() {
  return (
    <div className="exterior-house-viewer" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ fov: EXTERIOR_HOUSE_CAMERA_CONFIG.fov, near: 0.01, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={1.25} />
        <hemisphereLight args={[0xffffff, 0x8a8074, 1.2]} />
        <directionalLight position={[5, 8, 6]} intensity={2.1} />
        <directionalLight position={[-4, 3, -5]} intensity={0.65} />
        <Suspense fallback={null}>
          <ExteriorHouseModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

