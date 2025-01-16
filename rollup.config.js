import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'service-worker.js',
  output: {
    dir: 'build/',
    format: 'cjs'
  },
  input: 'scripts/content-script-youtube.js',
  output: {
    dir: 'build/',
    format: 'cjs'
  },
  plugins: [nodeResolve(), replace({
    preventAssignment: true,
    'process.env.CLIENT_ID': process.env.CLIENT_ID
  })]
};