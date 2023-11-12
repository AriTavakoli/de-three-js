// pages/api/fetchModel.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), '../../../public/models', 'webflow-logo.gltf'); 

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: 'File not found' });
  }

  res.setHeader('Content-Type', 'model/gltf-binary');

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
}
