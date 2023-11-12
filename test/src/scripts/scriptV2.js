let TYPE = 0, COLOR = 1, INTENSITY = 2, POSITION = 5; 

document.addEventListener("DOMContentLoaded", () => {
  // Assuming SceneConfig is an object where each property is a scene configuration
  Object.values(SceneConfig).forEach(sceneConfig => {
    const canvas = document.querySelector(`[data-purpose="threejs-canvas"][canvas-id="${sceneConfig.canvasId}"]`);
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = sceneConfig.background === 'transparent' ? null : new THREE.Color(sceneConfig.background);

    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    sceneConfig.lights.map(createLight).forEach(light => light && scene.add(light)); // Using your createLight function

    loadModel(scene, sceneConfig.modelUrl);
    camera.position.z = 5;

    const controls = new THREE.OrbitControls(camera, canvas);
    const animate = () => { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); };
    
    handleResize(canvas, camera, renderer);
    animate();
  });
});

 

function loadModel(scene, url) {
  new THREE.GLTFLoader().load(url, (gltf) => scene.add(gltf.scene));
}


function createLight(data) {
  let light;
  const color = new THREE.Color(parseInt(data[COLOR], 16)); // Convert hex string to number then to THREE.Color

  switch (data[TYPE]) {
    case 0:
      light = new THREE.AmbientLight(color, data[INTENSITY]);
      break;
    case 1:
      light = new THREE.DirectionalLight(color, data[INTENSITY]);
      break;
    case 2:
      light = new THREE.PointLight(color, data[INTENSITY]);
      break;
    case 3:
      light = new THREE.SpotLight(color, data[INTENSITY]);
      break;
    case 4:
      const color2 = new THREE.Color(parseInt(data[COLOR2], 16)); // Ensure you have COLOR2 defined and in your data
      light = new THREE.HemisphereLight(color, color2, data[INTENSITY]);
      break;
  }
  if (data[POSITION] && light) light.position.set(...data[POSITION]);
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
  











