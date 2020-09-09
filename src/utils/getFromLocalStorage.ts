const getFromLocalStorage = (target: string) =>
  JSON.parse(localStorage.getItem(target)!);

export default getFromLocalStorage;
