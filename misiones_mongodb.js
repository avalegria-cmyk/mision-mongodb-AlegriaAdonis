// Conexión a la base de datos
const db = connect("mongodb://localhost:27017/bestiario");

// Creación de la colección
db.createCollection("criaturas")

// Inserciones
db.criaturas.insertOne({
  "nombre": "Dragón de Fuego",
  "habitat": "Montañas Volcánicas",
  "nivel_peligro": 10,
  "dieta": ["rocas", "caballeros"],
  "habilidades": ["vuelo", "aliento de fuego", "garras afiladas"],
  "descubierto_por": "Eldrin el Valiente"
})

db.criaturas.insertMany([
  {
    "nombre": "Sirena de los Mares",
    "habitat": "Océano Azul",
    "nivel_peligro": 7,
    "habilidades": ["canto hipnótico", "nado veloz"],
    "dieta": ["peces", "algas"]
  },
  {
    "nombre": "Gólem de Piedra",
    "habitat": "Cuevas Antiguas",
    "nivel_peligro": 8,
    "estadisticas": { "ataque": 12, "defensa": 15 },
    "dieta": ["minerales"]
  },
  {
    "nombre": "Fénix Dorado",
    "habitat": "Cumbres Sagradas",
    "nivel_peligro": 9,
    "habilidades": ["renacer", "alas de fuego"],
    "descubierto_por": "Sacerdotisa Aria"
  },
  {
    "nombre": "Duende del Bosque",
    "habitat": "Bosque Encantado",
    "nivel_peligro": 5,
    "habilidades": ["camuflaje", "travesuras", "velocidad"],
    "dieta": ["frutas", "hojas"]
  }
])


// Funciones del CRUD

// Mostrar
db.criaturas.find()

// Mostrar habitad especifico
db.criaturas.find({ "habitat": "Bosque Encantado" })

// Mostrar nivel mayor a 8 
db.criaturas.find({ "nivel_peligro": { $gt: 8 } })
