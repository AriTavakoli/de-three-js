const fs = require("fs");
const filesize = import("filesize");
const colors = require("colors");

module.exports = {
  logBundle: function (...args) {
    console.log(...args);
  },
  log: function (message, status) {
    const symbol = status ? "\x1b[32m✔\x1b[0m" : "❌";
    console.log(`- ${message}: ${symbol}  `);
  },
  logForEnv: function(env) {
    const color = env === "production" ? "\x1b[31m" : "\x1b[34m";
    const reset = "\x1b[0m";
    const label = env === "production" ? "Production Build" : "Dev Build";
    
    console.log(`[${color}${label}${reset}]`);
  },
  
  error: function (...args) {
    console.error(`${"[error]".red}`, ...args);
  },
  warn: function (...args) {
    console.warn(`${"[warn]".yellow}`, ...args);
  },
  logEnvironment: function () {
    console.log(`Running in ${process.env.NODE_ENV.yellow} mode`);
  },
  logBuildTime: function () {
    console.log(`Build timestamp: ${new Date().toLocaleString().blue}`);
  },
  logBundleSize: function (statsJson) {
    const assets = statsJson.assets;
    const totalSize = assets.reduce((prev, curr) => prev + curr.size, 0);
    const sizeLabel = filesize(totalSize, { round: 2 });

    if (totalSize > 1024 * 1024) {
      console.log(
        `${"[size]".red} Total bundle size: ${sizeLabel.red.bold} MB`
      );
    } else {
      console.log(
        `${"[size]".blue} Total bundle size: ${sizeLabel.blue.bold} KB`
      );
    }
  },
  logErrors: function (stats) {
    if (stats.hasErrors()) {
      console.error(`${"[error]".red} ${stats.toString("errors-only")}`);
    }
  },
  logWarnings: function (stats) {
    if (stats.hasWarnings()) {
      console.warn(`${"[warn]".yellow} ${stats.toString("warnings-only")}`);
    }
  },
};
