import { Injectable } from '@nestjs/common';
import { GenericResponse } from '../interfaces/generic-response.interface';

@Injectable()
export class ResponseService {
  success<T>(message: string, data?: T): GenericResponse<T> {
    return {
      message,
      data,
    };
  }

  created<T>(data?: T): GenericResponse<T> {
    return {
      message: 'Created successfully',
      data,
    };
  }

  updated<T>(data?: T): GenericResponse<T> {
    return {
      message: 'Updated successfully',
      data,
    };
  }

  deleted(): GenericResponse<null> {
    return {
      message: 'Deleted successfully',
    };
  }
}
