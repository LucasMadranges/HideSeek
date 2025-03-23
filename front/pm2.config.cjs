module.exports = {
  apps: [{
    name: "front",
    script: "quasar serve",
    args: "dist/pwa --history --port 4000",
    env_production: process.env,
  }],
};
