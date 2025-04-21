/**
 * @module ModelManager
 * @description Clase que gestiona la carga, recuperación, adición, actualización y eliminación y manipulación de atributos de columnas en modelos desde un archivo JSON.
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
   * @returns {object} - Un objeto que contiene los modelos cargados, indexados por su nombre.
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
	  this.saveModels(jsonData);
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
   * @function updateModel
   * @description Actualiza un modelo existente en el archivo JSON y en la instancia de ModelManager.
   * @param {string} name - Nombre del modelo a actualizar.
   * @param {object} updatedDefinition - La nueva definición del modelo.
   * @returns {boolean} - Verdadero si el modelo se actualizó correctamente, falso si no se encontró o hubo un error.
   */
  updateModel(name, updatedDefinition) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const index = jsonData.tables.findIndex(table => table.name === name);
      if (index !== -1) 
	  {
        jsonData.tables[index] = updatedDefinition;
        this.saveModels(jsonData);
        this.models[name] = new Model(updatedDefinition);
        return true;
      } 
	  else
	  {
        console.warn(`Model with name "${name}" not found for update.`);
        return false;
      }
    } 
	catch (error) 
	{
      console.error(`Error updating model "${name}":`, error);
      return false;
    }
  }

  /**
   * @function deleteModel
   * @description Elimina un modelo del archivo JSON y de la instancia de ModelManager.
   * @param {string} name - Nombre del modelo a eliminar.
   * @returns {boolean} - Verdadero si el modelo se eliminó correctamente, falso si no se encontró o hubo un error.
   */
  deleteModel(name) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const initialLength = jsonData.tables.length;
      jsonData.tables = jsonData.tables.filter(table => table.name !== name);
      if (jsonData.tables.length < initialLength) 
	  {
        this.saveModels(jsonData);
        delete this.models[name];
        return true;
      } 
	  else 
	  {
        console.warn(`Model with name "${name}" not found for deletion.`);
        return false;
      }
    } 
	catch (error) 
	{
      console.error(`Error deleting model "${name}":`, error);
      return false;
    }
  }
  
  
  /**
   * @function addColumnAttribute
   * @description Agrega un nuevo atributo a una columna específica dentro de la definición de un modelo.
   * @param {string} modelName - Nombre del modelo al que pertenece la columna.
   * @param {string} columnName - Nombre de la columna a la que se agregará el atributo.
   * @param {string} attributeName - Nombre del nuevo atributo (la clave).
   * @param {*} attributeValue - El valor del nuevo atributo.
   * @returns {boolean} - Verdadero si el atributo se agregó correctamente, falso si no se encontró el modelo o la columna, o si el atributo ya existe.
   */
  addColumnAttribute(modelName, columnName, attributeName, attributeValue) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const modelIndex = jsonData.tables.findIndex(table => table.name === modelName);

      if (modelIndex !== -1) 
	  {
        const column = jsonData.tables[modelIndex].columns.find(col => col.col === columnName);
        if (column) 
		{
          if (!column.hasOwnProperty(attributeName)) 
		  {
            column[attributeName] = attributeValue;
            this.saveModels(jsonData);
            this.models[modelName] = new Model(jsonData.tables[modelIndex]);
            return true;
          } 
		  else 
		  {
            console.warn(`Attribute "${attributeName}" already exists in column "${columnName}" of model "${modelName}".`);
            return false;
          }
        }
		else
		{
          console.warn(`Column with name "${columnName}" not found in model "${modelName}".`);
          return false;
        }
      }
	  else 
	  {
        console.warn(`Model with name "${modelName}" not found for adding column attribute.`);
        return false;
      }
    } 
	catch (error) 
	{
      console.error(`Error adding attribute "${attributeName}" to column "${columnName}" in model "${modelName}":`, error);
      return false;
    }
  }

 /**
   * @function editModelAttribute
   * @description Edita un atributo de una columna específica dentro de la definición de un modelo.
   * @param {string} modelName - Nombre del modelo al que pertenece la columna.
   * @param {string} columnName - Nombre de la columna cuyo atributo se va a editar.
   * @param {string} attributeName - Nombre del atributo a editar (la clave).
   * @param {*} attributeValue - El nuevo valor del atributo.
   * @returns {boolean} - Verdadero si el atributo se editó correctamente, falso si no se encontró el modelo o la columna.
   */
  editModelAttribute(modelName, columnName, attributeName, attributeValue) {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const modelIndex = jsonData.tables.findIndex(table => table.name === modelName);

      if (modelIndex !== -1) {
        const column = jsonData.tables[modelIndex].columns.find(col => col.col === columnName);
        if (column) {
          column[attributeName] = attributeValue;
          this.saveModels(jsonData);
          this.models[modelName] = new Model(jsonData.tables[modelIndex]); // Reinstanciar el modelo con la nueva definición
          return true;
        } else {
          console.warn(`Column with name "${columnName}" not found in model "${modelName}".`);
          return false;
        }
      } else {
        console.warn(`Model with name "${modelName}" not found for attribute editing.`);
        return false;
      }
    } catch (error) {
      console.error(`Error editing attribute "${attributeName}" of column "${columnName}" in model "${modelName}":`, error);
      return false;
    }
  }

  /**
   * @function deleteColumnAttribute
   * @description Elimina un atributo de una columna específica dentro de la definición de un modelo.
   * @param {string} modelName - Nombre del modelo al que pertenece la columna.
   * @param {string} columnName - Nombre de la columna cuyo atributo se va a eliminar.
   * @param {string} attributeName - Nombre del atributo a eliminar (la clave).
   * @returns {boolean} - Verdadero si el atributo se eliminó correctamente, falso si no se encontró el modelo, la columna o el atributo.
   */
  deleteColumnAttribute(modelName, columnName, attributeName) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const modelIndex = jsonData.tables.findIndex(table => table.name === modelName);

      if (modelIndex !== -1) 
	  {
        const column = jsonData.tables[modelIndex].columns.find(col => col.col === columnName);
        if (column && column.hasOwnProperty(attributeName)) 
		{
          delete column[attributeName];
          this.saveModels(jsonData);
          this.models[modelName] = new Model(jsonData.tables[modelIndex]);
          return true;
        } 
		else 
		{
          console.warn(`Attribute "${attributeName}" not found in column "${columnName}" of model "${modelName}".`);
          return false;
        }
      }
	  else 
	  {
        console.warn(`Model with name "${modelName}" not found for deleting column attribute.`);
        return false;
      }
    } 
	catch (error) 
	{
      console.error(`Error deleting attribute "${attributeName}" from column "${columnName}" in model "${modelName}":`, error);
      return false;
    }
  }


  /**
   * @function hasColumnAttribute
   * @description Verifica si una columna específica dentro de la definición de un modelo tiene un atributo determinado.
   * @param {string} modelName - Nombre del modelo al que pertenece la columna.
   * @param {string} columnName - Nombre de la columna a verificar.
   * @param {string} attributeName - Nombre del atributo a buscar (la clave).
   * @returns {boolean} - Verdadero si el atributo existe en la columna, falso si no se encontró el modelo o la columna, o si el atributo no existe.
   */
  hasColumnAttribute(modelName, columnName, attributeName) 
  {
    try 
	{
      const data = fs.readFileSync(this.filePath, 'utf8');
      const jsonData = JSON.parse(data);
      const modelIndex = jsonData.tables.findIndex(table => table.name === modelName);

      if (modelIndex !== -1) 
	  {
        const column = jsonData.tables[modelIndex].columns.find(col => col.col === columnName);
        if (column) 
		{ return column.hasOwnProperty(attributeName); }
		else 
		{
          console.warn(`Column with name "${columnName}" not found in model "${modelName}".`);
          return false;
        }
      } 
	  else 
	  {
        console.warn(`Model with name "${modelName}" not found for checking column attribute.`);
        return false;
      }
    } 
	catch (error) 
	{
      console.error(`Error checking existence of attribute "${attributeName}" in column "${columnName}" of model "${modelName}":`, error);
      return false;
    }
  }

    
  /**
   * @private
   * @function saveModels
   * @description Guarda la estructura de modelos actualizada en el archivo JSON.
   * @param {object} jsonData - El objeto JSON con la lista de modelos.
   */
  saveModels(jsonData) 
  { fs.writeFileSync(this.filePath, JSON.stringify(jsonData, null, 2)); }
  
}

module.exports = ModelManager;