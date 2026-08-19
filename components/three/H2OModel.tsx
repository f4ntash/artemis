"use client";

import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { Group, Object3D } from "three";
import { H2O_VARIANT_GROUPS, type H2OVariantState } from "./h2oVariants";

const MODEL_PATH = "/models/preview_house.glb";
const MODEL_ROTATION: [number, number, number] = [0, Math.PI, 0];

type H2OModelProps = {
  onReady: () => void;
  onModelReady: (object: Object3D) => void;
  variants: H2OVariantState;
};

export default function H2OModel({ onReady, onModelReady, variants }: H2OModelProps) {
  const groupRef = useRef<Group>(null);
  const initializedRef = useRef(false);
  const invalidate = useThree((state) => state.invalidate);
  const gltf = useGLTF(MODEL_PATH);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group || initializedRef.current) return;

    initializedRef.current = true;
    onModelReady(group);
    onReady();
  }, [onModelReady, onReady]);

  useEffect(() => {
    const variantObjectNames = new Set(
      H2O_VARIANT_GROUPS.flatMap((group) => group.variants.map((variant) => variant.objectName)),
    );

    scene.traverse((object) => {
      if (!variantObjectNames.has(object.name)) return;
      object.visible = H2O_VARIANT_GROUPS.some((group) => {
        const activeVariant = group.variants.find((variant) => variant.id === variants[group.id]);
        return activeVariant?.objectName === object.name;
      });
    });
    invalidate();
  }, [invalidate, scene, variants]);

  return (
    <group ref={groupRef} rotation={MODEL_ROTATION}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
