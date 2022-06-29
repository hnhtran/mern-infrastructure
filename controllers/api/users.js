const User = require("../../models/user");
const jwt = require("jsonwebtoken"); // this is for create in sign up form
const bcrypt = require("bcrypt"); // this is for login in login form

module.exports = {
  create,
  login,
  checkToken
};

// this function is auto filled by copilot
// async function login (req, res) {
//   try {
//     // Find the user by email
//     const user = await User.findOne({ email: req.body.email });
//     // If the user is not found, return a 401
//     if (!user) return res.status(401).json({ message: "Bad credentials" });
//     // Compare the password with the hashed password in the database
//     const passwordMatch = await bcrypt.compare(req.body.password, user.password);
//     // If the password does not match, return a 401
//     if (!passwordMatch) return res.status(401).json({ message: "Bad credentials" });
//     // Create a JWT
//     const token = createJWT(user);
//     // Send the token back to the client
//     res.json(token);
//   } catch (err) {
//     res.status(400).json(`error: ${err}`);
//   }
// }

// this function is from class
async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

async function create(req, res) {
  // Baby step...
  // res.json({
  //   user: {
  //     name: req.body.name,
  //     email: req.body.email
  //   }
  // });
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

// checkToken function
function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}
