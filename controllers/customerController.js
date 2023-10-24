const customerModel = require('../config/database');

function createCustomer(name, email, callback) {
  customerModel.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], callback);
}

function getAllCustomers(callback) {
  customerModel.query('SELECT * FROM customers', callback);
}

function updateCustomer(id, name, email, callback) {
  customerModel.query('UPDATE customers SET name = ?, email = ? WHERE id = ?', [name, email, id], callback);
}

function deleteCustomer(id, callback) {
  customerModel.query('DELETE FROM customers WHERE id = ?', [id], callback);
}

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};
