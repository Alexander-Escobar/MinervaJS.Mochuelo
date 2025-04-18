// Ejemplo de uso del paquete mi-modelo-de-datos
const { ModelManager } = require('mi-modelo-de-datos');

// Inicializar el administrador de modelos
const modelManager = new ModelManager();

// Obtener el modelo "pais"
const paisModel = modelManager.getModel('pais');

if (paisModel) {
  console.log('Modelo "pais" encontrado:', paisModel.definition);

  // Datos para crear un nuevo objeto "pais"
  const nuevoPaisData = {
    iso3: 'USA',
    nombre: 'Estados Unidos',
    leyenda: 'Tierra de las oportunidades',
    iso2: 'US',
  };

  // Intentar crear un objeto "pais"
  const nuevoPaisObjeto = paisModel.createObject(nuevoPaisData);

  if (nuevoPaisObjeto) {
    console.log('Nuevo objeto "pais" creado:', nuevoPaisObjeto);
  } else {
    console.log('Los datos del nuevo país no son válidos según el modelo.');
  }

  // Intentar crear un objeto "pais" con datos inválidos (faltando un campo requerido)
  const paisInvalidoData = {
    iso3: 'CAN',
    leyenda: 'La hoja de maple',
    iso2: 'CA',
  };

  const paisInvalidoObjeto = paisModel.createObject(paisInvalidoData);

  if (!paisInvalidoObjeto) {
    console.log('La validación detectó datos inválidos para el modelo "pais".');
  }

} else {
  console.log('El modelo "pais" no se encontró.');
}

// Ejemplo de cómo agregar un nuevo modelo
const nuevoModeloDefinicion = {
  "name": "ciudad",
  "title": "Ciudad",
  "table": "ciudad",
  "primary_key": ["id"],
  "columns": [
    { "col": "id", "type": "number", "required": true },
    { "col": "nombre", "type": "string", "required": true },
    { "col": "pais_iso3", "type": "string", "required": true }
  ]
};

modelManager.addModel(nuevoModeloDefinicion);
console.log('Se ha agregado el modelo "ciudad".');

// Intentar obtener el nuevo modelo "ciudad"
const ciudadModel = modelManager.getModel('ciudad');
if (ciudadModel) {
  console.log('Modelo "ciudad" encontrado:', ciudadModel.definition);
}

