/**
 * @module types
 * @description Modulo que define tipos de datos y utilidades de validación.
 */

/**
 * @type {string}
 * @description Tipo de dato para cadenas de texto.
 */
const STRING = 'string';

/**
 * @type {string}
 * @description Tipo de dato para números.
 */
const NUMBER = 'number';

/**
 * @type {string}
 * @description Tipo de dato para valores booleanos.
 */
const BOOLEAN = 'boolean';

/**
 * @type {string}
 * @description Tipo de dato para fechas.
 */
const DATE = 'date';

/**
 * @function validate
 * @description Valida si un valor coincide con un tipo de dato específico.
 * @param {*} value - El valor a validar.
 * @param {string} type - El tipo de dato esperado.
 * @returns {boolean} - Verdadero si el valor es válido, falso en caso contrario.
 */
const validate = (value, type) => 
{
  switch (type) {
    case STRING:
      return typeof value === 'string';
    case NUMBER:
      return typeof value === 'number';
    case BOOLEAN:
      return typeof value === 'boolean';
    case DATE:
      return value instanceof Date;
    default:
      return true; // Tipo no reconocido, o validación personalizada
  }
};

module.exports = {
  STRING,
  NUMBER,
  BOOLEAN,
  DATE,
  validate,
};