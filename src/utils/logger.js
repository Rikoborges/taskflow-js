require("dotenv").config();

function log(message) {
  const appName = process.env.APP_NAME || "APP";
  console.log(`[${appName}] ${message}`);
}

module.exports = { log };
