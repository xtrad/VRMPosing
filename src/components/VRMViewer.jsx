import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM } from "@pixiv/three-vrm";

export default function VRMViewer({ modelPath }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let vrm = null;

    // Load VRM
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      async (gltf) => {
        try {
          vrm = await VRM.from(gltf);
          scene.add(vrm.scene);
        } catch (e) {
          console.error("Failed to load VRM:", e);
        }
      },
      undefined,
      (error) => {
        console.error("GLTFLoader error:", error);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (vrm) {
        // Contoh rotasi kepala sedikit (opsional)
        vrm.update(delta);
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return <div ref={mountRef} style={{ width: "100%", height: "500px" }} />;
}
