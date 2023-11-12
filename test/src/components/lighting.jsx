import React from 'react';

const LightingConfigurator = ({ config, onConfigChange }) => {
  const handleLightingChange = (e) => {
    onConfigChange({
      ...config,
      lighting: e.target.value
    });
  };

  const handleIntensityChange = (light, value) => {
    onConfigChange({
      ...config,
      [light]: value
    });
  };

  return (
    <div>
      {/* Add your controls here with respective handlers */}
      <label>Key Light Intensity: </label>
      <input type="range" min="0" max="1" step="0.1" value={config.keyLightIntensity}
             onChange={(e) => handleIntensityChange('keyLightIntensity', e.target.value)} />
    </div>
  );
};

export default LightingConfigurator;
