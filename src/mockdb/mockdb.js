/**
 * * Mock data
 */

export const roles = [
  {
    id: 1,
    name: 'ADMIN',
    permissions: [],
    creation_date: 'today',
  },
];

export const userCategories = [
  {
    id: 1,
    name: 'ESTUDIANTE',
    other: [],
    creation_date: 'today',
  },
  {
    id: 2,
    name: 'COLABORADOR',
    other: [],
    creation_date: 'today',
  },
  {
    id: 3,
    name: 'PROFESIONAL',
    other: [],
    creation_date: 'today',
  },
];

export const eventCategories = [
  {
    id: 1,
    name: 'FESTIVALES',
    other: [],
    creation_date: 'today',
  },
  {
    id: 2,
    name: 'CONFERENCIAS',
    other: [],
    creation_date: 'today',
  },
  {
    id: 3,
    name: 'CONCIERTOS',
    other: [],
    creation_date: 'today',
  },
];

export const persons = [
  {
    id: 1,
    fullName: 'Walter Valdivia Bejarano',
    dni: '48484884',
    address: 'Urb. La Melgar ..',
    creation_date: 'today',
  },
];

export const users = [
  {
    id: 1,
    email: 'walter@gmail.com',
    password: 'no encrypted',
    role_id: 1,
    userCategoryId: 1,
    creation_date: 'today',
  },
];

export const events = [
  {
    id: 1,
    eventTitle: 'CHIMBAMGO',
    eventName: 'Festival Chimbango con las mejores orquestas del momento',
    location: 'Uchumayo AQP...',
    eventDate: 'Viernes 18 de Octubre, 2024',
    eventSchedule: '05:00 PM',
    additionalInformation: 'Llegar con 30 mins de anticipación para evitar ...',
    creation_date: 'today',
    eventCategoryId: 1,
  },
  {
    id: 2,
    eventTitle: 'CUÍDATE DE LA SUNAT',
    eventName: 'Qué buena pregunta con el Dr. José Verona',
    location: 'Canout ...',
    eventDate: 'Viernes 18 de Octubre, 2024',
    eventSchedule: '05:00 PM',
    additionalInformation: 'Llegar con 30 mins de anticipación para evitar ...',
    creation_date: 'today',
    eventCategoryId: 2,
  },
];

export const pre_inscriptions = [];
export const inscriptions = [
  {
    id: '1',
    creation_date: 'today',
    id_user: '1',
  },
];
