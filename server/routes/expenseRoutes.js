import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// Get All Expenses
router.get("/", authMiddleware, getExpenses);

// Add Expense
router.post("/", authMiddleware, addExpense);

// Update Expense
router.put("/:id", authMiddleware, updateExpense);

// Delete Expense
router.delete("/:id", authMiddleware, deleteExpense);

export default router;