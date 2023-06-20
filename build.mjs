import * as esbuild from 'esbuild'

let ctx = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: 'output.js',
  loader: {
    '.ts': 'ts',
    '.png': 'file',
    '.gif': 'file',
  },
})

await ctx.watch()

let { host, port } = await ctx.serve({
  servedir: '.',
  host: 'localhost',
  port: 8000,
})

/*
import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
})
*/