const env = process.env.PORT || "development";
const config = require(`./${env}`);

export default config;
