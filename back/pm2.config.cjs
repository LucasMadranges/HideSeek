module.exports = {
    apps: [{
        name: "back",
        script: "npm run start:prod",
        env_production: process.env,
    }],
};
