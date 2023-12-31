import React from 'react';
import './select-element.css'
import ActivateEmbed from '../embed/activate-embed';



const CanvasElementSelector = () => (
  <div className="select-container">
    <svg
      data-icon="TriggerClick"
      aria-hidden="true"
      focusable="false"
      width="21"
      height="30"
      viewBox="0 0 21 30"
      style={{ display: 'block', marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}
    >
      <path fill="currentColor" d="M14 10h3V8h-3v2zm-4-9H8v3h2V1zm5.707 2.707l-1.414-1.414-2 2 1.414 1.414 2-2zm-10 .586l-2-2-1.414 1.414 2 2 1.414-1.414zM4 8H1v2h3V8zm14.5 8H17a1 1 0 00-1-1h-2a1 1 0 00-1-1h-2V9.5a1.5 1.5 0 00-3 0V21l-2.657-2.277a1.2 1.2 0 00-1.76 1.603S7.5 27 9 29h9l1.615-5.653c.255-.894.385-1.82.385-2.747v-3.1a1.5 1.5 0 00-1.5-1.5z"></path>
    </svg>
    <p className="select-text">Select an element on the canvas then Activate to embed the Three-js Canvas.</p>
    <ActivateEmbed></ActivateEmbed>



  </div>
);

export default CanvasElementSelector;
