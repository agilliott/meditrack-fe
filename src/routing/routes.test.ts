import {
  PATH_TRACKER,
  PATH_ANALYSE,
  PATH_MEDICATION,
  PATH_PROFILE,
  routeKeyMap,
} from './routes';

describe('routeKeyMap', () => {
  it.each`
    key                | number
    ${PATH_TRACKER}    | ${0}
    ${PATH_ANALYSE}    | ${1}
    ${PATH_MEDICATION} | ${2}
    ${PATH_PROFILE}    | ${3}
  `('It outputs $number when passed in $key', ({ key, number }) => {
    expect(routeKeyMap[key]).toBe(number);
  });
});
