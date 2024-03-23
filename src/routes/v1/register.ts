import { randomUUID } from "crypto";
import express from "express";
import RegisterConfig from "../../models/RegisterConfig";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const token = randomUUID();
        const email = req.body.email;
        const version = new Date().getFullYear();
        const role = req.body.role;
        const user = await RegisterConfig.findOne({ email, version, role });
        const userToken = btoa(token).substring(0, 10);

        if (user) {
            console.log("User already exists");
            res.json({ message: "User already present" });
        } else {
            const newUser = new RegisterConfig({
                ...req.body,
                token: userToken,
                version,
            });
            newUser
                .save()
                .then((savedUser) => {
                    console.log("User saved successfully:", savedUser);
                    res.json({ message: "User added successfully" });
                })
                .catch((error) => {
                    console.error("Error saving user:", error);
                    res.json({
                        message: "Please check the params sent, User not created",
                    });
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ message: "Error" });
    }
});

export default router;
