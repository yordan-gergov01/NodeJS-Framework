const http = require("http");
const fs = require("fs/promises");

class Framework {
  constructor() {
    this.server = http.createServer();
    this.routes = {};

    this.server.on("request", (req, res) => {
      // Send a file back to the client
      res.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const fileStream = fileHandle.createReadStream();

        res.setHeader("Content-Type", mime);

        fileStream.pipe(res);
      };

      // Set the status code of the response
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };

      // Send a json data back to the client (for small json data, less than the highWaterMark)
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };

      // if the routes object does not have a key of req.method + req.url, return 404
      if (!this.routes[req.method.toLocaleLowerCase() + req.url]) {
        return res
          .status(404)
          .json({ error: `Cannot ${req.method} ${req.url}` });
      }

      this.routes[req.method.toLocaleLowerCase() + req.url](req, res);
    });
  }

  listen(port, cb) {
    this.server.listen(port, () => {
      cb();
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }
}

module.exports = Framework;
