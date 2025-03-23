module.exports = {
  apps: [{
    name: "front",
    script: "quasar serve dist/pwa --history",
    env_production: process.env,
  }],
};
