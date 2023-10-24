const http = require('http');
const api = require('./routes/api');

const port = 3000;

const server = http.createServer(api);

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
