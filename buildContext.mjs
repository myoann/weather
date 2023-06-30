import { context } from 'esbuild'
import eslint from 'esbuild-plugin-eslint'

/*
 * Create a map of replacements for environment variables.
 * @return A map of variables.
 */
export function defineProcessEnv() {
    const definitions = {}

    Object.keys(process.env).forEach((key) => {
        definitions[`process.env.${key}`] = JSON.stringify(process.env[key])
    })
    definitions['process.env'] = '{}'

    return definitions
}

export const ctx = await context({
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
    define: defineProcessEnv(),
    plugins: [eslint()],
})
