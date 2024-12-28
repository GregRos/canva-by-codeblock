import { exec, execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import shelljs from "shelljs";
const { echo, cat } = shelljs;

const targetVersion = process.argv[2] ?? process.env.npm_package_version;

if (targetVersion !== process.env.npm_package_version) {
    const packageJson = JSON.parse(cat("package.json"));
    echo(JSON.stringify({
        ...packageJson,
        version: targetVersion
    }, null, "\t")).to("package.json");
}
// read minAppVersion from manifest.json and bump version to target version
const manifest = JSON.parse(readFileSync("../../manifest.json", "utf8"));
const { minAppVersion } = manifest;

if (targetVersion !== manifest.version) {
    echo(JSON.stringify({
        ...manifest,
        version: targetVersion
    }, null, "\t")).to("manifest.json")
}
const versions = JSON.parse(cat("../../versions.json"));
if (versions[targetVersion] !== minAppVersion) {
    echo(JSON.stringify({
        ...versions,
        [targetVersion]: minAppVersion
    }, null, "\t")).to("versions.json");
}

execSync("git add manifest.json versions.json package.json");
execSync(`git commit -m "bump version to ${targetVersion}"`);
