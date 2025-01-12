import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'service-worker.js',
  output: {
    dir: 'build/',
    format: 'cjs'
  },
  plugins: [nodeResolve()]
};