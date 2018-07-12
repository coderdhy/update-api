module.exports = {
    apps: [
        {
            name: "file server",
            script: "./index.js",
            watch: true,
            ignore_watch: [
                "upload",
                "node_modules",
                "start.sh"
            ],
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
