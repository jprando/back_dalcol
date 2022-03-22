const { Client } = require("@elastic/elasticsearch");
const { es } = require("../config");

const client = new Client({
  node: `http://${es.HOST}:${es.PORT}`,
});

module.exports = { es: client };
