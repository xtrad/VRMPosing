import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM } from "@pixiv/three-vrm";

export default function VRMViewer({ modelUrl }) {
  const mountRef = useRef();
  const vrmRef = useRef();

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 3);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let mixer;

    const loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      // Hapus model lama
      if (vrmRef.current) {
        scene.remove(vrmRef.current.scene);
      }

      VRM.from(gltf).then((vrm) => {
        vrmRef.current = vrm;
        scene.add(vrm.scene);
      });
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Bersihkan
      if (renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      vrmRef.current = null;
    };
  }, [modelUrl]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
