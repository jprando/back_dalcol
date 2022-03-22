const { es } = require("./db");
const { accessLog } = require("./query");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.flushHeaders();

  let searchResponse = await es.search(accessLog);
  let isFirst = true;

  res.write("[");
  while (true) {
    const sourceHits = searchResponse.hits.hits;

    if (sourceHits.length === 0) {
      break;
    }

    for (const hit of sourceHits) {
      if (!isFirst) {
        res.write(",");
      } else {
        isFirst = false;
      }
      /// JSON.stringify é lento pra xuxu
      /// o ideal é tu pegar o que tu quer do objeto diretamente e gerar
      /// o json no formato correto do json
      /// ou usar uma lib com opcao de tu informar um schema para ela fazer isso
      /// pra voce, automatico e generico é sempre a opcao mais lenta
      /// quando o assunto é gerar um json
      res.write(JSON.stringify(hit));
    }

    if (!searchResponse._scroll_id) {
      break;
    }

    searchResponse = await client.scroll({
      scrollId: searchResponse._scroll_id,
      scroll: params.scroll,
    });
  }
  res.write("]");
  res.end();
};
