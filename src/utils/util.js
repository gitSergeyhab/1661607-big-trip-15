const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');


const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};

const getNotImplementedError = (method) => {
  throw new Error(`Abstract method not implemented: ${method}`);
};

const updateItem = (points, updatePoint) => {
  const index = points.findIndex((point) => point.id === updatePoint.id);
  return index === -1 ? points : [...points.slice(0, index), updatePoint, ...points.slice(index + 1)];
};


export {renderList, getRandomInt, getNotImplementedError, updateItem};
