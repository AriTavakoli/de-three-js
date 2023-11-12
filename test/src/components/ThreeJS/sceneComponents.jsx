import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls";
import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

function OrbitControls(props) {
  const { orbitControlsRef } = props;

  const {
    camera,
    gl: { domElement },
  } = useThree();

  camera.updateProjectionMatrix();

  useFrame(() => orbitControlsRef.current?.update());

  return <orbitControls ref={orbitControlsRef} args={[camera, domElement]} />;
}

function CustomStage({ children }) {
  const { gl } = useThree();

  return (
    <>
      {/* <color attach="" args={[ ]} /> */}
      {/* <hemisphereLight intensity={0.25} /> */}
      <ambientLight intensity={0.4} />

      {/* Key light - main source of illumination */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.9}
        castShadow
        shadow-mapSize-width={500}
        shadow-mapSize-height={500}
      />

      {/* Bottom light shining upwards */}
      <directionalLight
        position={[0, -10, 0]}
        intensity={0.7}
        target-position={[0, 0, 0]}
      />

      {/* Front light */}

      {/* Fill light - fills the shadows created by the key light */}
      <directionalLight position={[-5, 10, 5]} intensity={0.6} />

      {/* Rim/Back light - adds depth and highlights the contours */}
      <directionalLight position={[0, 10, -5]} intensity={0.7} />
      {children}
    </>
  );
}
function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (displayProgress < progress) {
        setDisplayProgress((prev) => Math.min(prev + 1, progress));
      }
    }, 16); // approximately 60 frames per second

    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  if (progress >= 100) return null;

  return (
    <Html center>
      {/* Container */}
      <div className="w-full h-4 bg-gray-200 rounded min-w-[200px]">
        {/* Progress */}
        <div
          className="h-full text-xs text-center text-white bg-green-500 rounded "
          style={{ width: `${displayProgress}%` }}
        >
          {/* {progress}% */}
        </div>
      </div>
    </Html>
  );
}

export { OrbitControls, CustomStage, Loader };

function ClippingPlane() {
  const { gl, scene, camera } = useThree();
  const controlsRef = useRef(null);
  const planeRef = useRef < THREE.Mesh > null;

  const { setPannable, transformMode, clippingTrigger } = useSceneConfig();

  const OFFSET_MAGNITUDE = 0.05; // Adjust this value for the desired offset

  useEffect(() => {
    if (!clippingTrigger) return;
    // Create a plane mesh for visualization
    const geometry = new THREE.PlaneGeometry(0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const planeMesh = new THREE.Mesh(geometry, material);
    scene.add(planeMesh);
    planeMesh.position.set(0, 1.6, 0);
    planeRef.current = planeMesh;

    // Create TransformControls and attach it to the planeMesh
    const controls = new TransformControls(camera, gl.domElement);
    controls.attach(planeMesh);
    controls.setMode(transformMode); // Change mode to translate
    scene.add(controls);
    controlsRef.current = controls;

    // Disable panning when interacting with TransformControls
    controls.addEventListener("start", () => {
      setPannable(false);
    });
    controls.addEventListener("dragging-changed", (event) => {
      setPannable(false);
    });
    controls.addEventListener("end", () => {
      setPannable(true);
    });

    // Listen to change event to update clipping plane
    controls.addEventListener("change", () => {
      if (!clippingTrigger) return;
      if (planeRef.current) {
        const normal = new THREE.Vector3(0, 0, 1)
          .applyQuaternion(planeRef.current.quaternion)
          .negate(); // Negate the normal direction
        const offsetDistance = normal
          .clone()
          .multiplyScalar(OFFSET_MAGNITUDE)
          .dot(normal);
        const distance =
          -planeRef.current.position.dot(normal) + offsetDistance; // Negate the distance

        const clipPlane = new THREE.Plane(normal, distance);
        gl.clippingPlanes = [clipPlane];
      }
    });

    return () => {
      scene.remove(planeMesh);
      scene.remove(controls);
      controls.dispose(); // Properly dispose of the controls
    };
  }, []);

  return null;
}
