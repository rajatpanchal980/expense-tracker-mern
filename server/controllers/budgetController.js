import Budget from "../models/Budget.js";

// Save or Update Budget
export const setBudget = async (req, res) => {
    try {
        const { amount, month, year } = req.body;

        let budget = await Budget.findOne({
            user: req.user.id,
            month,
            year,
        });

        if (budget) {
            budget.amount = amount;
            await budget.save();
        } else {
            budget = await Budget.create({
                user: req.user.id,
                amount,
                month,
                year,
            });
        }

        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Budget
export const getBudget = async (req, res) => {
    try {
        const { month, year } = req.query;

        const budget = await Budget.findOne({
            user: req.user.id,
            month,
            year,
        });

        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};