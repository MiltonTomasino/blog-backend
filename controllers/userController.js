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

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user.", error);
        res.status(500).json({ error: "There was an error trying to create a user."});
    }
}

