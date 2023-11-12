import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import NextCors from 'nextjs-cors';

const Terser = require('terser');

const scriptsPath = path.join(process.cwd(), "src/scripts", "script.js");
const scriptSource = fs.readFileSync(scriptsPath, "utf8");


async function minifyScript(script) {
  try {
    const minified = await Terser.minify(script);
    return minified.code;
  } catch (err) {
    console.error("Minification error: ", err);
    return script; // Return original script if minification fails
  }
}

export default async function handler(req, res) {


  await NextCors(req, res, {
    // Options
    methods: ['GET', 'POST', 'HEAD' , 'OPTIONS'],
    origin: '*', // FLAG : ***Allows requests from any origin*** 
    optionsSuccessStatus: 200,
});

 
  const siteId = req.body.siteId;



  console.log('siteId: ', siteId);

  const headersList = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.TOKEN}`
  };

  const minifiedSource = await minifyScript(scriptSource);
  const scriptVersion = process.env.VERSION;


  const bodyContent = JSON.stringify({
    canCopy: false,
    sourceCode: minifiedSource,
    version: scriptVersion,
    displayName: 'threeman'
  });

  const url = 'https://api.webflow.com/v2/sites/651a1390f46c051ae2da83ec/registered_scripts/inline';

  const reqOptions = {
    url: url,
    method: 'POST',
    headers: headersList,
    data: bodyContent
  };

  try {
    const response = await axios.request(reqOptions);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
}
