module.exports = {
  apps: [{
    name: "front",
    script: "quasar serve dist/spa",
    env_production: process.env,
  }],
};
