class TokenStore {
  public static setToken = (token) => localStorage.setItem('token', token);

  public static getToken = () => localStorage.getItem('token');

  public static clearToken = () => localStorage.removeItem('token');
}

export default TokenStore;
