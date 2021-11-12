module.exports = {
  launch: process.env.debug ? {
    headless: false,
    slowMo: 250,
  } : {},
  server: {
    command: 'serve -p 4444 --single',
    port: 4444,
  },
};
