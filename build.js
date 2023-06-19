require("esbuild").build({
  entryPoints: ["src/index.tsx"],
  outfile: "output.js",
  bundle: true,
  loader: {".ts": "ts"}
})
.then(() => console.log("⚡ Done"))
.catch(() => process.exit(1));