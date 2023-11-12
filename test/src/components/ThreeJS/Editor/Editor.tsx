//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useControls, useStoreContext, useCreateStore, LevaPanel, LevaStoreProvider, folder } from 'leva'
import { Leva } from "leva";
import { useThreeContext } from "../../../context/ThreeContext";
import { button } from 'leva'
import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper, Color } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";

const SceneOutputManager = ({ store, controls }) => {
    const { lights, setLights, currentMessage, currentLight, setCurrentLight } = useThreeContext();

    const { scene } = useThree();

    const LIGHTING_SETUP_COMPONENTS = {
        custom: CustomLightSetup,
        studio: StudioLightSetup,
        // backlight: BackLightSetup,
    };


    const factory = (message) => {
    console.log(message, 'message');
        switch (message.type) {
            case 'ADD_LIGHT':
                const id = `light_${lights.length + 1}`;
                setLights(prevLights => [
                    ...prevLights,
                    { id, color: '#ffffff', intensity: 1 }
                ]);
                break;
            case 'REMOVE_LIGHT':
                console.log('removing light: ', message.payload.id);
                setLights(prevLights => prevLights.filter(light => light.id !== message.payload.id));
                break;
            default:
                console.log('Unknown message type:', message.type);
        }
    };
    // watch for new messages and call the factory
    useEffect(() => {
        if (currentMessage) {
            factory(currentMessage);
        }
    }, [currentMessage]);

    const handleObjectChange = (e) => {
        if (!e?.target) return;

        const lightObject = scene.getObjectByName(currentLight);
        if (!lightObject) return;

        const updatedPosition = lightObject.position;
        const path = `LightSettings.${currentLight}.position`;

        store.setValueAtPath(path,   {
            x: updatedPosition.x,
            y: updatedPosition.y,
            z: updatedPosition.z,
        }, true);
    };

    const LightingSetupComponent = LIGHTING_SETUP_COMPONENTS[controls.lights];
    const storeKey = `LightSettings.${currentLight}.position`;

    console.log(currentLight, 'currentLight');


    return (
        <>
            {currentLight && <TransformControls
                object={scene.getObjectByName(currentLight)}
                onObjectChange={handleObjectChange}
            />

            }
            {/* {lights.map(light => <Light key={light.id} {...light} store={store} />)} */}
            {LightingSetupComponent && <LightingSetupComponent store={store} />}

        </>
    );
};

export default SceneOutputManager;



const CustomLightSetup = ({ store }) => {
    const { lights } = useThreeContext();
    useEffect(() => {
        console.log(lights, 'lights');
    }, [lights]);

    return (
        <>
            {lights.map(light => <Light key={light.id} {...light} store={store} />)}
        </>
    );
}


const StudioLightSetup = ({ store }) => {

    const { key, fill, back } = useControls({
        Lighting: folder({
            key: { value: 1, min: 0, max: 3 },
            fill: { value: 0.7, min: 0, max: 3 },
            back: { value: 0.5, min: 0, max: 3 }
        })
    }, { store });


    return (
        <>
            {/* Key Light */}
            <directionalLight
                position={[2, 2, 5]}
                intensity={key}
            />

            {/* Fill Light */}
            <directionalLight
                position={[-2, 2, 5]}
                intensity={fill}
            />

            {/* Back Light */}
            <directionalLight
                position={[0, -2, -5]}
                intensity={back}
            />
        </>
    );
}



const Light = ({ id, initialColor, initialIntensity, initialType, initialPosition, store }) => {
    const { setCurrentMessage, currentLight, setCurrentLight } = useThreeContext();

    const { scene } = useThree();


    const controls = {
        LightSettings: folder({
            [id]: folder({
                type: { value: initialType || 'directional', options: ['ambient', 'directional', 'point', 'spot'] },
                color: { value: initialColor || '#ffffff' },
                intensity: { value: initialIntensity || 1, min: 0, max: 10 },
                position: {
                    value: initialPosition || { x: 0, y: 2, z: 0 },
                    x: { min: -10, max: 10, step: 0.1 },
                    y: { min: -10, max: 10, step: 0.1 },
                    z: { min: -10, max: 10, step: 0.1 }
                },
                Edit: button(() => setCurrentLight(id)),
                Delete: button(() => {
                    setCurrentMessage({ type: 'REMOVE_LIGHT', payload: { id } })
                    setCurrentLight(null);
                })
            }, { collapsed: true })
        })
    };

    const { color, intensity, type, remove, position } = useControls(controls, { store, });
    const lightPosition = [position?.x || 0, position?.y || 0, position?.z || 0];


    const lightRef = useRef();

    useEffect(() => {
        let helper;
        if (lightRef.current) {
            switch (type) {

                case 'directional':
                    helper = new DirectionalLightHelper(lightRef.current, 1, new Color('#2496ff'));
                    break;
                case 'point':
                    helper = new PointLightHelper(lightRef.current, 1,
                        new Color('#2496ff'));
                    break;
                case 'spot':
                    helper = new SpotLightHelper(lightRef.current, new Color('#2496ff'));
                    break;
                default:
                    break;
            }

            if (helper) {
                lightRef.current.helper = helper;
                scene.add(helper);
            }
        }

        return () => {
            if (helper) {
                helper.dispose();
                scene.remove(helper);
            }

        };
    }, [type, scene]);

    useFrame(() => {
        if (lightRef.current?.helper) {
            lightRef.current.helper.update();
        }
    });


    switch (type) {
        case 'ambient':
            return <ambientLight ref={lightRef} color={color} intensity={intensity} name={id} onClick={() => { setCurrentLight(id) }} />;
        case 'directional':
            return <directionalLight ref={lightRef} color={color} intensity={intensity} position={lightPosition} name={id} onClick={() => { setCurrentLight(id) }} />;
        case 'point':
            return <pointLight ref={lightRef} color={color} intensity={intensity} position={lightPosition} name={id} onClick={() => { setCurrentLight(id) }} />;
        case 'spot':
            return <spotLight ref={lightRef} color={color} intensity={intensity} position={lightPosition} angle={0.1} name={id} onClick={() => { setCurrentLight(id) }} />;
        default:
            console.warn(`Unsupported light type: ${type}`);
            return null;
    }
};


const SceneConfig = {
    "scene1": {
        "canvasId": "scene1",
        "lighting": "custom",
        "background": "transparent",
        "modelUrl": "https://uploads-ssl.webflow.com/65137959d71c4c7e79fb350b/651621db463a304f3e09e873_boxTexture.txt",
        "lights": [
            [
                0,
                "0xffffff",
                1
            ]
        ]
    }

}
