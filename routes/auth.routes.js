const { signUp, signin } = require("../controllers/auth.controller")
const { verifySignUpRequset, verifySignInRequset } = require("../middlewares/auth.middleware")

module.exports = function (app) {
    app.post("/mba/api/v1/auth/signup", [verifySignUpRequset], signUp)
    app.post("/mba/api/v1/auth/signin", [verifySignInRequset], signin)
}