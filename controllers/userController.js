const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function generatePassword(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error("Error hashing password: ", error);
        throw new Error("Password hashing failed");
    }
}

async function validatePassword(password, storedPassword) {
    try {
        return await bcrypt.compare(password, storedPassword);
    } catch (error) {
        console.error("Error comparing password: ", error);
        throw new Error("Password comparison failed");
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await generatePassword(password);

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUser) {
            return res.status(401).json({ error: "User already exists. Try again." });
        }

        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: `User created successfully ${user}` });
    } catch (error) {
        console.error("Error creating user.", error);
        res.status(500).json({ error: "There was an error trying to create a user."});
    }
}

module.exports.addAuthorAuth = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await prisma.user.update({
            where: {
                username: username,
            },
            data: {
                role: "AUTHOR"
            }
        })
        console.log(user);
        res.status(200).json({ message: "Successfully updated user to Author." })
    } catch (error) {
        console.error("Error upgrading user to Author");
        res.status(500).json({ error: "Error upgrading user to Author." });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.body;

        await prisma.user.delete({
            where: {
                username: username
            }
        });

        res.status(200).json({ message: "Successfully deleted user." });

    } catch (error) {
        console.error("Error deleting using");
        res.status(500).json({ error: "There was an error when trying to delete user." });
        
    }
}
