// src/modules/api/quiz-api.ts

import axios from 'axios';

const quizApi = axios.create({
  baseURL: import.meta.env.VITE_QUIZ_API,
});

// GET all quizzes
export const getAllQuizzes = () => quizApi.get("");

// GET a single quiz by ID
export const getQuizById = (id: string) => quizApi.get(`${id}`);

// CREATE a new quiz
export const createQuiz = (data: unknown) => quizApi.post("create", data);

// UPDATE a quiz by ID
export const updateQuiz = (id: string, data: unknown) => quizApi.put(`update/${id}`, data);

// DELETE a quiz by ID
export const deleteQuiz = (id: string) => quizApi.delete(`delete/${id}`);

// SUBMIT quiz answers
export const submitQuiz = (data: unknown) => quizApi.post("submit", data);
