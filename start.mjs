import { ctx } from './buildContext.mjs'

await ctx.watch()

await ctx.serve({
    servedir: './public',
    host: 'localhost',
    port: 8000,
})

console.log('Server is active on http://localhost:8000')
