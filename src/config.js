import { config } from "dotenv";
//Funcion propia de dotenv, para poder leer variables de entorno

config();

// Defino el puerto local o sino el 4000 para que corra localmente
export const PORT = process.env.PORT || "5000";
