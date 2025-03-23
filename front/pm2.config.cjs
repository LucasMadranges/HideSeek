module.exports = {
  apps: [{
    name: "front",
    script: "npm run start:build",
    env_production: process.env,
  }],
};
