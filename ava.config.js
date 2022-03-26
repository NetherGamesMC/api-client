export default {
  concurrency: 1,
  serial: true,
  timeout: '2m',
  typescript: {
    rewritePaths: {'src/': 'dist/'},
    compile: false,
  },
};
