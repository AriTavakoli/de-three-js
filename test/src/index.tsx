import { OrbitControls } from '@react-three/drei';
import { TransformControls } from '@react-three/drei/core';
import { Canvas } from "@react-three/fiber";
import { LevaStoreProvider, button, folder, useControls, useCreateStore } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import SceneOutputManager from './components/ThreeJS/Editor/Editor';
import LevaConfig from './components/ThreeJS/LevaConfig';
import { SceneConfigButton } from './components/buttons/scene-config-button';
import ExportConfig from './components/export-config';
import LoadingComponent from './components/loader/loader';
import Model from './components/model/model';
import MultiStep from './components/multi-step/multi-step-index';
import SiteInfo from './components/site/site-info';
import { TabContent, Tabs } from './components/tabs/tabs';
import { ThreeProvider, useThreeContext } from './context/ThreeContext';
import './styles/styles.css';
import { Button } from './components/buttons/button';


const App = () => {

  const {
    devMode,
    modelRef,
    addLight,
    activeTab,
    setDevMode,
    handleDevMode,
    lightingConfig,
  } = useThreeContext();

  const store = useCreateStore();

  const cameraControlsRef = useRef();

  const [cameraPosTrigger, setCameraPosTrigger] = useState(false);


  const controls = useControls(
    {
      General: folder({
        lightingSetup: folder({ lights: { value: "studio", options: ['custom', 'studio', 'backlight'] } }, { collapsed: true }),
        background: folder({
          "type": { options: ['transparent', 'custom'] },
          color: {
            value: '#292d39',
            render: (get) => get('General.background.type') === 'custom',
          },
        }, { collapsed: true }),

        mode: { options: ['translate', 'rotate', 'scale'] },
        cameraPosition: folder(
          {
            rotation: folder({
              rotationX: { value: 0, min: -10, max: 10, step: 0.1 },
              rotationY: { value: 0, min: -10, max: 10, step: 0.1 },
              rotationZ: { value: 0, min: -10, max: 10, step: 0.1 },
            }, { collapsed: true }),

            scale: folder({
              scaleX: { value: 1, min: -10, max: 10, step: 0.1 },
              scaleY: { value: 1, min: -10, max: 10, step: 0.1 },
              scaleZ: { value: 1, min: -10, max: 10, step: 0.1 },
            }, { collapsed: true }),



            position: folder({
              positionX: { value: 0, min: -10, max: 10, step: 0.1 },
              positionY: { value: 0, min: -10, max: 10, step: 0.1 },
              positionZ: { value: 0, min: -10, max: 10, step: 0.1 },
            }, { collapsed: true }),


            'Apply Position': button((get) => {
              // const x = get('General.setPosition.positionX');
              // const y = get('General.setPosition.positionY');
              // const z = get('General.setPosition.positionZ');

              setCameraPosTrigger((prevTrigger) => !prevTrigger);
              // cameraControlsRef.current?.setPosition(x, y, z, true);
            }),
            'Reset Position': button((get) => {
              const x = get('General.setPosition.positionX');
              const y = get('General.setPosition.positionY');
              const z = get('General.setPosition.positionZ');
              if (cameraControlsRef.current?.object?.position) {
                cameraControlsRef.current.object.position.x = x;
                cameraControlsRef.current.object.position.y = y;
                cameraControlsRef.current.object.position.z = z;
              }
            }
            ),
          },
          { collapsed: false }
        ),

        // cameraPosition: folder({
        //   positionX: { value: 0, min: -10, max: 10, step: 0.1 },
        //   positionY: { value: 0, min: -10, max: 10, step: 0.1 },
        //   positionZ: { value: 5, min: -10, max: 10, step: 0.1 },
        // }, { collapsed: true }),

        Model: folder({
          position: folder({
            positionX: { value: 0, min: -10, max: 10, step: 0.1 },
            positionY: { value: 0, min: -10, max: 10, step: 0.1 },
            positionZ: { value: 0, min: -10, max: 10, step: 0.1 },
          }, { collapsed: true }),


          rotation: folder({
            rotationX: { value: 0, min: -10, max: 10, step: 0.1 },
            rotationY: { value: 0, min: -10, max: 10, step: 0.1 },
            rotationZ: { value: 0, min: -10, max: 10, step: 0.1 },
          }, { collapsed: true }),

          scale: folder({
            scaleX: { value: 1, min: -10, max: 10, step: 0.1 },
            scaleY: { value: 1, min: -10, max: 10, step: 0.1 },
            scaleZ: { value: 1, min: -10, max: 10, step: 0.1 },
          }, { collapsed: true }),

        }, { collapsed: true }),




        camera: folder({
          positionX: { value: 0, min: -10, max: 10, step: 0.1 },
          positionY: { value: 0, min: -10, max: 10, step: 0.1 },
          positionZ: { value: 5, min: -10, max: 10, step: 0.1 },
        }, { collapsed: true }),

        // emission: { value: 0.5, min: 0, max: 1, step: 0.01 },
        // sampling: { value: 0.5, min: 0, max: 1, step: 0.01 },
        // intensity: { value: 0.5, min: 0, max: 1, step: 0.01 },
        // exposure: { value: 0.5, min: 0, max: 1, step: 0.01 },


      }),

    },
    { store }
  );


  useEffect(() => {
    if (cameraControlsRef && cameraControlsRef.current) {
      const { x, y, z } = cameraControlsRef.current.object.position;

      const rotation = cameraControlsRef.current.object.rotation;

      console.log(x, y, z);
      store.setValueAtPath('General.cameraPosition.position.positionX', x, true);
      store.setValueAtPath('General.cameraPosition.position.positionY', y, true);
      store.setValueAtPath('General.cameraPosition.position.positionZ', z, true);


      store.setValueAtPath('General.cameraPosition.rotation.rotationX', rotation._x, true);
      store.setValueAtPath('General.cameraPosition.rotation.rotationY', rotation._y, true);
      store.setValueAtPath('General.cameraPosition.rotation.rotationZ', rotation._z, true);
    }
  }, [cameraControlsRef, activeTab, cameraPosTrigger]);


  return (
    <>
      <div className="three-container">

        {/* Extract state to handle Custom Scripts */}
        <SiteInfo />

        <Tabs>

          {/* Multi step embed  */}

          <TabContent aria-label="Embed" label="Embed Canvas">
            <main className="tab-content-1">
              <MultiStep></MultiStep>
            </main>
          </TabContent>


          {/* Scene Configuration */}

          <TabContent label="Configure Scene" aria-label="Embed">
            <main className="scene-container">

              <LevaConfig store={store} />

              <div className="canvas-button-container">
                <div className="upload-container">
                  <SceneConfigButton onClick={handleDevMode} buttonText="Performance" iconId="performance" iconSize={16}  />
                  <SceneConfigButton buttonText="Add Light" iconId="light" iconSize={14} onClick={addLight} />
                </div>
                <Suspense fallback={<LoadingComponent />}>
                  <Canvas
                    alpha={true}
                    style={{ background: controls.type === 'custom' ? controls.color : '#f5f7fa', width: '100%', borderRadius: '2px', height: '600px' }}
                    camera={{ position: [0, 0, 5] }}
                  >
                    {devMode && <Perf position="bottom-right" />}
                    <OrbitControls makeDefault ref={cameraControlsRef} />
                    <LevaStoreProvider store={store}>
                      <SceneOutputManager store={store} controls={controls} />
                    </LevaStoreProvider>


                    <TransformControls object={modelRef} mode={controls.mode}>
                      <Model modelRef={modelRef} controls={controls} />
                    </TransformControls>

                  </Canvas>
                </Suspense>
              </div>

            </main>
          </TabContent>


          {/* Generate Scene Config  */}

          <TabContent label="Generate Config">
            <ExportConfig config={lightingConfig} store={store} />
          </TabContent>
        </Tabs>



        {/* <LightingControl lightingConfig={lightingConfig} setLightingConfig={setLightingConfig} /> */}



      </div>
    </>
  );
};

ReactDOM.render(
  <ThreeProvider>
    <App />
  </ThreeProvider>, document.getElementById('root'));

