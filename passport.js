const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await prisma.user.findUnique({username: username });
            if (!user) return done(null, false, { message: "User not found" });
            if (!await bcrypt.compare(password, user.password)) return done(null, false, { message: "Incorrect password" });
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        done(null, user);
    } catch (error) {
        done(error);
    }
});