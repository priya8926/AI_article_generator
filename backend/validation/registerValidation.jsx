const { z } = require("zod")

const registerValidation = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, "Username must be atleast 3 character")
        .max(255, "username must not be more than 255 character"),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({message : "Invalid email address"})
        .min(3, "Email must be atleast 3 character")
        .max(255, "Email must not be more than 255 character"),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, "Phone number must be atleast 10 character")
        .max(20, "Phone number must not be more than 20 character"),
    password: z
        .string({ required_error: "Passwrdd is required" })
        .min(7, "Password must be atleast 7 character")
        .max(30, "Password must not be more than 30 character"),
})
module.exports = registerValidation;