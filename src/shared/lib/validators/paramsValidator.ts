import { AnyZodObject } from 'zod';

interface IParamsValidator<T> {
  success: boolean;
  errors?: Record<string, string>;
  data?: T;
}

export const paramsValidator = <T>(data: Record<string, any>, validator: AnyZodObject): IParamsValidator<T> => {
  const validated = validator.safeParse(data);

  if(!validated.success) {
    const errorObj: Record<string, string> = {};
    validated.error.issues.forEach(error => errorObj[error.path[0]] = error.message);

    return {
      success: validated.success,
      errors: errorObj,
    };
  }

  return validated as { success: boolean; data: T };
};
