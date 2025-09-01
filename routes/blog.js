const router = require("express").Router();
const controller = require("../controllers/blogController");

router.get("/blog", controller.getBlogs);
router.post("/blog", controller.createBlog);
router.get("/blog/:blogId/comments", controller.getComments);

module.exports = router;