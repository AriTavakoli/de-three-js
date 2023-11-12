import React from 'react';

const LightingControl = ({ lightingConfig, setLightingConfig }) => {
  const handleLightingChange = (e) => {
    setLightingConfig({
      ...lightingConfig,
      lighting: e.target.value
    });
  };

  const handleIntensityChange = (e, type) => {
    setLightingConfig({
      ...lightingConfig,
      [type]: parseFloat(e.target.value)
    });
  };

  return (
    <div>
      <label>
        Lighting:
        <select value={lightingConfig.lighting} onChange={handleLightingChange}>
          <option value="custom">Custom</option>
          <option value="studio">Studio</option>
        </select>
      </label>
  
      <div className="">
        <div className="range-label">
          <span>Key Light Intensity:</span>
          <span>{lightingConfig.keyLightIntensity}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={lightingConfig.keyLightIntensity}
          onChange={(e) => handleIntensityChange(e, 'keyLightIntensity')}
        />
      </div>
  
      <div className="">
        <div className="range-label">
          <span>Fill Light Intensity:</span>
          <span>{lightingConfig.fillLightIntensity}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={lightingConfig.fillLightIntensity}
          onChange={(e) => handleIntensityChange(e, 'fillLightIntensity')}
        />
      </div>
  
      <div className="">
        <div className="range-label">
          <span>Rim Light Intensity:</span>
          <span>{lightingConfig.rimLightIntensity}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={lightingConfig.rimLightIntensity}
          onChange={(e) => handleIntensityChange(e, 'rimLightIntensity')}
        />
      </div>
    </div>
  );
  
};

export default LightingControl;
