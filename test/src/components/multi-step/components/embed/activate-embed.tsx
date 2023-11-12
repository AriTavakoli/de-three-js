import { IconButtonWithText } from '@/components/buttons/icon-button-text';
import { useThreeContext } from '@/context/ThreeContext';
import { createThreeScene } from '@/lib/webflow/createEmbed';

const ActivateEmbed = () => {
  const {canvasId, setCanvasId} = useThreeContext();

  return (
    <div className="activate-container">
      <label className ="sr-only" htmlFor="canvasIdInput">Enter Canvas ID:</label>
      <input 
        type="text" 
        id="canvasIdInput"
        placeholder="Enter Canvas ID" 
        onChange={(e) => setCanvasId(e.target.value)} 
        aria-label="Enter Canvas ID"
      />
      <IconButtonWithText 
        buttonText="Activate" 
        onClick={() => { createThreeScene(canvasId) }} 
        aria-label="Activate Canvas"
      />
    </div>
  )
};

export default ActivateEmbed;