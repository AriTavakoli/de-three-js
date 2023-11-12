import React from 'react';
import './loader.css';

const LoadingComponent = () => (
  <div className="loader-wrapper">
    <svg className="loader" xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
      <circle opacity="0.2" cx="16.0581" cy="16" r="13.5" stroke="#D9D9D9" stroke-width="3" />
      <path className="loader-path"
        d="M1.05811 16C1.05811 12.0218 2.63846 8.20644 5.4515 5.3934C8.26455 2.58035 12.0799 1 16.0581 1V3.98479C12.8715 3.98479 9.81536 5.25067 7.56207 7.50396C5.30878 9.75725 4.04289 12.8134 4.04289 16H1.05811Z"
        fill="#D9D9D9" />
    </svg>
  </div>
);

export default LoadingComponent;
