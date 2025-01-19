import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default [
  {
    input: 'service-worker.js',
    output: {
      file: "build/service-worker.js",
      format: 'cjs'
    },
    plugins: [nodeResolve(), replace({
      preventAssignment: true,
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
      'process.env.SERVER_ADDRESS': JSON.stringify(process.env.SERVER_ADDRESS)
    })]
  },
  {
    input: 'scripts/content-script-youtube.js',
    output: {
      file: "build/scripts/content-script-youtube.js",
      format: 'cjs'
    },
    plugins: [nodeResolve(), replace({
      preventAssignment: true,
      'process.env.CLIENT_ID': process.env.CLIENT_ID
    })]
  },

];