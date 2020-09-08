const saveToLocalStorage = (storeId, data) =>
  localStorage.setItem(storeId, JSON.stringify(data));

export default saveToLocalStorage;
