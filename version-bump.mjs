import { exec, execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.argv[2] ?? process.env.npm_package_version;

if (targetVersion !== process.env.npm_package_version) {
    const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
    packageJson.version = targetVersion;
    writeFileSync("package.json", JSON.stringify(packageJson, null, "\t"));
}
// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
execSync("git add manifest.json versions.json package.json");
execSync(`git commit -m "bump version to ${targetVersion}"`);
await import("./tag.mjs");
