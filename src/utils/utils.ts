export function makeQueryString(queryObj) {
  return Object.keys(queryObj)
    .reduce((queryArr, key) => {
      if (!!!queryObj[key]) return queryArr;
      queryArr.push(`${key}=${encodeURIComponent(queryObj[key])}`);
      return queryArr;
    }, [] as any[])
    .join('&');
}
