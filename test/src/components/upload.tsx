import React, { useCallback } from 'react';

const UploadModel = ({ onModelLoad }) => {
    console.log('UploadModel');
  const handleUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onModelLoad(reader.result); // Pass the Data URL up
      };
    }
  }, [onModelLoad]);

  return <input type="file" onChange={handleUpload}  />;
};

export default UploadModel;
