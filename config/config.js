require("dotenv").config()
const CONFIG = {}
CONFIG.ENV = (process.env.NODE_ENV || 'development');
CONFIG.PORT = (process.env.APP_PORT || "6000");
CONFIG.DB_URL = process.env.DB_URL;
CONFIG.SECRET_KEY = process.env.SECRET_KEY;
CONFIG.BUCKET_NAME = process.env.BUCKET_NAME;
CONFIG.REGION = process.env.REGION;
CONFIG.ACCESS_KEY = process.env.ACCESS_KEY;

module.exports = CONFIG