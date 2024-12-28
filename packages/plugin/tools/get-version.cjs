const { echo } = require("shelljs");
const { version } = require("./package.json");

echo(version);