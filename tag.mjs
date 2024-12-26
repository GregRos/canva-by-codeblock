import { exec, execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
const targetVersion = process.argv[2] ?? process.env.npm_package_version;
execSync(`git tag -a ${targetVersion} -m "${targetVersion}"`);    
