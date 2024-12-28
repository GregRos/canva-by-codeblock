import { exec, execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import shelljs from "shelljs";
const { echo, cat, cd } = shelljs;

cd(`${import.meta.dirname}/..`)
const targetVersion = process.argv[2] ?? process.env.npm_package_version;
echo(`fixing versions to: ${targetVersion}`);
if (targetVersion !== process.env.npm_package_version) {
    const packageJson = JSON.parse(cat("package.json"));
    echo(JSON.stringify({
        ...packageJson,
        version: targetVersion
    }, null, "\t")).to("package.json");
    echo("package.json: changed")
} else {
    echo("package.json: upchanged")
}
// read minAppVersion from manifest.json and bump version to target version
const pathManifest = "../../manifest.json";
const manifest = JSON.parse(cat(pathManifest));
const { minAppVersion } = manifest;

if (targetVersion !== manifest.version) {
    echo(JSON.stringify({
        ...manifest,
        version: targetVersion
    }, null, "\t")).to(pathManifest)
    echo("manifest.json: changed")
} else {
    echo("manifest.json: upchanged")
}
const pathVersions = "../../versions.json";
const versions = JSON.parse(cat(pathVersions));
if (versions[targetVersion] !== minAppVersion) {
    echo(JSON.stringify({
        ...versions,
        [targetVersion]: minAppVersion
    }, null, "\t")).to(pathVersions);
    echo("versions.json: changed")
} else {
    echo("versions.json: upchanged")
}
exec("git add manifest.json versions.json");
exec(`git commit -m "bump version to ${targetVersion}"`);
