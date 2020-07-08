import * as _ from 'lodash';

const removeCurlyBraces = (stringToRemoveBracesFrom: string): string => {
  return stringToRemoveBracesFrom.replace(/{/g, '').replace(/}/g, '');
};

const formatClassName = (classNameToFormat: string): string => {
  return _.capitalize(classNameToFormat.replace('-', ''));
};

export { removeCurlyBraces, formatClassName };
