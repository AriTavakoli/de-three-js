import React, { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useControls, useStoreContext, useCreateStore, LevaPanel, LevaStoreProvider } from 'leva'
import { Leva } from "leva";
import { useThreeContext } from "../../../context/ThreeContext";
import { button } from 'leva'
import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper, SpotLightHelper } from 'three';


const SceneOutputManager = ({ store }) => {
    const { lights, setLights, currentMessage } = useThreeContext();


    const controls = useControls({
        lightingSetup: { options: ['custom', 'studio', 'backlight'] },
    }, { store });


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

    const LightingSetupComponent = LIGHTING_SETUP_COMPONENTS[controls.lightingSetup];


    return (
        <>
            {/* {lights.map(light => <Light key={light.id} {...light} store={store} />)} */}
            {LightingSetupComponent && <LightingSetupComponent store={store} />}

        </>
    );
};

export default SceneOutputManager;



const CustomLightSetup = ({ store }) => {
    const { lights } = useThreeContext();

    return (
        <>
            {lights.map(light => <Light key={light.id} {...light} store={store} />)}
        </>
    );
}


const StudioLightSetup = ({ store }) => {

    const id = ''

    const { key, fill, back } = useControls({
        key: { value: 1, min: 0, max: 3 },
        fill: { value: 0.7, min: 0, max: 3 },
        back: { value: 0.5, min: 0, max: 3 }
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
    const { setCurrentMessage } = useThreeContext();

    const { color, intensity, type, remove, position } = useControls(id, {
        color: { value: initialColor || '#ffffff' },
        intensity: { value: initialIntensity || 1, min: 0, max: 2 },
        type: { value: initialType || 'ambient', options: ['ambient', 'directional', 'point', 'spot'] },
        position: {
            value: initialPosition || { x: 0, y: 0, z: 0 },
            x: { min: -10, max: 10, step: 0.1 },
            y: { min: -10, max: 10, step: 0.1 },
            z: { min: -10, max: 10, step: 0.1 }
        },
        remove: button(() => setCurrentMessage({ type: 'REMOVE_LIGHT', payload: { id } })),
    }, { store });

    const lightPosition = [position.x, position.y, position.z];

    switch (type) {
        case 'ambient':
            return <ambientLight color={color} intensity={intensity}  />;
        case 'directional':
            return <directionalLight color={color} intensity={intensity} position={lightPosition} />;
        case 'point':
            return <pointLight color={color} intensity={intensity} position={lightPosition} />;
        case 'spot':
            return <spotLight color={color} intensity={intensity} position={lightPosition} angle={0.1} />;
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
