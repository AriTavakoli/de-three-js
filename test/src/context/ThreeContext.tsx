 

import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
  ReactNode,
  useRef,
} from "react";

import { useCreateStore } from 'leva';


interface LightingConfig {
  lighting: string;
  keyLightIntensity: number;
  fillLightIntensity: number;
  rimLightIntensity: number;
}

interface ThreeContextProps {
  modelUrl: string | null;
  setModelUrl: (url: string | null) => void;
  lightingConfig: LightingConfig;
  setLightingConfig(config: LightingConfig);
  activeTab: number;
  setActiveTab: (value: number) => void;
  assetUrl: string | null;
  setAssetUrl: (value: string | null) => void;
  devMode: boolean;
  setDevMode: (value: boolean) => void;
  modelPosition: number[];
  setModelPosition: (value: number[]) => void;
  siteInfo: any;
  setSiteInfo: (value: any) => void;
  modelRef: any;
  siteScriptTrigger: boolean;
  setSiteScriptTrigger: (value: boolean) => void;
  siteRegisterTrigger: boolean;
  setSiteRegisterTrigger: (value: boolean) => void;
  setLights: (value: any) => void;
  addLight: () => void;
  levaStore: any;
  currentMessage: string | null;
  setCurrentMessage: (value: string | null) => void;
  removeLight: (id: string) => void;
  lights: any;
  canvasId: string;
  setCanvasId: (value: string) => void;
  handleDevMode: () => void;
 



}

interface ThreeProviderProps {
  children: ReactNode;
}

 

 

const ThreeContext = createContext<ThreeContextProps | undefined>(undefined);

export function ThreeProvider({ children }: ThreeProviderProps) {


  const modelRef = useRef();
// 

  const [canvasId, setCanvasId] = useState<string>('scene1');

  const [modelPosition, setModelPosition] = useState( );

  const [modelUrl, setModelUrl] = useState<string | null>(null);

  const [siteInfo, setSiteInfo] = useState<any>(null);

  const [lightingConfig, setLightingConfig] = useState<LightingConfig>({
    lighting: 'custom',
    keyLightIntensity: 1,
    fillLightIntensity: 1,
    rimLightIntensity: 1
  });
  const [assetUrl, setAssetUrl] = useState<string | null>("https://uploads-ssl.webflow.com/651a1390f46c051ae2da83ec/651df325020521fcc3c8c43c_webflow-logo.txt");

  const [activeTab, setActiveTab] = useState<number>(0);

  const [lights, setLights] = useState([]);

  const [devMode, setDevMode] = useState<boolean>(false);

  const [siteScriptTrigger, setSiteScriptTrigger] = useState<boolean>(false);

  const [siteRegisterTrigger, setSiteRegisterTrigger] = useState<boolean>(false);

  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  const levaStore = useCreateStore();

  const [infiniteGridConfig, setInfiniteGridConfig] = useState(true);

  const [gizmo , setGizmo] = useState(true);

  const [currentLight, setCurrentLight] = useState(null);



  const handleDevMode = () => {
    setDevMode((prev) => !prev);
  };



  const addLight = () => {
    setLights([
      ...lights,
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'ambient',
        color: '#ffffff',
        target: 'model',
        intensity: 1,
        position: [0, 0, 0],
      },
    ]);
  };

  const removeLight = (id) => {
    const updatedLights = lights.filter((light) => light.id !== id);
    console.log(updatedLights, 'updatedLights');
    setLights(updatedLights);
  };

  const ctx: ThreeContextProps = {
    modelUrl,
    setModelUrl,
    activeTab,
    setActiveTab,
    lightingConfig,
    setLightingConfig,
    assetUrl,
    setAssetUrl,
    setDevMode,
    devMode,
    modelPosition,
    setModelPosition,
    siteInfo,
    canvasId,
    setCanvasId,
    setSiteInfo,
    currentLight,
    handleDevMode,
    setCurrentLight,
    modelRef,
    siteScriptTrigger,
    setSiteScriptTrigger,
    siteRegisterTrigger,
    setSiteRegisterTrigger,
    setLights,
    addLight,
    levaStore,
    currentMessage,
    setCurrentMessage,
    removeLight,
    lights,

  };

  return <ThreeContext.Provider value={ctx}>{children}</ThreeContext.Provider>;
}

export function useThreeContext(): ThreeContextProps {
  const context = useContext(ThreeContext);
  if (!context) {
    throw new Error('useThreeContext must be used within a ThreeProvider');
  }
  return context;
}

 