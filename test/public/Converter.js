import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useRef } from 'react';
import { Button } from './components/buttons/button';
import Icon from './components/icon/icon';
import { IconButtonWithText } from './components/buttons/icon-button-text';
import { useThreeContext } from './context/ThreeContext';
const GLTFtoTXTConverter = () => {
    const { setModelUrl, modelUrl, } = useThreeContext();
    // 
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
    return (_jsxs("div", { children: [_jsx("input", { type: "file", ref: inputRef, style: { display: 'none' }, onChange: handleFileUpload }), _jsx(IconButtonWithText, { buttonText: "Upload", iconId: "upload", iconSize: 20, iconColor: "grey", onClick: simulateClick }), _jsx(Button, { variant: "ghost", theme: "default", size: "comfortable", onClick: handleDownload, isDisabled: !gltfContent || !fileName, children: _jsx(Icon, { id: "download", size: 24, color: "white" }) })] }));
};
export default GLTFtoTXTConverter;
