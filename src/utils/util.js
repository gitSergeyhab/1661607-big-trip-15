const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');


const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};

const getNotImplementedError = (method) => {
  throw new Error(`Abstract method not implemented: ${method}`);
};


export {renderList, getRandomInt, getNotImplementedError};
