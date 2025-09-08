const router = require("express").Router();
const controller = require("../controllers/blogController");
const { verifyToken, isAuthor } = require("../controllers/utils");

router.get("/",verifyToken, isAuthor, controller.getBlogs);
router.get("/:blogId",verifyToken, isAuthor, controller.getBlog);
router.post("/", verifyToken, isAuthor, controller.createBlog);
router.get("/:blogId/comments", verifyToken, isAuthor, controller.getComments);
router.post("/:blogId/comments", verifyToken, isAuthor, controller.createComment);
router.delete("/:blogId", verifyToken, isAuthor, controller.deleteBlog);

module.exports = router;