export const isUserAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};
