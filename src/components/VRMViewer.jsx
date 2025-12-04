import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VRM, VRMUtils } from "@pixiv/three-vrm";

export default function VRMViewer({ modelUrl }) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const vrmRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    const width = mountRef.current.offsetWidth || 800;
    const height = mountRef.current.offsetHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 3);
    camera.lookAt(new THREE.Vector3(0, 1, 0));
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // Render loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      if (vrmRef.current) {
        scene.remove(vrmRef.current.scene);
        vrmRef.current = null;
      }
      renderer.dispose();
      renderer.domElement && mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // Load / switch VRM
  useEffect(() => {
    if (!sceneRef.current) return;

    setLoading(true);

    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";

    loader.load(
      modelUrl,
      (gltf) => {
        VRM.from(gltf).then((vrm) => {
          if (vrmRef.current) {
            sceneRef.current.remove(vrmRef.current.scene);
            vrmRef.current = null;
          }

          vrmRef.current = vrm;

          // Optional cleanup
          VRMUtils.removeUnnecessaryJoints(vrm.scene);

          // Scale & rotation supaya muncul di scene
          vrm.scene.scale.set(1, 1, 1);
          vrm.scene.position.set(0, 0, 0);
          vrm.scene.rotation.y = Math.PI;

          sceneRef.current.add(vrm.scene);
          setLoading(false);
        });
      },
      undefined,
      (err) => {
        console.error("Failed to load VRM:", err);
        setLoading(false);
      }
    );
  }, [modelUrl]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }} ref={mountRef}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px 20px",
            borderRadius: "8px",
            zIndex: 10,
          }}
        >
          Loading model...
        </div>
      )}
    </div>
  );
}
