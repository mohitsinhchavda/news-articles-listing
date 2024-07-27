import dotenv from 'dotenv';
import esbuild from 'esbuild';

// enabling usage of env variables
dotenv.config();
const args = process.argv;

// common cnonfig for local and hosting envs
const config = {
  logLevel: 'info',
  entryPoints: ['src/index.ts'],
  outfile: 'public/build/bundle.js',
  bundle: true,
  define: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
  },
};


// generating build for hosting
if (args.includes('--build')) {
  esbuild
    .build({
      ...config,
      minify: true,
      sourcemap: false,
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

// starting local server with HMR
if (args.includes('--start')) {
  await esbuild
    .context({
      ...config,
      minify: false,
      sourcemap: true,
    })
    .then(async (ctx) => {
      await ctx.watch();
      await ctx.serve({
        servedir: 'public',
        onRequest: ({ remoteAddress, method, path, status, timeInMS }) => {
          console.info(remoteAddress, status, `"${method} ${path}" [${timeInMS}ms]`);
        },
      });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
    await esbuild.build({
      entryPoints: ['src/styles/main.css'],
      bundle: true,
      outfile: 'src/styles/out.css',
    })
}