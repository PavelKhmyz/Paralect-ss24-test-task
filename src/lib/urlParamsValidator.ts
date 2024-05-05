import { AnyZodObject } from 'zod';

export const urlParamsValidator = async (url: string, validator: AnyZodObject) => {
  const { searchParams } = new URL(url);

  try {
    return await validator.parseAsync({
      ...Object.fromEntries(searchParams),
    })
  } catch (error) {
    throw error
  }
}
