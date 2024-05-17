import { AnyZodObject } from 'zod';

export const paramsValidator = (data: Record<string, any>, validator: AnyZodObject) => {
  const validated = validator.safeParse(data);

  if(!validated.success) {
    const errorObj: any = {};
    validated.error.issues.forEach(error => errorObj[error.path[0]] = error.message);

    return {
      success: validated.success,
      errors: errorObj,
    };
  }

  return validated;
};
