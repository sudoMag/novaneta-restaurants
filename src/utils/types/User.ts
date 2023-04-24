export default interface User {
  name: string;
  email: string;
  password: string;
  commune?: string;
  rut?: string;
  plan?: string;
  phone: string;
  location?: string;
}
