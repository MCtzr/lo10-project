module.exports = {
  HOST: "LAPTOP-6Q4LV4MN",
  USER: "ArtMatchAdmin",
  PASSWORD: "ArtMatchLMM",
  DB: "ArtMatch",
  dialect: "mssql",
  pool: {
    max: 17,
    min: 0,
    acquire: 500000,
    idle: 500000,
    requestTimeout: 6000000
  }
};