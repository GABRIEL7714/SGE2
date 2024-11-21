//configuracion de la base de datos
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nqlngccesbkoxgrqckxb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xbG5nY2Nlc2Jrb3hncnFja3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3Mjc1OTEsImV4cCI6MjA0NzMwMzU5MX0.bQwxL-NPtcYf4IrMeE7Eaz66NAGH-E1OI4EiDuQpcWo"; // Reemplaza con tu clave de API de Supabase

const pool = createClient(supabaseUrl, supabaseKey);

export default pool;
