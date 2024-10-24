/* Librerias propias de Node */
import express from 'express';
import cors from 'cors';

/* Fin Librerias propias de Node */
import setTZ from 'set-tz';

//Seteando la configuracion de zona horaria
setTZ('America/Lima');

/* Importando las rutas creadas */
import usersRoutes from './routes/users.routes.js';
import inscriptionsRoutes from './routes/inscriptions.routes.js';
import logInRoutes from './routes/logIn.routes.js';
import eventsRoutes from './routes/events.routes.js';

/* Fin Importando rutas creadas */

const app = express();

app.use(cors());
//Paso esta funcion para que express entienda cuando se le envia un Json, limit sirve para evitar el error too large (413)
app.use(express.json({ limit: '50mb' }));

/* *********** MUY IMPORTANTE DEFINIRLO ANTES DE LLAMAR A LAS RUTAS PARA HABILITAR EL CORS */
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.set('Access-Control-Allow-Origin', '*');

/*  Se le indica al servidor que quiero utilizar  todas las rutas que contiene el archivo */
app.use(usersRoutes);
app.use(inscriptionsRoutes);
app.use(logInRoutes);
app.use(eventsRoutes);

export default app;
