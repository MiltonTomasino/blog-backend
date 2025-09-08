const router = require("express").Router();
const controller = require("../controllers/blogController");
const { verifyToken } = require("../controllers/utils");

router.get("/", controller.getBlogs);
router.get("/:blogId", controller.getBlog);
router.post("/", controller.createBlog);
router.get("/:blogId/comments", controller.getComments);
router.post("/:blogId/comments", controller.createComment);
router.delete("/:blogId", verifyToken, controller.deleteBlog);

module.exports = router;