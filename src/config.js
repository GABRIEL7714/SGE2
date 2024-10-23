import { config } from 'dotenv';
//Funcion propia de dotenv, para poder leer variables de entorno

config();
//process es un objeto global de node, env almacena todas las variables de mi pc

// Railway Connection URL
export const RAILWAY_CONNECTION_URL =
  'postgresql://postgres:wcyACvclOLktsSHEYlYlPvrLrtFhguFs@junction.proxy.rlwy.net:36400/railway';

// Defino el puerto local o sino el 4000 para que corra localmente
export const PORT = process.env.PORT || '5000';
