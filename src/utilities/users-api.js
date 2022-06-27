// This is the base path of the Express route we'll define
const BASE_URL = "/api/users";

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });
  // check if request was successful
  if (response.ok) {
    // res.json() will resolve to the JWT
    return response.json();
  } else {
    throw new Error('Invalid Sign Up');
  }
}
