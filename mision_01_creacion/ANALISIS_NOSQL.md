# Análisis NoSQL: El Manuscrito del Cronista

## NoSQL vs SQL
El modelo de documentos que utiliza MongoDB resulta más adecuado para el proyecto del Bestiario Digital debido a su capacidad para manejar datos semi-estructurados y su flexibilidad de esquema.  
En una base de datos relacional (SQL), cada registro debe seguir un formato fijo con columnas y tipos de datos predefinidos, lo que limita la representación de información variada.  
En cambio, en MongoDB cada documento puede tener diferentes campos, tipos de datos y estructuras internas, lo que facilita almacenar criaturas con atributos únicos, como habilidades especiales, hábitats personalizados o estadísticas anidadas.  
Esta flexibilidad permite representar de forma más natural la diversidad de las criaturas fantásticas sin necesidad de realizar cambios en la estructura de la base de datos o migraciones de tablas.

## Tipos de NoSQL
MongoDB pertenece al tipo de bases de datos orientadas a documentos, pero existen otros modelos dentro del ecosistema NoSQL.

  **Bases de datos Clave-Valor:** almacenan datos mediante pares clave-valor. Son rápidas y eficientes.  
  Ejemplo: Redis o Amazon DynamoDB.  
  Escenario de uso: almacenamiento temporal de sesiones de usuario o caché en aplicaciones web o videojuegos, donde se requiere acceso rápido a datos específicos.

  **Bases de datos de Grafos:** diseñadas para representar relaciones entre entidades mediante nodos y aristas.  
  Ejemplo: Neo4j.  
  Escenario de uso: redes sociales que analicen conexiones entre usuarios, amigos o grupos.

## Casos de Estudio
Un caso real de aplicación de MongoDB es la plataforma de comercio electrónico eBay, la cual utiliza esta base de datos para almacenar catálogos de productos y metadatos relacionados con las publicaciones.  
MongoDB fue una elección acertada para esta empresa debido a su capacidad de manejar grandes volúmenes de información con estructuras variables. En eBay, cada producto puede tener distintos atributos, categorías y descripciones, lo que hace que un modelo relacional sea menos eficiente.  
Gracias al uso de MongoDB, la plataforma puede escalar horizontalmente, realizar consultas más ágiles y mantener la flexibilidad necesaria para representar millones de registros sin un esquema rígido.
