# El Manuscrito del Guardián (Análisis Teórico)

## Validación en Base de Datos vs. Backend

Implementar validación de datos directamente en la base de datos (con JSON Schema) es una de las decisiones más inteligentes en términos de integridad y seguridad.  
Aunque el backend también puede validar, depender únicamente del código deja un punto débil: si otro servicio, usuario o importador de datos se salta el backend, podría insertar información corrupta directamente en la base.

Con el validador de MongoDB:
- La base rechaza automáticamente cualquier documento que no cumpla las reglas del esquema.
- Aseguramos que todos los datos (vengan del backend, scripts o consola) cumplan con las mismas normas.
- Se refuerza la seguridad desde la raíz: incluso si el backend falla, Mongo actúa como filtro de integridad.

En resumen:  
Validar en la base de datos garantiza que los datos incorrectos nunca entren, sin importar desde dónde los intenten insertar.

---

## Relación 1-a-1: ficha_veterinaria (Embebida)

Cada criatura tiene una ficha veterinaria con su estado de salud y fecha de revisión.  
Modelarla como subdocumento embebido dentro de la criatura fue la mejor decisión porque:

- La ficha solo tiene sentido junto con la criatura.  
  No existe una “ficha” por sí sola dentro del sistema del bestiario.
- Siempre se consulta al mismo tiempo que la criatura.  
  Por ejemplo: al mostrar detalles de una criatura, también se muestra su salud y última revisión.
- Mantiene el documento compacto y fácil de leer.

Cuándo sería mejor hacerla referenciada:
- Si la ficha tuviera un historial médico extenso (varias revisiones o registros).
- Si múltiples sistemas distintos actualizaran la ficha de forma independiente.
- Si se necesitara llevar versiones o auditorías de cada ficha.

Conclusión:  
Se embebe porque es información unida a la criatura. Se referenciaría solo si creciera demasiado o requiriera independencia de acceso.

---

## Relaciones 1-a-N

En esta misión se implementaron dos tipos de relaciones 1-a-N, cada una pensada para el tipo de dato y su uso.

### 1. Guardián → Inventario (Embebida)

El inventario está dentro del documento del guardián.  
Cada ítem tiene nombre_item y cantidad.

Justificación:
- El inventario solo tiene sentido si el guardián existe.  
  Si el guardián es eliminado, su inventario también debe desaparecer.
- Siempre se consulta junto al guardián (por ejemplo, al ver su perfil).
- Es información pequeña y muy relacionada con su dueño.
- Evita consultas adicionales o joins innecesarios.

En resumen:  
Embebido porque el inventario es parte del estado actual del guardián, no un conjunto de datos independientes.

### 2. Guardián → Criaturas (Referenciada)

Las criaturas están en su propia colección, con un campo id_guardian que guarda la referencia al _id del guardián.

Justificación:
- Cada criatura es una entidad importante e independiente.  
  Tiene nombre, hábitat, ficha veterinaria y nivel de peligro.
- Un guardián puede tener muchas criaturas. Si se embebieran todas, su documento sería demasiado grande.
- A veces se necesita consultar criaturas por otras condiciones (por ejemplo, todas las legendarias con nivel_peligro > 8), sin importar el guardián.
- Permite cambiar el guardián fácilmente actualizando solo id_guardian, sin mover documentos completos.

En resumen:  
Referenciada porque las criaturas son objetos grandes, vivos y consultables por separado, mientras que el guardián solo las administra.

---

## Conclusión General

El diseño de esta misión aplica los principios fundamentales de modelado de MongoDB:

- Validaciones sólidas: el uso de $jsonSchema asegura la calidad de datos desde la base.  
- Relaciones embebidas: para datos pequeños, dependientes y que siempre se leen juntos.  
- Relaciones referenciadas: para entidades grandes, con identidad propia y consultas independientes.

En conjunto, el sistema logra un equilibrio adecuado entre integridad, eficiencia y flexibilidad.  
De esta forma, el bestiario se mantiene ordenado, coherente y libre de datos corruptos.
