{
  "tables": [
    {
      "name": "pais",
      "title": "Pais",
      "table": "pais",
      "primary_key": ["iso3"],
      "sql_select": " SELECT * FROM pais ",
      "sql_edit": " SELECT * FROM pais WHERE iso3 = ? ",
      "sql_new": " SELECT * FROM pais ",
      "sql_delete": " DELETE FROM pais WHERE iso3 = ? ",
      "columns": [
        {
          "col": "iso3",          "type": "string",          "length": 3,
          "minLength": 3,          "required": true,          "visible": true,
          "searchable": true,          "label": "Nombre Corto (ISO 3)",          "toUpperLowerCase": true,
          "allowNoEdit": true,          "remote_check": "SELECT count(1) as existe FROM pais WHERE iso3 = ? "
        },
        {
          "col": "nombre",          "type": "string",          "length": 80,
          "minLength": 2,          "required": true,          "visible": true,
          "searchable": true,          "label": "Nombre",          "placeholder": "Ingrese un Nombre"
        },
        {
          "col": "leyenda",          "type": "string",          "length": 80,
          "minLength": 0,          "required": false,          "visible": true,
          "searchable": false,          "label": "Leyenda",          "placeholder": "Ingrese una Leyenda"
        },
        {
          "col": "iso2",          "type": "string",          "length": 2,
          "minLength": 2,          "required": false,          "visible": true,
          "searchable": true,          "label": "Nombre Corto (ISO 2)",          "toUpperLowerCase": true,
          "allowNoEdit": true,          "remote_check": "SELECT count(1) as existe FROM pais WHERE iso2 = ? "
        }
      ]
    }
  ]
}
