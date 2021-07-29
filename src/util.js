export const renderList = (list = [], templateFunction = (x) => x) => list.map((item) => templateFunction(item)).join('\n');
