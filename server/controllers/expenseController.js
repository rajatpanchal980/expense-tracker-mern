import Expense from "../models/expense.js";

// Get All Expenses (Only Logged-in User)
export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            user: req.user.id,
        }).sort({ date: -1 });

        res.json(expenses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Add Expense
export const addExpense = async (req, res) => {
    try {
        const expense = await Expense.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            message: "Expense Added",
            expense,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Expense
export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        Object.assign(expense, req.body);

        await expense.save();

        res.json({
            message: "Expense Updated",
            expense,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found",
            });
        }

        await expense.deleteOne();

        res.json({
            message: "Expense Deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};