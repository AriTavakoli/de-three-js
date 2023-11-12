import React, { useEffect, useState } from "react";
import { useThreeContext } from "@/context/ThreeContext"
import { useGLTF } from "@react-three/drei";
import { Vector3, Euler } from "three";


const Model = ({ modelRef }) => {
    const { modelPosition, setModelPosition, activeTab, modelUrl } = useThreeContext();
    const [localModelPosition, setLocalModelPosition] = useState(new Vector3(0, 0, 0));
    const [localModelRotation, setLocalModelRotation] = useState(new Euler(0, 0, 0));
    const [localModelScale, setLocalModelScale] = useState(new Vector3(1, 1, 1));
  
  
    const gltf = useGLTF(modelUrl ? modelUrl : "https://uploads-ssl.webflow.com/651a1390f46c051ae2da83ec/651df325020521fcc3c8c43c_webflow-logo.txt", false);
  
    useEffect(() => {
      if (modelRef.current) {
        setModelPosition({
          position: modelRef.current.position,
          rotation: modelRef.current.rotation,
          scale: modelRef.current.scale
        });
      }
    }, [activeTab]);
  
    return (
      <group
        ref={modelRef}
        position={modelPosition?.position || localModelPosition}
        rotation={modelPosition?.rotation || localModelRotation}
        scale={modelPosition?.scale || localModelScale}
      >
        <primitive object={gltf.scene} dispose={null} />
      </group>
    );
  };
  
  export default Model;