const Terser = require('terser');

async function minifyScript(script) {
  try {
    const minified = await Terser.minify(script);
    return minified.code;
  } catch (err) {
    console.error("Minification error: ", err);
    return script; // Return original script if minification fails
  }
}

module.exports = minifyScript;
