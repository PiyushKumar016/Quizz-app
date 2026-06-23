import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../../controllers/quiz-controller.js";

const router = express.Router();

router.post("/create", createQuiz);
router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);
router.post("/submit", submitQuiz);
router.put("/update/:id", updateQuiz);
router.delete("/delete/:id", deleteQuiz);

export default router;