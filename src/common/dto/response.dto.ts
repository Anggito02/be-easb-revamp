export class ResponseDto<T = any> {
  status: string;
  message: string;
  data?: T;
}