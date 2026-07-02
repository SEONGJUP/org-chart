import { execFileSync } from "node:child_process";

const port = process.env.PORT || "3001";

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });
}

function getPortPids() {
  if (process.platform !== "win32") {
    return [];
  }

  try {
    const output = execFileSync("netstat", ["-ano"], {
      encoding: "utf8",
      shell: true,
    });

    return [
      ...new Set(
        output
          .split(/\r?\n/)
          .filter((line) => line.includes(`:${port}`) && line.includes("LISTENING"))
          .map((line) => line.trim().split(/\s+/).at(-1))
          .filter(Boolean),
      ),
    ];
  } catch {
    return [];
  }
}

for (const pid of getPortPids()) {
  console.log(`Stopping stale preview server on port ${port}: PID ${pid}`);
  run("taskkill.exe", ["/PID", pid, "/F"]);
}

run(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"]);

process.env.PORT = port;
await import("./local-static-server.mjs");
