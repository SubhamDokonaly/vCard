require("dotenv").config()
const CONFIG = {}
CONFIG.ENV = (process.env.NODE_ENV || 'development');
CONFIG.PORT = (process.env.APP_PORT || "6000");
CONFIG.DB_URL = process.env.DB_URL;

module.exports = CONFIG