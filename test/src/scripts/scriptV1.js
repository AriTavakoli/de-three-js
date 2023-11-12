document.addEventListener("DOMContentLoaded", () => {
    // Loop over each model in the configuration
    SceneConfig.modelConfig.forEach(({ canvasID, url }) => {
      const canvas = document.querySelector(
        `[data-purpose="threejs-canvas"][canvas-id="${canvasID}"]`
      );
      if (!canvas) return;
      canvas.setAttribute("canvas-id", canvasID.toString());
  
      // Set up scene with specified background
      const scene = new THREE.Scene();
      scene.background =
        SceneConfig.background === "transparent"
          ? null
          : new THREE.Color(SceneConfig.background);
  
      // Set up camera with aspect ratio derived from canvas dimensions
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      // Renderer with transparency and anti-aliasing
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      configureLighting(scene);
      loadModel(scene, url);
      camera.position.z = 5;
  
      const controls = new THREE.OrbitControls(camera, canvas);
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      handleResize(canvas, camera, renderer);
      animate();
    });
  });
  
  // Configurable lighting setup based on SceneConfig
  function configureLighting(scene) {
    let ambientLight, directionalLight, keyLight, bottomLight, fillLight, rimLight;
  
    switch (SceneConfig.lighting) {
      case "studio":
        ambientLight = new THREE.AmbientLight(0x404040);
        directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(directionalLight);
        break;
  
        case "custom":
          // Ambient light with moderate intensity
          ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
          scene.add(ambientLight);
    
          // Key light - main source of illumination
          console.log(SceneConfig.lightingConfig);
          console.log(SceneConfig);
          keyLight = new THREE.DirectionalLight(0xffffff, SceneConfig.lightingConfig.keyLightIntensity || 0.9);
          keyLight.position.set(5, 10, 5);
          keyLight.castShadow = true;
          keyLight.shadow.mapSize.width = 500;
          keyLight.shadow.mapSize.height = 500;
          scene.add(keyLight);
    
    
    
          // Fill light - fills the shadows created by the key light
          fillLight = new THREE.DirectionalLight(0xffffff, SceneConfig.lightingConfig.fillLightIntensity || 0.6);
          fillLight.position.set(-5, 10, 5);
          scene.add(fillLight);
    
          // Rim/Back light - adds depth and highlights the contours
          rimLight = new THREE.DirectionalLight(0xffffff, SceneConfig.lightingConfig.rimLightIntensity || 0.7);
          rimLight.position.set(0, 10, -5);
          scene.add(rimLight);
          break;
    
        default:
          ambientLight = new THREE.AmbientLight(0x404040);
          scene.add(ambientLight);
      }
   
  
    }
  // Function to load and add a 3D model to the scene
  function loadModel(scene, url) {
    const loader = new THREE.GLTFLoader();
    loader.load(
      url,
      (gltf) => scene.add(gltf.scene),
      undefined,
      (error) => console.error(error)
    );
  }
  // Handle window resize events to update camera and renderer settings
  function handleResize(canvas, camera, renderer) {
    const resizeCanvas = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  }
  