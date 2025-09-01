const router = require("express").Router();
const controller = require("../controllers/blogController");

router.get("/", controller.getBlogs);
router.post("/", controller.createBlog);
router.get("/:blogId/comments", controller.getComments);
router.post("/:blogId/comments", controller.createComment);

module.exports = router;