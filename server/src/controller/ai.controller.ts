import { Request, Response } from "express";
import aiService from "../services/ai.service";

export const getReview = async (req: Request, res: Response): Promise<Response> => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({
            message: "Prompt is required",
        });
    }

    try {
        const result = await aiService(code);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
