import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const App = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    // const light = new THREE.PointLight(0xffffff, 1, 100);
    // light.position.set(0, 10, 10);
    // light.castShadow = true;
    // scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(0, 1, 1);
    directionalLight.intensity = 2;
    scene.add(directionalLight);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(2);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const material = new THREE.MeshLambertMaterial({ color: 0x9060bf });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const controls = new OrbitControls(camera, containerRef.current);
    controls.enableDamping = true;
    controls.rotateSpeed = 6.5;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;

    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    });

    const renderScene = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(renderScene);
    };

    renderScene();
    
  }, [width, height]);

  return (
    <main>
      <div ref={containerRef}></div>
    </main>
  );
};

export default App;
