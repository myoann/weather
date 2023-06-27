import * as esbuild from 'esbuild'
import eslint from 'esbuild-plugin-eslint'

const ctx = await esbuild.context({
  entryPoints: ['src/index.tsx'],
  bundle: true,
  outfile: './public/output.js',
  loader: {
    '.ts': 'ts',
    '.png': 'file',
    '.gif': 'file'
  },
  plugins: [eslint({ /* config */ })]
})

await ctx.watch()

await ctx.serve({
  servedir: './public',
  host: 'localhost',
  port: 8000
})
