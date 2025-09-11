const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.getBlogs = async (req, res) => {
    
    if (!req.cookies.token) res.redirect("http://localhost:3001/login")

    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const skip = (page - 1) * pageSize;

        const blogs = await prisma.post.findMany({
            skip: skip,
            take: pageSize,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                comments: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    }
                },
                user: {
                    select: {
                        username: true,
                    }
                }
            },
        });    
        res.json(blogs)
    } catch (error) {
        console.error("Error retrieving blogs: ", error);
        res.status(500).json({ error: "Failed to fetch blogs" });
    }
}

module.exports.getBlog = async (req, res) => {
    try {
        const blogId = parseInt(req.params.blogId);
        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            }
        });

        if (!blog) return res.status(404).json({ error: "Blog post not found" });

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching specific blog post");
        res.status(500).json({ error: "Error fetching specific blog post" });
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
        console.log("req", req.body);
        
        const { userId, title, content } = req.body;

        const blog = await prisma.post.create({
            data: {
                userId: parseInt(userId),
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
        const commenterId = req.user.id
        console.log("Body: ", req.body);
        
        const { comment } = req.body;
        await prisma.comment.create({
            data: {
                postId: postId,
                commenterId: commenterId,
                text: comment
            }
        });
        res.redirect("http://localhost:3001/")
        // res.status(200).json({ message: "Succeffully added comment to blog post" });
    } catch (error) {
        console.error("Error creating comment: ", error);
        res.status(500).json("There was an error trying to add comment to blog post");
    }
}

module.exports.deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.params;

        if (req.user.role !== "AUTHOR") {
            return res.status(403).json({ error: "User is not authorized to delete blog post." });
        }

        await prisma.post.delete({
            where: {
                id: parseInt(blogId)
            }
        });
        res.status(200).json({ message: "Successfully deleted blog post."})
    } catch (error) {
        console.error("Error deleting blog post: ", error);
        res.status(500).json({ error: "There was an error trying to delete blog post." });
        
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        
        if (req.user.role !== "AUTHOR") {
            return res.status(403).json({ error: "User is not authorized to delete blog post." });
        }

        await prisma.comment.delete({
            where: {
                id: parseInt(commentId),
            }
        })
        res.status(200).json({ message: "Successfully deleted comment."})
    } catch (error) {
        console.error("Error deleting comment: ", error);
        res.status(500).json({ message: "There was an error deleting message." })
        
    }
}



