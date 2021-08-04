const renderList = (list = [], templateFunction = () => '') => list.map((item) => templateFunction(item)).join('\n');

const getRandomInt = (min, max) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.round(Math.random()*(max - min) + min);
};


export {renderList, getRandomInt};
