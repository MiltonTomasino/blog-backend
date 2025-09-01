const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.getBlogs = async (req, res) => {
    try {
        const blogs = await prisma.post.findMany();
        res.json(blogs)
    } catch (error) {
        console.error("Error retrieving blogs: ", error);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
}

module.exports.getComments = async (req, res) => {
    try {
        const { blogId } = req.params;

        const comments = await prisma.comment.findMany({
            where: {
                postId: parseInt(blogId)
            }
        });
        res.json(comments)
    } catch (error) {
        console.error("Error fetching comments for blog: ", error);
        res.status(500).json("Error fetching comments");
    }

}

module.exports.createBlog = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        const blog = await prisma.post.create({
            data: {
                userId: userId,
                title: title,
                content: content
            }
        });

        res.json(blog)
    } catch (error) {
        console.error("Error creating blog post: ", error);
        res.status(500).json({ error: "There was an error creating post."});
    }
}



