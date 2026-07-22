// JWT saving
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Getting JWT from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove JWT from local storage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Save logged in user to local storage
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get logged in user from local storage
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Remove logged in user from local storage once they log out
export const removeUser = () => {
  localStorage.removeItem("user");
};

// Clear everything from local storage after logout
export const clearAuth = () => {
  removeToken();
  removeUser();
};