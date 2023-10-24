const url = require('url');
const querystring = require('querystring');
const customerController = require('../controllers/customerController');

const api = (req, res) => {
    const reqUrl = url.parse(req.url);
    const params = querystring.parse(reqUrl.query);

    if (req.method === 'POST' && reqUrl.pathname === '/customers') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const customerData = JSON.parse(body);
                customerController.createCustomer(customerData.name, customerData.email, (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end('Erro ao inserir cliente');
                    } else {
                        res.statusCode = 201;
                        res.end('Cliente criado com sucesso');
                    }
                });
            } catch (error) {
                res.statusCode = 400;
                res.end('Dados inválidos. Certifique-se de enviar um objeto JSON válido no corpo da solicitação.');
            }
        });

    } else if (req.method === 'GET' && reqUrl.pathname === '/customers') {
        try {
            customerController.getAllCustomers((err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Erro ao buscar clientes');
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } catch (error) {
            res.statusCode = 500;
            res.end('Erro interno no servidor');
        }

    } else if (req.method === 'PUT' && reqUrl.pathname.startsWith('/customers/')) {
        const customerId = parseInt(reqUrl.pathname.split('/')[2], 10);
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const customerData = JSON.parse(body);
                customerController.updateCustomer(customerId, customerData.name, customerData.email, (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end('Erro ao atualizar cliente');
                    } else {
                        res.statusCode = 200;
                        res.end('Cliente atualizado com sucesso');
                    }
                });
            } catch (error) {
                res.statusCode = 400;
                res.end('Dados inválidos. Certifique-se de enviar um objeto JSON válido no corpo da solicitação.');
            }
        });

    } else if (req.method === 'DELETE' && reqUrl.pathname.startsWith('/customers/')) {
        const customerId = parseInt(reqUrl.pathname.split('/')[2], 10);
        try {
            customerController.deleteCustomer(customerId, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Erro ao excluir cliente');
                } else {
                    res.statusCode = 200;
                    res.end('Cliente excluído com sucesso');
                }
            });
        } catch (error) {
            res.statusCode = 500;
            res.end('Erro interno no servidor');
        }
    } else {
        res.statusCode = 404;
        res.end('Rota não encontrada');
    }
}

module.exports = api;
