const server = require("express")();
require("./app/app")(server);

const PORT = process.env.PORT | 3000;
server.listen(PORT, () => console.log(`Server start at port: ${PORT}`));
