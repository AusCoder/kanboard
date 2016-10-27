/* global __root */

// =======================
// Routes
// =======================
exports.routes = function (app) {
  app.get('/admin/ping', function (req, res) {
    res.send('pong');
  });

  app.get('/', function (req, res) {
    res.redirect('/public');
  });

  app.get('*', function (req, res) {
    res.redirect('/public');
  });

  app.post('/cards', function (req, res) {

	});
};
