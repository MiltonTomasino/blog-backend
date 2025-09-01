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

        res.status(200).json(blog)
    } catch (error) {
        console.error("Error creating blog post: ", error);
        res.status(500).json({ error: "There was an error creating post."});
    }
}

module.exports.createComment = async (req, res) => {
    try {
        const postId = parseInt(req.params.blogId);
        const { commenterId, text } = req.body;
        await prisma.comment.create({
            data: {
                postId: postId,
                commenterId: commenterId,
                text: text
            }
        });
        res.status(200).json({ message: "Succeffully added comment to blog post" });
    } catch (error) {
        console.error("Error creating comment");
        res.status(500).json("There was an error trying to add comment to blog post");
    }
}



