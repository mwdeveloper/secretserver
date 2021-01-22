const env = process.env.NODE_ENV || "development";

const config = {
    mongoUrl: "mongodb://localhost:27017/secretserver"
};

module.exports = config;
