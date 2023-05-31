export const createFormData = (inputs) => {
  return [...inputs].reduce((acc, cur) => {
    acc[cur.name] = cur.value;
    return acc;
  }, {});
};
export const createFormDataUpperCase = (inputs) => {
  return [...inputs].reduce((acc, cur) => {
    acc[cur.name] = cur.value[0].toUpperCase() + cur.value.slice(1);
    return acc;
  }, {});
};
