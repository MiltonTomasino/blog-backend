const router = require("express").Router()
const controller = require("../controllers/userController");

router.post("/", controller.createUser);
router.put("/", controller.addAuthorAuth);
router.delete("/", controller.deleteUser);

module.exports = router;