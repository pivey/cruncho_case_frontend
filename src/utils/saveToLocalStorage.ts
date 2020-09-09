const saveToLocalStorage = (storeId: string, data: any) =>
  localStorage.setItem(storeId, JSON.stringify(data));

export default saveToLocalStorage;
