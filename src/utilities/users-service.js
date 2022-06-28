// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from 
import * as usersAPI from './users-api';

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  // Baby step by returning whatever is sent back by the server
  // return token;
  // Persist the "token"
  localStorage.setItem('token', token);
  return getUser()
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser()
}

export function getToken() {
  // getItems returns null if theres no string
  const token = localStorage.getItem('token');
  if(!token) return null
  // obtain the payload of the token
  const payload = JSON.parse(atob(token.split('.')[1]))
  // A JWT's expiry is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null
  }
  return token
}

export function getUser() {
  const token = getToken();
  // if there is a token, get the user payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function logOut() {
  localStorage.removeItem('token');
}