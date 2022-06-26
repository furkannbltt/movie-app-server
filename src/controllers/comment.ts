import { Request, Response, NextFunction } from "express";
import {
    addCommentValidation,
} from "../utils/validation-helper";
import Comment from "../models/comment";

export const addComment = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { error } = addCommentValidation(request.body);
        if (error) {
            return response.status(400).json({ message: error.details[0].message });
        }
        const { comment, id, sender } = request.body;
        const data = await Comment.create({
            comment: comment,
            id: id,
            sender: sender,
        });

        if (data) return response.json({ status: true, error: "Comment added successfully." });
        else return response.json({ status: false, error: "Failed to add comment to the database" });
    } catch (ex) {
        next(ex);
    }
};
export const getComments = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { id } = request.body;
        const data = await Comment.find({ id: id });
        return response.json({ status: false, data });
    } catch (ex) {
        next(ex);
    }
};
