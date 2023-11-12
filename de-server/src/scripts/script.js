document.addEventListener("DOMContentLoaded", () => {
  Object.values(SceneConfig).forEach((sceneConfig) => {
    const canvas = document.querySelector(
      `[data-purpose="threejs-canvas"][canvas-id="${sceneConfig.canvasId}"]`
    );
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = sceneConfig.background === "transparent" ? null : new THREE.Color(sceneConfig.background);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );

    camera.position.set(
      sceneConfig.cameraConfig.position.x,
      sceneConfig.cameraConfig.position.y,
      sceneConfig.cameraConfig.position.z
    );

    camera.rotation.set(
      sceneConfig.cameraConfig.rotation.x,
      sceneConfig.cameraConfig.rotation.y,
      sceneConfig.cameraConfig.rotation.z
    );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.shadowMap.enabled = true;
    renderer.powerPreference = "high-performance";
    renderer.LinearEncoding = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(window.devicePixelRatio * 2);  // Increased pixel ratio

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    sceneConfig.lights
      .map(createLight)
      .forEach((light) => light && scene.add(light));

    loadModel(
      scene,
      sceneConfig.model.modelUrl,
      sceneConfig.model.modelPosition,
      sceneConfig.model.modelRotation,
      sceneConfig.model.modelScale
    );

    const controls = new THREE.OrbitControls(camera, canvas);
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    handleResize(canvas, camera, renderer);
    animate();
  });
});

function loadModel(scene, url, position, rotation, scale) {
  new THREE.GLTFLoader().load(url, (gltf) => {
    gltf.scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
    if (position) {
      gltf.scene.position.set(position.x, position.y, position.z);
    }
    if (rotation) {
      gltf.scene.rotation.set(rotation._x, rotation._y, rotation._z);
    }
    if (scale) {
      gltf.scene.scale.set(scale.x, scale.y, scale.z);
    }
    scene.add(gltf.scene);
  });
}

function createLight(data) {
  let light;
  const color = new THREE.Color(data[1]);

  switch (data[0]) {
    case 0:
      light = new THREE.AmbientLight(color, data[2]);
      break;
    case 1:
      light = new THREE.DirectionalLight(color, data[2]);
      break;
    case 2:
      light = new THREE.PointLight(color, data[2]);
      break;
    case 3:
      light = new THREE.SpotLight(color, data[2]);
      break;
  }

  if (data[3] && light) {
    light.position.set(data[3].x, data[3].y, data[3].z);
  }

  return light;
}

function handleResize(canvas, camera, renderer) {
  const resizeCanvas = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  };

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}
