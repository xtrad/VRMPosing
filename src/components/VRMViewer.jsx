import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM } from "@pixiv/three-vrm";

const VRMViewer = ({ modelUrl }) => {
  const mountRef = useRef(null);
  const [vrm, setVrm] = useState(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.4, 2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    // Load VRM
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        VRM.from(gltf).then((loadedVrm) => {
          loadedVrm.scene.rotation.y = Math.PI; // orientasi default
          scene.add(loadedVrm.scene);
          setVrm(loadedVrm);
        });
      },
      undefined,
      (error) => {
        console.error("Failed to load VRM:", error);
      }
    );

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      if (vrm) {
        vrm.update(clock.getDelta());
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      setVrm(null);
    };
  }, [modelUrl, vrm]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
};

export default VRMViewer;
