const Users = require("./users-model");

//custom middleware
function validateUser(user) {
  let errors = [];

  if (!user.lastname || user.lastname.length < 2) {
    errors.push(
      "Please enter a user last name that contains at least 2 characters"
    );
  }

  if (!user.firstname || user.firstname.length < 2) {
    errors.push(
      "Please enter a user first name that contains at least 2 characters"
    );
  }
  if (!user.username || user.username.length < 2) {
    errors.push("Username must contain at least 4 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Password must contain at least 4 characters");
  }

  if (!user.email || user.email.length < 4) {
    errors.push("Email must contain at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "User ID not found." });
      }
    })
    .catch(err => res.status(500).json({ err: "Could not get user'" }));
}


module.exports = {
  validateUser,
  checkDuplicates,
  validateUserId,
  validateRole
};