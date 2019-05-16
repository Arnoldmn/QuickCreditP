"use strict";

var swaggerUi = require('swagger-ui-express');

var swaggerDocument = require('./swagger.json');

module.exports = function (app) {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
//# sourceMappingURL=doc.js.map