#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..", "");
const pkgPath = path.join(root, "package.json");
const enforcedBranches = ["test", "main"];

function runGit(command) {
  return execSync(command, { cwd: root, encoding: "utf8" }).trim();
}

const branch = runGit("git rev-parse --abbrev-ref HEAD");
if (!enforcedBranches.includes(branch)) {
  process.exit(0);
}

let baseRef = "";
try {
  runGit(`git rev-parse --verify origin/${branch}`);
  baseRef = `origin/${branch}`;
} catch {
  try {
    baseRef = runGit("git rev-parse HEAD~1");
  } catch {
    console.error(
      "ERROR: Could not determine the base commit to compare against.",
    );
    process.exit(1);
  }
}

const currentPackageJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const basePackageJson = JSON.parse(runGit(`git show ${baseRef}:package.json`));

const changedFiles = runGit(`git diff --name-only ${baseRef} HEAD`)
  .split("\n")
  .filter(Boolean);
const hasWorkingTreeChanges =
  runGit("git status --porcelain").trim().length > 0;

if (changedFiles.length === 0 && !hasWorkingTreeChanges) {
  process.exit(0);
}

const versionChanged = currentPackageJson.version !== basePackageJson.version;
if (!versionChanged) {
  console.error(
    `ERROR: You are on branch ${branch} and package.json version is unchanged.`,
  );
  console.error(
    "ERROR: For changes on test/main, package.json must have a new version.",
  );
  console.error(
    "ERROR: Update the version in package.json before pushing or merging.",
  );
  if (changedFiles.length > 0) {
    console.error("ERROR: Changed files relative to base:");
    changedFiles.forEach((file) => {
      console.error(`ERROR:   - ${file}`);
    });
  }
  process.exit(1);
}

process.exit(0);
