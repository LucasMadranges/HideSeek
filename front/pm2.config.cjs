module.exports = {
  apps: [{
    name: "front",
    script: "serve -s dist/pwa -l 4000",
    env_production: process.env,
  }],
};
