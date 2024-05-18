export const removeFalsyElement = (object: Record<string, any>) => {
  const newObject: Record<string, any> = {};

  Object.keys(object).forEach(key => {
    if (object[key]) {
      if(typeof object[key] === 'object') {
        if(object[key].length > 0) {
          newObject[key] = object[key];
        }
      } else {
        newObject[key] = object[key];
      }
    }
  });

  return newObject;
};
