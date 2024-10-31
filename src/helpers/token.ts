const tokenKey = 'todolistapp_token';

export const saveTokenToLocalStorage = (token: string) => {
    console.log('first')
  localStorage.setItem(tokenKey, token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(tokenKey);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(tokenKey);
};

