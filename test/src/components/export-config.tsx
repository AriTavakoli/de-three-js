
import { useEffect, useRef, useState } from 'react';
import { useThreeContext } from '../context/ThreeContext';
import { extractSceneData } from '../lib/webflow/extractSceneData';
import { IconButtonWithText } from './buttons/icon-button-text';


const ExportConfig = ({ config, store }) => {
  const codeRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const { setSiteScriptTrigger, setSiteRegisterTrigger, modelRef, canvasId } = useThreeContext();

  const { assetUrl } = useThreeContext();

  useEffect(() => {
    if (window.hljs && codeRef.current) {
      window.hljs.highlightBlock(codeRef.current);
    }
}, [config]);

  const handleCopyClick = () => {
    const range = document.createRange();
    range.selectNode(codeRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    setIsCopied(true);
  };


  const levaData = { paths: store.getVisiblePaths(), allPaths: store.getData() }
  const sceneConfig = extractSceneData(levaData, assetUrl, modelRef, canvasId);
  return (
    <div>

      <div className="code-container">
        <div className="code-button__container">
          {isCopied && <span style={{ color: 'green' }}>Copied!</span>}
          <IconButtonWithText buttonText="Copy Code" iconId="code" iconSize={16} onClick={handleCopyClick} />
          <IconButtonWithText buttonText="Add Script" iconId="code" iconSize={16} onClick={() => { setSiteScriptTrigger(true) }} />
          <IconButtonWithText buttonText="Register Script" iconId="code" iconSize={16} onClick={() => { setSiteRegisterTrigger((prev) => !prev); console.log('what the heck') }} />
        </div>
        <pre className="code-editor">
          <code ref={codeRef} >
             {sceneConfig }
          </code>
        </pre>
      </div>

    </div>
  );
};

export default ExportConfig;



