import { useCallback, useRef, useState } from 'react';
import { useThreeContext } from '../../../../context/ThreeContext';
import { IconButtonWithText } from '../../../buttons/icon-button-text';
import { Icon } from '@/components/icon/icon-index';
import { SceneConfigButton } from '@/components/buttons/scene-config-button';

export default function Merge() {

    const {
        setModelUrl,
        modelUrl,
    } = useThreeContext();

    const [gltfContent, setGltfContent] = useState(null);
    const [fileName, setFileName] = useState('');
    const inputRef = useRef(null);

    const handleFileUpload = useCallback((event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setGltfContent(reader.result);
                setFileName(file.name.split('.').slice(0, -1).join('.'));
                setModelUrl(reader.result);
            };
        }
    }, [setModelUrl]);

    const handleDownload = () => {
        if (gltfContent && fileName) {
            const blob = new Blob([atob(gltfContent.split(',')[1])], { type: 'text/plain;charset=utf-8' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = `${fileName}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const simulateClick = () => {
        inputRef.current.click();
    };

    return (

        <div className="select-container">
            <input type="file" ref={inputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
            <p className="select-text">Upload your GLTF file</p>
            <div className="merge-container">
                <IconButtonWithText
                    buttonText="Upload"
                    iconId="upload"
                    onClick={simulateClick}
                />
                <Icon name = "merge" ></Icon>
                <IconButtonWithText
                    buttonText="Download"
                    iconId="download"
                    onClick={handleDownload}
                />

            </div>
            <p className="select-text">Download .TXT and drag to asset-manager</p>

        </div>
    )
}