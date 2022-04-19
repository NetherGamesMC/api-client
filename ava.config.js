export default {
  concurrency: 1,
  failFast: true,
  serial: true,
  timeout: '2m',
  typescript: {
    rewritePaths: {'src/': 'dist/'},
    compile: false,
  },
};
