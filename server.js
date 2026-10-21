const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5210;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    }
});

const Student = mongoose.model("Student", studentSchema);

// POST: Add student
app.post("/students", async (req, res) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({
                message: "Enter all student details"
            });
        }

        const student = await Student.create({
            name,
            email,
            department
        });

        res.status(201).json({
            message: "Student registered successfully",
            student
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        if (err.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid student details"
            });
        }

        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});

// GET: View all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find().sort({ name: 1 });
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Unable to retrieve students"
        });
    }
});

// DELETE: Remove student
app.delete("/students/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Start only after Atlas connects
async function startServer() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas Connected");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer().catch(err => {
    console.error("Startup failed:", err.message);
    process.exit(1);
});
