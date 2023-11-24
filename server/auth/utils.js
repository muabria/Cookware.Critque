const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//<--------------------------------AUTHORIZATION MIDDLEWARE-------------------------------->
const authMiddleware = async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await prisma.user.findUnique({
          where: {
            id
          }
        });
        next();
      } else {
        next({
          name: 'AuthorizationHeaderError',
          message: 'Authorization token malformed',
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
};

//<--------------------------------NO USER ERROR-------------------------------->
//If there is no user in a required user action, send error.
const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).send("Sorry, you need an account to do that. Please sign up first")
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (req.user?.isAdmin === true) {
    next();
  } else {
    res.status(401).send("Sorry, you're not an admin.")
  }
};


module.exports = {
  requireUser,
  requireAdmin,
  authMiddleware
}
