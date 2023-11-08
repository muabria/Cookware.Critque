const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  
const requireUser = (req, res, next) => {
    if(!req.user) {
        res.status(401).send("Sorry, you need an account to do that.")
    }
    next();
};

module.exports = {
requireUser,
authMiddleware
}
