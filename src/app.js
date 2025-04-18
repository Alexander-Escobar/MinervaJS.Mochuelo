/**
 * @module mi-modelo-de-datos
 * @description Módulo principal que exporta las clases y utilidades para la gestión de modelos.
 */

const Model = require('./Model');
const types = require('./types');
const ModelManager = require('./ModelManager');

module.exports = {
  Model,
  types,
  ModelManager,
};

