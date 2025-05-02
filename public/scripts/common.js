const getCallbackURI = () => {
  return `http://localhost:4000/auth?from=${window.location.pathname}`;
};

export const getLoginPath = () => {
  return `http://localhost:3000/login?clientId=fdb8bf1e-df99-11ef-91a1-04d4c4150c55&callbackUri=${getCallbackURI()}`;
};
