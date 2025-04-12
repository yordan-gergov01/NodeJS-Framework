const http = require("http");
const fs = require("fs/promises");

const PORT = 9000;

const server = http.createServer();

server.on("request", async (req, res) => {
  // Serving the HTML
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    const fileHtmlHandle = await fs.open("./public/index.html", "r");
    const fileHtmlStream = fileHtmlHandle.createReadStream();

    // the pipe here automatically handles the drain event (it is the same thing like .on("data") event)
    fileHtmlStream.pipe(res);
  }

  // Serving the CSS
  if (req.url === "/styles.css" && req.method === "GET") {
    res.setHeader("Content-Type", "text/css");

    const fileCssHandle = await fs.open("./public/styles.css", "r");
    const fileCssStream = fileCssHandle.createReadStream();

    fileCssStream.pipe(res);
  }

  // Serving the JavaScript
  if (req.url === "/script.js" && req.method === "GET") {
    res.setHeader("Content-Type", "application/javascript");

    const fileJSHandle = await fs.open("./public/script.js", "r");
    const fileJSStream = fileJSHandle.createReadStream();

    fileJSStream.pipe(res);
  }

  if (req.url === "/login" && req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;

    const body = {
      message: "Logging you in...",
    };

    res.end(JSON.stringify(body));
  }

  if (req.url === "/user" && req.method === "PUT") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 401;

    const body = {
      message: "You first have to login...",
    };

    res.end(JSON.stringify(body));
  }

  // upload route
  if (req.url === "/upload" && req.method === "PUT") {
    const fileHandle = await fs.open("./storage/image.jpg", "w");
    const fileStream = fileHandle.createWriteStream();
    res.setHeader("Content-Type", "application/json");

    req.pipe(fileStream);

    req.on("end", () => {
      req.end(JSON.stringify({ message: "File was uploaded successfully!" }));
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
