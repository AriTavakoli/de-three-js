// ThreeSceneComponent.js
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

const UploadedComponent = ({ model }) => {
  useEffect(() => {
    // Here, you'd typically add the model to your Three.js scene.
    // This depends on how your scene is set up.
    // Example: scene.add(model.scene);
  }, [model]);

  return (
    <Canvas>
      {/* Add your other Three.js objects here */}
    </Canvas>
  );
};

export default UploadedComponent;


const Model = ({ url }) => {
    const gltf = useGLTF(url, false);
    return <primitive object={gltf.scene} dispose={null} />;
  };