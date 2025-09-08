const router = require("express").Router()
const controller = require("../controllers/userController");
const { verifyToken } = require("../controllers/utils");



router.post("/", controller.createUser);
router.put("/", controller.addAuthorAuth);
router.delete("/", controller.deleteUser);
router.post("/login", controller.loginUser);
router.get("/check", controller.checkAuth);
router.post("/logout", controller.logOutUser);

module.exports = router;