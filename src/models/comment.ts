import mongoose from "mongoose";

const Message = mongoose.model(
    "Comment",
    new mongoose.Schema(
        {
            comment: {
                type: String, required: true
            },
            id: {
                type: String, required: true
            },
            sender: {
                type: String, required: true
            },
        },
        {
            timestamps: true,
        }
    ),
    "Comment"
);

export default Message;
