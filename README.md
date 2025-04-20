# MinervaJS.Mochuelo
Modulo para la gestión del Modelo de Datos, muy util para desarrollos basados en "Base de Datos Primero".

Permite Gestionar tu modelo de datos, con funciones como:
* Listar las entidades (tablas)
* Obtener el detalle de entidades como sus atributos (columnas) y otras caracteristicas (pk, fk, columnas, longitud y precision)
* Adicionar atributos (columnas) a una entidad
* Modificar las entidades
* Modificar atributos a una entidad
* Adicionar metadatos o caracteristicas personalizados junto a los atributos o dentro de las entidades
* Crear Objetos o Clases basados en las entidades del Modelo, para manipulacion de tuplas (Registros)
Todo lo anterior es guardado y gestionado en un archivo con formato .JSON

loadModels - Carga los modelos desde el archivo JSON, por defecto desde 'models.json'
getModel - Obtiene un modelo por su nombre
addModel - Agrega un nuevo modelo al archivo JSON y a la instancia de ModelManager.



Ejemplo: Partiendo de un proyecto en blanco recien creado
`$ npm i minervajs-mochuelo  `  

#### Archivo: ./models.js  
```json
    {
      "name": "pais",
      "title": "Pais",
      "table": "pais",
      "primary_key": [
        "iso3"
      ],
      "columns": [
        {
          "col": "iso3",
          "type": "string",
		  "required": true,
          "length": 3,
          "minLength": 3,
          "visible": true,
          "searchable": true,
          "label": "Nombre Corto (ISO 3)",
          "toUpperLowerCase": true,
          "allowNoEdit": true,
          "remote_check": "SELECT count(1) as existe FROM pais WHERE iso3 = ? "
        },
        {
          "col": "nombre",
          "type": "string",
		  "required": true,
          "length": 80,
          "minLength": 2,
          "visible": true,
          "searchable": true,
          "label": "Nombre",
          "placeholder": "Ingrese un Nombre"
        },
        {
          "col": "leyenda",
          "type": "string",
		  "required": false,
          "length": 80,
          "minLength": 0,
          "visible": true,
          "searchable": false,
          "label": "Leyenda",
          "placeholder": "Ingrese una Leyenda"
        },
        {
          "col": "iso2",
          "type": "string",
		  "required": false,
          "length": 2,
          "minLength": 2,
          "visible": true,
          "searchable": true,
          "label": "Nombre Corto (ISO 2)",
          "toUpperLowerCase": true,
          "allowNoEdit": true,
          "remote_check": "SELECT count(1) as existe FROM pais WHERE iso2 = ? "
        }
      ]
    }
```

#### Archivo: ./index.js  
Recupera la entidad 'pais' de nuestro modelo, crea una nueva tupla basado en nuestra entidad como un objeto.
Posteriormente intenta repetir el proceso, pero omitiendo un atributo obligatorio.
```javascript
// Ejemplo de uso del paquete minervajs-mochuelo
const { ModelManager } = require('minervajs-mochuelo');

// Inicializar el administrador de modelos
// Si no se define un nombre de archivo, Se asume que sera el archivo 'models.js' en el directorio raiz del proyecto
const modelManager = new ModelManager('MyModels.json');

// Obtener el modelo "pais"
const paisModel = modelManager.getModel('pais');

// Si el modelo es valido
if (paisModel) 
{  
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

  if (nuevoPaisObjeto) 
  {
    console.log('Nuevo objeto "pais" creado:', nuevoPaisObjeto);
  } 
  else 
  {
    console.log('Los datos del nuevo país no son válidos según el modelo.');
  }

  // Intentar crear un objeto "pais" con datos inválidos (faltando un campo requerido)
  const paisInvalidoData = {
    iso3: 'CAN',
    leyenda: 'La hoja de maple',
    iso2: 'CA',
  };

  const paisInvalidoObjeto = paisModel.createObject(paisInvalidoData);

  if (!paisInvalidoObjeto) 
  {
    console.log('La validación detectó datos inválidos para el modelo "pais".');
  }

} 
else 
{
  console.log('El modelo "pais" no se encontró.');
}

```


#### Salida:
Para lo anterior, lo siguiente seria una salida de ejecutar  `node index.js `  
```

Modelo "pais" encontrado: {
  name: 'pais',
  title: 'Pais',
  table: 'pais',
  primary_key: [ 'iso3' ],
  sql_select: ' SELECT * FROM pais ',
  sql_edit: ' SELECT * FROM pais WHERE iso3 = ? ',
  sql_new: ' SELECT * FROM pais ',
  sql_delete: ' DELETE FROM pais WHERE iso3 = ? ',
  columns: [
    {
      col: 'iso3',
      type: 'string',
      length: 3,
      minLength: 3,
      required: true,
      visible: true,
      searchable: true,
      label: 'Nombre Corto (ISO 3)',
      toUpperLowerCase: true,
      allowNoEdit: true,
      remote_check: 'SELECT count(1) as existe FROM pais WHERE iso3 = ? '
    },
    {
      col: 'nombre',
      type: 'string',
      length: 80,
      minLength: 2,
      required: true,
      visible: true,
      searchable: true,
      label: 'Nombre',
      placeholder: 'Ingrese un Nombre'
    },
    {
      col: 'leyenda',
      type: 'string',
      length: 80,
      minLength: 0,
      required: false,
      visible: true,
      searchable: false,
      label: 'Leyenda',
      placeholder: 'Ingrese una Leyenda'
    },
    {
      col: 'iso2',
      type: 'string',
      length: 2,
      minLength: 2,
      required: false,
      visible: true,
      searchable: true,
      label: 'Nombre Corto (ISO 2)',
      toUpperLowerCase: true,
      allowNoEdit: true,
      remote_check: 'SELECT count(1) as existe FROM pais WHERE iso2 = ? '
    }
  ]
}
Nuevo objeto "pais" creado: {
  iso3: 'USA',
  nombre: 'Estados Unidos',
  leyenda: 'Tierra de las oportunidades',
  iso2: 'US'
}
La validación detectó datos inválidos para el modelo "pais".
```


#### Archivo: ./index.js  
Si desea agregar modelos personalizados, para manipulacion, el siguiente fragmento de codigo, le permitira adicionar la entidad 'Ciudad' y posteriormente recuperarla  

```javascript  
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
if (ciudadModel)   
{  
  console.log('Modelo "ciudad" encontrado:', ciudadModel.definition);  
}  
```


#### Salida: 
Para lo anterior, lo siguiente seria una salida de ejecutar  `node index.js `  
``` 

Se ha agregado el modelo "ciudad".  
Modelo "ciudad" encontrado: {  
  name: 'ciudad',  
  title: 'Ciudad',  
  table: 'ciudad',  
  primary_key: [ 'id' ],  
  columns: [  
    { col: 'id', type: 'number', required: true },  
    { col: 'nombre', type: 'string', required: true },  
    { col: 'pais_iso3', type: 'string', required: true }  
  ]  
}  
```



