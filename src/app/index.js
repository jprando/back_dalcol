const { es, querys } = require("./db");
const { accessLog } = querys;

const ignoreFaviconRequest = (req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(204).end();
  }
};

module.exports = async (req, res) => {
  ignoreFaviconRequest(req, res);

  if (res.finished) {
    return;
  }

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
      res.write(JSON.stringify(hit)); // confira o comentario no README
    }

    if (!searchResponse._scroll_id) {
      break;
    }

    res.searchResponse = await es.scroll({
      scroll_id: searchResponse._scroll_id,
      scroll: searchResponse.scroll || '10s',
    });
  }
  res.write("]");
  res.end();
};
