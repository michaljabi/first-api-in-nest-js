module.exports = {
  apps: [
    {
      name: 'town-store-server',
      script: './dist/src/main.js',
      env: {
        PORT: 4300,
      },
    },
  ],
};
