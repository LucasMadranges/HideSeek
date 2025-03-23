module.exports = {
  apps: [{
    name: "front",
    script: "quasar serve dist/spa --history",
    env_production: process.env,
  }],
};
