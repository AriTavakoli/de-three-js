
import { Leva, folder, useControls, useCreateStore, } from 'leva';
import React from 'react';



const LevaConfig = ({ store }) => {

  const sizesStore = useCreateStore()
  const themeStore = useCreateStore();


  const sizes = useControls(
    {
      sizes: folder({
        position: 'top-left',
        rootWidth: '200px',
        // Range slider width
        controlWidth: '110px',
        scrubberWidth: '8px',
        scrubberHeight: '16px',
        rowHeight: '20px',
        folderHeight: '20px',
        checkboxSize: '16px',
        joystickWidth: '100px',
        joystickHeight: '100px',
        colorPickerWidth: '160px',
        colorPickerHeight: '100px',
        monitorHeight: '60px',
        titleBarHeight: '4px',
      }),
    },
    { store: sizesStore }
  )

  const theme = useControls(
    {
      theme: folder({
        accent1: '#0073e6',
        accent2: '#1EA7FD',
        elevation1: '#444444',
        elevation2: '#1E1E1E',
        elevation3: '#373737',
        highlight1: '#ff4785',

      }),
    },
    { store: themeStore }
  );



  const levaData = { paths: store.getVisiblePaths(), allPaths: store.getData() }
  const sceneConfig = createSceneConfigFromLevaData(levaData);

  // console.log(store);
  // console.log(levaData, 'levadata');
  // console.log(sceneConfig, 'sceneconfig');

  return (
    <>
      <div className="leva-container">
        <div style={{ position: 'relative', top: '0px', left: '0px', zIndex: '200', backgroundColor: '#1E1E1E', borderRadius: '2px', maxHeight: '90vh', overflowY: 'auto' }}>
          <Leva titleBar={false} fill theme={{ sizes, colors: theme }} store={store} flat />
        </div>
      </div>
    </>
  );
};

export default LevaConfig;



function createSceneConfigFromLevaData(levaData) {
  const { paths, allPaths } = levaData;

  const createLightFromPrefix = prefix => {
    const type = allPaths[`${prefix}.type`]?.value ?? 'defaultType';
    const color = allPaths[`${prefix}.color`]?.value ?? 'defaultColor';
    const intensity = allPaths[`${prefix}.intensity`]?.value ?? 'defaultIntensity';
    const position = allPaths[`${prefix}.position`]?.value ?? 'defaultPosition';
  
    // Map the string type to the appropriate numeric value
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

  const lightPrefixes = paths.filter(path => path.endsWith('.type')).map(path => path.split('.').shift());

  const lights = lightPrefixes.map(createLightFromPrefix);


  const SceneConfig = {
    "scene1": {
      "canvasId": "scene1",
      "lighting": allPaths['General.lightingSetup.lights']?.value ?? 'custom',
      "background": allPaths['General.background.type']?.value ?? 'transparent',
      "modelUrl": "your-model-url",
      lights
    }
  };

  return SceneConfig;
}

