/**
 * @module ModelManager
 * @description Clase que gestiona la carga, recuperación y adición de modelos desde un archivo JSON.
 */

const fs = require('fs');
const path = require('path');
const Model = require('./model');

/**
 * @class ModelManager
 * @description Clase que gestiona los modelos.
 */
class ModelManager {
  /**
   * @constructor
   * @param {string} [filePath='models.json'] - Ruta del archivo JSON que contiene las definiciones de los modelos.
   */
  constructor(filePath = 'models.json') 
  {
    this.filePath = path.resolve(__dirname, '../../../' + filePath);		// Correccion por rutas relativas '../../../' 
    this.models = this.loadModels();
  }

  /**
   * @function loadModels
   * @description Carga los modelos desde el archivo JSON.
   * @returns {object} - Un objeto que contiene los modelos cargados.
   */
  loadModels() 
  {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const models = {};
      jsonData.tables.forEach((table) => {
        models[table.name] = new Model(table);
      });
      return models;
    } 
	catch (error) 
	{
      console.error('Error loading models:', error);
      return {};
    }
  }

  /**
   * @function getModel
   * @description Obtiene un modelo por su nombre.
   * @param {string} name - Nombre del modelo a recuperar.
   * @returns {Model|undefined} - El modelo encontrado o undefined si no se encuentra.
   */
  getModel(name) 
  {
    return this.models[name];
  }

  /**
   * @function addModel
   * @description Agrega un nuevo modelo al archivo JSON y a la instancia de ModelManager.
   * @param {object} modelDefinition - Definición del modelo a agregar.
   * @returns {boolean} - Verdadero si el modelo se agregó correctamente, falso en caso contrario.
   */
  addModel(modelDefinition) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      jsonData.tables.push(modelDefinition);
      fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2));
      this.models[modelDefinition.name] = new Model(modelDefinition);
      return true;
    } 
	catch (error) 
	{
      console.error('Error adding model:', error);
      return false;
    }
  }


  /**
   * @function delModel
   * @description Elimina un modelo al archivo JSON y a la instancia de ModelManager.
   * @param {string} name - Nombre del modelo a Eliminar.
   * @returns {boolean} - Verdadero si el modelo se Elimino correctamente, falso en caso contrario.
   */
  delModel(name) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
	  console.log('jsonData');
	  console.log(jsonData);
	  console.log('jsonData.tables');
	  console.log(jsonData.tables);
      delete jsonData.tables[name];
      fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2));
      delete this.models[name];
      return true;
    } 
	catch (error) 
	{
      console.error('Error deleting model:', error);
      return false;
    }
  }
  
  
  
}

module.exports = ModelManager;