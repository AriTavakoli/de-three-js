

function extractSceneData(levaData, assetUrl, modelRef, canvasId) {
  const { paths, allPaths } = levaData;
  const modelPosition = modelRef?.current?.position || { x: 0, y: 0, z: 0 };
  const modelRotation = modelRef?.current?.rotation || { x: 0, y: 0, z: 0 };
  const modelScale = modelRef?.current?.scale || { x: 1, y: 1, z: 1 };



  const createLightFromPrefix = prefix => {
    const type = allPaths[`${prefix}.type`]?.value ?? 'defaultType';
    const color = allPaths[`${prefix}.color`]?.value ?? 'defaultColor';
    const intensity = allPaths[`${prefix}.intensity`]?.value ?? 'defaultIntensity';
    const position = allPaths[`${prefix}.position`]?.value ?? 'defaultPosition';



    let typeValue;
    switch (type) {
      case 'ambient': typeValue = 0; break;
      case 'directional': typeValue = 1; break;
      case 'point': typeValue = 2; break;
      case 'spot': typeValue = 3; break;
      default: typeValue = 0; break;
    }

    return [typeValue, color, intensity, position];
  };

  const lightPrefixes = paths.filter(path => path.startsWith('LightSettings') && path.endsWith('.type'))
    .map(path => path.split('.').slice(0, -1).join('.'));


    ;

  const cameraPositionX = allPaths['General.cameraPosition.position.positionX'].value
  const cameraPositionY = allPaths['General.cameraPosition.position.positionY'].value
  const cameraPositionZ = allPaths['General.cameraPosition.position.positionZ'].value

  const cameraRotation_x = allPaths['General.cameraPosition.rotation.rotationX'].value
  const cameraRotation_y = allPaths['General.cameraPosition.rotation.rotationY'].value
  const cameraRotation_z = allPaths['General.cameraPosition.rotation.rotationZ'].value



  const lights = lightPrefixes.map(createLightFromPrefix);
  const lightingSetup = allPaths['General.lightingSetup.lights']?.value ?? 'custom';


  if ( lightingSetup === 'studio' ) {
    // const keyLight = createLightFromPrefix('LightSettings.key');
    // const fillLight = createLightFromPrefix('LightSettings.fill');
    // const backLight = createLightFromPrefix('LightSettings.back');

    // const specificLights = [keyLight, fillLight, backLight];
    // return specificLights;

  }

  let specificLights = lights;
  
  


  // if (lightingSetup === 'studio') {
  //   const keyLight = createLightFromPrefix('LightSettings.key');
  //   const fillLight = createLightFromPrefix('LightSettings.fill');
  //   const backLight = createLightFromPrefix('LightSettings.back');

  //   specificLights = [keyLight, fillLight, backLight];
     
  // }

  const SceneConfig = {
    "scene1": {
      "canvasId":  canvasId || "canvas",
      "lighting": lightingSetup,
      "cameraConfig": {
        "position": {
          "x": cameraPositionX,
          "y": cameraPositionY,
          "z": cameraPositionZ
        },
        "rotation": {
          "x": cameraRotation_x,
          "y": cameraRotation_y,
          "z": cameraRotation_z
        }
      },
      "background": allPaths['General.background.type']?.value === 'custom' ? allPaths['General.background.color']?.value : 'transparent',
      "model": {
        "modelUrl": assetUrl,
        "modelPosition": modelPosition,
        "modelRotation": modelRotation,
        "modelScale": modelScale,
      },
      "lights": specificLights
    }
  };

  const formattedSceneConfig = JSON.stringify(SceneConfig, null, 4);

  const config = `
  <script src="https://unpkg.com/three@0.132.0/build/three.js"></script>
  <script src="https://unpkg.com/three@0.132.0/examples/js/loaders/GLTFLoader.js"></script>
  <script src="https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
 
  <script> 
  
  const SceneConfig = ${formattedSceneConfig}; 
  
  </script>`;

  return config;
}



export { extractSceneData };