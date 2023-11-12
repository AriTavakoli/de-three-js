const fs = require("fs"),
  path = require("path"),
  express = require("express"),
  dotenv = require("dotenv"),
  axios = require("axios"),
  bodyParser = require("body-parser");

// Helpers
const minifyScript = require("../lib/helpers/minify");
dotenv.config();

// Server Config
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const siteId = "65137959d71c4c7e79fb350b";

const scriptsPath = path.join(__dirname, "../scripts/script.js");
const testScriptPath = path.join(__dirname, "../scripts/testScript.js");
const scriptSource = fs.readFileSync(scriptsPath, "utf8");
const scriptVersion = process.env.VERSION;

// Add script to Webflow as a separate js file
const testScriptSource = fs.readFileSync(scriptsPath, "utf8");

app.get('/getSiteId', async (req, res) => {
  
})


app.put("/addScript", async (req, res) => {
  let headersList = {
    Authorization: `Bearer ${process.env.TOKEN}`,
    "Content-Type": "application/json",
  };

  const siteId = req.body.siteId;

  let bodyContent = JSON.stringify({
    scripts: [
      {
        id: "threeman",
        location: "header",
        version: scriptVersion,
      },
    ],
  });

  let reqOptions = {
    url: `https://api.webflow.com/v2/sites/${siteId}/custom_code`,
    method: "PUT",
    headers: headersList,
    data: bodyContent,
  };

  let response = await axios.request(reqOptions);

  res.status(200).json(response.data);

  console.log(response.data);
});

// Register the script with Webflow

app.post("/registerScript", async (req, res) => {
  console.log(process.env.VERSION);

  console.log('asdasd');


  const siteId = req.body.siteId;
  console.log(siteId);

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  };

  const minifiedSource = await minifyScript(scriptSource);

  console.log(minifiedSource);

  const bodyContent = JSON.stringify({
    canCopy: false,
    sourceCode: minifiedSource,
    version: scriptVersion,
    displayName: "threeMan",
  });
  const url = 'https://api.webflow.com/v2/sites/651a1390f46c051ae2da83ec/registered_scripts/inline';
  // changed to 
  

  const reqOptions = {
    url: url,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// Get scripts from Webflow

app.get("/getScript", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.webflow.com/v2/sites/651a1390f46c051ae2da83ec/custom_code",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ message: "An error occurred", error });
      console.error(error);
    });
});

// Delete script from Webflow

app.delete("/deleteScript", async (req, res) => {
  const options = {
    method: "DELETE",
    url: "https://api.webflow.com/v2/sites/65137959d71c4c7e79fb350b/custom_code",
    headers: {
      authorization: `Bearer ${process.env.TOKEN}`,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ message: "An error occurred", error });
      console.error(error);
    });
});

app.put("/updateScript", async (req, res) => {
  const options = {
    method: "PUT",
    url: "https://api.webflow.com/v2/sites/site_id/custom_code",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${process.env.TOKEN}`,
    },
    data: {
      scripts: [
        {
          id: "three",
          location: "header",
          version: "1.0.35",
        },
        { id: "test", location: "header", version: "1.0.53" },
      ],
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
      console.log(response.data);
    })
    .catch(function (error) {
      res.status(500).json({ message: "An error occurred", error });
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
