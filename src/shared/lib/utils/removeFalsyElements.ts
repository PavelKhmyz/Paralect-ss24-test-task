export const removeFalsyElement = (object: Record<string, any>) => {
  const newObject: Record<string, any> = {};

  Object.keys(object).forEach(key => {
    if (object[key]) {
      if(typeof object[key] === 'object') {
        if(Array.isArray(object[key])) {
          object[key].length ? newObject[key] = object[key] : undefined;
        } else {
          Object.keys(object[key]).length ? newObject[key] = removeFalsyElement(object[key]) : undefined;
        }
      } else {
        newObject[key] = object[key];
      }
    }
  });

  return newObject;
};
