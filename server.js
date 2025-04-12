const Framework = require("./framework");

const PORT = 4060;

const server = new Framework();

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}...`);
});
