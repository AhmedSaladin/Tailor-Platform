const server = require("express")();
require("./app/app")(server);

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';
server.listen(PORT, HOST ,() => console.log(`Server start at port: ${PORT}`));
