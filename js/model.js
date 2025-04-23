/**
 * @module model
 * @description Clase que representa un modelo de datos.
 */

const types = require('./types');


/**
 * @class Model
 * @description Clase base para definir modelos de datos.
 */
class Model 
{
  /**
   * @constructor
   * @param {object} definition - Definición del modelo de datos.
   */
  constructor(definition) 
  {
    this.definition = definition;
  }


  /**
   * @function validate
   * @description Valida si los datos de un objeto coinciden con la definición del modelo.
   * @param {object} data - Datos del objeto a validar.
   * @returns {boolean} - Verdadero si los datos son válidos, falso en caso contrario.
   */
  validate(data) 
  {
    for (const column of this.definition.columns) 
	{
      if (column.required) 
	  {
        if (data[column.col] === undefined || data[column.col] === null) 
		{ return false; }
      }
      if (data[column.col] !== undefined && data[column.col] !== null) 
	  {
        if (!types.validate(data[column.col], column.type)) 
		{ return false; }
      }
    }
    return true;
  }


  /**
   * @function createObject
   * @description Crea un objeto de modelo si los datos son válidos.
   * @param {object} data - Datos del objeto a crear.
   * @returns {object|null} - El objeto creado o nulo si los datos no son válidos.
   */
  createObject(data) 
  {
    if (this.validate(data)) 
	{ return data; } 
	else 
	{ return null; }
  }
}

module.exports = Model;