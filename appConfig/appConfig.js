const appConfig = {};

appConfig.port = 8000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri : "mongodb://localhost/testDB"
}
appConfig.apiVersion = "/api/v1";

module.exports = {
    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    env:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion
}