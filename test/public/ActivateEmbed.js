import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { IconButtonWithText } from './components/buttons/icon-button-text';
import { createThreeScene } from './lib/webflow/createEmbed';
const ActivateEmbed = () => {
    const [uniqueID, setUniqueID] = useState('');
    // useEffect(() => {
    //   const runInitStyles = async () => {
    //     try {
    //       await initStyles();
    //     } catch (error) {
    //       console.error('Failed to initialize styles:', error);
    //     }
    //   };
    //   runInitStyles();
    // }, []);
    return (_jsxs("div", { className: "activate-container", children: [_jsx("input", { type: "text", placeholder: "Enter Canvas ID", onChange: (e) => setUniqueID(e.target.value) }), _jsx(IconButtonWithText, { buttonText: "Activate", onClick: () => { createThreeScene(uniqueID); } })] }));
};
export default ActivateEmbed;
