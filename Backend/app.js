/***** Configurando el puerto de escucha *****/
process.env.port = 4000;

/***** Importando paquetes necesarios para crear el servidor HTTPS *****/
const express = require("express");
const cors = require('cors');
const https = require("https");

/***** Importando paquete para lectura de archivos *****/
const fs = require("fs");

/***** Importa Sequelize para la implementación de la persistencia *****/
const { Sequelize } = require('sequelize');

/***** Creando aplicación con Express, CORS, y JSON *****/
const app = express();
app.use(cors());
app.use(express.json());

/***** Configuración de Sequelize con la base de datos *****/
const sequelize = new Sequelize('controlInventario2', 'backend', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

/***** Importando funciones para aplicar los métodos HTTP *****/
const activosRouter = require("./Routers/activosRouter.js");
const responsablesRouter = require('./Routers/responsablesRouter');
const ubicacionesRouter = require('./Routers/ubicacionesRouter');
const etiquetasRouter = require('./Routers/etiquetasRouter');
const tiposDeActivosRouter = require('./Routers/tiposDeActivosRouter');

/***** Configurar la aplicación para usar los routers de cada recurso *****/
app.use('/activo', activosRouter);
app.use('/responsable', responsablesRouter);
app.use('/ubicacion', ubicacionesRouter);
app.use('/etiqueta', etiquetasRouter);
app.use('/tipoDeActivo', tiposDeActivosRouter);

/***** Obteniendo Llave y Certificado *****/
const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");

/***** Creando Credenciales *****/
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "abc123ABC"
};

/***** Creando servidor HTTPS *****/
const httpsServer = https.createServer(credenciales, app);

/***** Poner al servidor en escucha *****/
httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
    console.log('https://localhost:' + process.env.port);
}).on('error', err => {
    console.log('Error al iniciar el servidor: ', err);
});

/***** Ejecuta las migraciones de Sequelize *****/
sequelize.sync()
.then(() => {
    console.log('Conexión a la base de datos establecida!');
  })
.catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });