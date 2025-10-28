# Misión 2: Validación y Relaciones en MongoDB

Esta misión consiste en **implementar validaciones de esquema (JSON Schema)** directamente en MongoDB para asegurar la integridad de los datos.
Además, se establecen **relaciones embebidas y referenciadas** entre guardianes y criaturas.

---

## Estructura de archivos

```
/mision_02_validacion/
│
├── 01_definicion_guardianes.mongodb   # Creación de colección guardianes con validador JSON Schema
├── 02_definicion_criaturas.mongodb    # Creación de colección criaturas con validador y referencia a guardianes
├── 03_pruebas_insercion.mongodb       # Inserciones válidas e inválidas para probar reglas
├── drop.mongodb                       # Script de limpieza de colecciones
├── query.mongodb                      # Consultas para verificar inserciones y relaciones
└── ANALISIS_VALIDACION.md             # Explicación teórica de las relaciones y validaciones
```

---

## Descripción breve de los scripts

### 01_definicion_guardianes.mongodb

Define la estructura y validaciones que debe cumplir cada guardián dentro de la base de datos.

**Elementos del JSON Schema utilizados:**

- **bsonType:** especifica el tipo de dato que se espera en cada campo, como texto o número entero.
  Evita que se ingresen valores del tipo incorrecto, por ejemplo, números en lugar de texto.

- **required:** define los campos obligatorios que deben existir en cada documento.
  Si falta alguno, MongoDB rechaza la inserción.

- **properties:** contiene las reglas individuales para cada campo. Aquí se definen los tipos de datos, límites, y descripciones.

- **enum:** restringe los valores posibles para un campo a una lista predefinida.
  Por ejemplo, el campo “rango” solo puede ser “Aprendiz”, “Maestro” o “Gran Maestro”.
  Esto asegura que los valores sean consistentes y controlados.

- **pattern:** utiliza una expresión regular para validar cadenas de texto.
  En este caso, garantiza que la contraseña contenga al menos una letra mayúscula, un número y una longitud mínima de 8 caracteres.

- **minimum y maximum:** establecen límites numéricos permitidos.
  En el campo “nivel”, se usa para aceptar solo valores entre 1 y 99, evitando datos fuera de rango.

- **arrays:** define campos que almacenan listas, como el inventario.
  Se asegura que cada elemento dentro del arreglo tenga los campos correctos (nombre_item y cantidad) y que la cantidad sea positiva.

Estas validaciones garantizan que cada guardián tenga datos coherentes y cumpla con los requisitos definidos.

---

### 02_definicion_criaturas.mongodb

Define la colección de criaturas, incluyendo las validaciones específicas y su relación con la colección de guardianes.

**Elementos del JSON Schema utilizados:**

- **required:** establece los campos que no pueden faltar al crear una criatura, como nombre, hábitat, nivel de peligro, habilidades y el identificador del guardián.

- **bsonType:** determina el tipo de datos que se deben usar, por ejemplo, booleano para “es_legendaria”, entero para “nivel_peligro” y objectId para “id_guardian”.

- **enum:** controla los valores posibles dentro del campo “salud” de la ficha veterinaria.
  Solo se permiten los valores “Óptima”, “Regular” o “Crítica”.

- **minItems:** define la cantidad mínima de elementos que puede contener un arreglo.
  En “habilidades”, se utiliza para asegurar que cada criatura tenga al menos una habilidad registrada.

- **uniqueItems:** impide que los valores dentro de un arreglo se repitan, garantizando que una criatura no tenga habilidades duplicadas.

- **subdocumentos embebidos:** permiten incluir objetos dentro del documento principal.
  La ficha veterinaria se guarda directamente dentro del documento de la criatura, incluyendo su salud y la fecha de última revisión.

- **referencias:** el campo “id_guardian” almacena el identificador de un guardián, conectando ambas colecciones.
  Esto implementa una relación 1-a-N, donde un guardián puede cuidar varias criaturas.

Estas validaciones aseguran que los datos de las criaturas sean precisos y que cada una esté correctamente vinculada a su guardián.

---

### 03_pruebas_insercion.mongodb

Contiene los ejemplos de inserciones válidas e inválidas:

- Las inserciones válidas demuestran que los documentos correctos son aceptados.
- Las inserciones inválidas prueban los casos en los que los datos no cumplen con las validaciones, asegurando que MongoDB los rechace.
- Los comentarios en el archivo explican la causa de cada validación fallida.

---

### drop.mongodb

Elimina las colecciones previas antes de aplicar las validaciones.
De esta forma se asegura que las nuevas estructuras se creen correctamente sin datos anteriores en conflicto.

---

### query.mongodb

Permite realizar consultas para verificar el contenido de las colecciones, revisando que los datos insertados cumplan con las reglas establecidas.

---

### ANALISIS_VALIDACION.md

Documento teórico con las respuestas a tres preguntas principales:

1. Por qué validar en la base de datos y no solo en el backend.
2. Cuándo usar relaciones embebidas y cuándo usar relaciones referenciadas.
3. Justificación del modelo entre guardianes y criaturas según el diseño aplicado.

---

## Cómo ejecutar

1. Conéctate a tu base MongoDB Atlas o local.
   ```js
   use('bestiario')
   ```

2. Ejecuta los scripts en este orden:
   ```js
   load('01_definicion_guardianes.mongodb')
   load('02_definicion_criaturas.mongodb')
   load('03_pruebas_insercion.mongodb')
   ```

3. Verifica los documentos insertados:
   ```js
   db.guardianes.find()
   db.criaturas.find()
   ```

4. Si cuenta con la instalacion y conexion a una BDD de mongo configurada la conexcion con MongoAtlas (Docente y compañeros)
  Abra la carpeta en un VS Code y relice la conexion al cluster y ejecute en orden los archivos.
---

## Relaciones implementadas

| Relación | Tipo | Descripción |
|-----------|------|--------------|
| Guardián → Inventario | Embebida | El inventario pertenece directamente al guardián |
| Criatura → Ficha veterinaria | Embebida | Información médica asociada a la criatura |
| Guardián → Criaturas | Referenciada | Cada criatura pertenece a un guardián mediante `id_guardian` |

---

## Objetivo final

Garantizar que MongoDB actúe como **primer filtro de integridad** para evitar:

- Contraseñas débiles.
- Rangos inexistentes.
- Criaturas sin ficha médica o guardianes inválidos.

---

## Ejemplos de Commits Semánticos

| Tipo | Ejemplo | Descripción |
|------|----------|-------------|
| **feat:** | `feat: agrega schema de guardianes con validaciones de nivel y password` | Nueva funcionalidad |
| **fix:** | `fix: corrige regex de password para requerir número y mayúscula` | Corrección de error |
| **docs:** | `docs: completa análisis de relaciones y validación en ANALISIS_VALIDACION.md` | Documentación |
| **refactor:** | `refactor: mejora estructura del inventario en guardianes` | Reorganización sin cambio funcional |
| **test:** | `test: añade pruebas de inserciones inválidas en guardianes` | Pruebas unitarias o validaciones |

---

## Autor

**Adonis Alegría**
Estudiante de Ingeniería en Tecnologías de la Información
Universidad de las Fuerzas Armadas — ESPE
