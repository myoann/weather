import { context } from 'esbuild'
import eslint from 'esbuild-plugin-eslint'

const ctx = await context({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: './public/output.js',
    publicPath: '/',
    assetNames: 'assets/[name]-[hash]',
    loader: {
        '.ts': 'ts',
        '.png': 'file',
        '.gif': 'file',
    },
    plugins: [eslint()],
})

await ctx.watch()

await ctx.serve({
    servedir: './public',
    host: 'localhost',
    port: 8000,
})

console.log('Server is active on http://localhost:8000')
