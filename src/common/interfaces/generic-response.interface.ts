export interface GenericResponse<T = any> {
  message: string;
  data?: T;
}
