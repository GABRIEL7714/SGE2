import { events, users } from '../mockdb/mockdb.js';

//Genero recibo del evento
const createInvoice = async () => {
  const message = 'Se ha enviado el comprobante electronico a su correo';
  return message;
};

const findUser = async (userId) => {
  return users.find((user) => user.id === userId);
};
const findEvent = async (eventId) => {
  return events.find((event) => event.id === eventId);
};

//* Gabo de esta forma envias por parametros
export const registerToEvent = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const eventId = parseInt(req.params.eventId);

  const user = await findUser(userId);
  const event = await findEvent(eventId);

  const invoiceMessage = await createInvoice();

  const message =
    'Usted ha sigo registrado para el evento: ' +
    event.eventName +
    ' --- ' +
    user.email +
    '---->' +
    invoiceMessage;

  return res.json(message);
};

//* Gabo de esta forma envias por el cuerpo (body)
// en insomnia pones primero pones POST y luego entre llaves { email: " de email", password: "de password"}
export const envioBody = async (req, res) => {
  const { email, pass } = req.body;
  return res.json(email);
};
