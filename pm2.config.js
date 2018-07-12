module.exports = {
    apps : [
        {
          name: "file server",
          script: "./index.js",
          watch: true,
          env: {
              "PORT": 7000,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 8000,
              "NODE_ENV": "production",
          }
        }
    ]
  }