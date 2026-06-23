import { QuizModel } from "../models/quiz-model.js";
import { QuestionModel } from "../models/question-model.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions, duration } = req.body;

    const createdQuestions = await QuestionModel.insertMany(questions);
    const questionIds = createdQuestions.map((q) => q._id);

    const newQuiz = await QuizModel.create({
      title,
      description,
      duration,
      questions: questionIds,
    });

    res.status(201).json({ message: "Quiz created", quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizModel.find().select("-questions").lean();
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id).populate("questions");

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    
    const questionIds = answers.map((a) => a.questionId);
    const questions = await QuestionModel.find({ _id: { $in: questionIds } });

    let score = 0;

    for (const { questionId, selectedIndex } of answers) {
      if (selectedIndex < 0) continue;

      const question = questions.find((q) => q._id.toString() === questionId);

      if (question && question.correctAnswerIndex === selectedIndex) {
        score++;
      }
    }

    res.status(200).json({
      message: "Quiz submitted",
      score,
      total: answers.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;

    const updatedQuestionIds = [];

    for (const q of questions) {
      if (q._id) {
        await QuestionModel.findByIdAndUpdate(q._id, q);
        updatedQuestionIds.push(q._id);
      } else {
        const newQ = await QuestionModel.create(q);
        updatedQuestionIds.push(newQ._id);
      }
    }

    const updatedQuiz = await QuizModel.findByIdAndUpdate(
      req.params.id,
      { title, description, duration, questions: updatedQuestionIds },
      { new: true }
    );

    if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });

    res.status(200).json({
      message: "Quiz updated",
      quiz: updatedQuiz,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    await QuestionModel.deleteMany({ _id: { $in: quiz.questions } });
    await QuizModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Quiz and its questions deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};