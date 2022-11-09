const setCache = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const getCache = (key) => {
  // obj => string => obj
  const value = window.localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
};

const deleteCache = (key) => {
  window.localStorage.removeItem(key);
};

const clearCache = () => {
  window.localStorage.clear();
};


export { setCache, getCache, deleteCache, clearCache };
