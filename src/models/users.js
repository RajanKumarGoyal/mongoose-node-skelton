"use strict";

/**
 * users Schema
 */
module.exports = (mongoose) => {
    const Schema = mongoose.Schema,
        userSchema = new Schema({
            username: {
                type: String,
                unique: true,
                required: "Username cannot be blank",
            },
            email: {
                type: String,
                trim: true,
                unique: true,
                required: "Email cannot be blank",
            },
            password: {
                type: String,
            },
            status: {
                type: String,
                trim: true,
                enum: ["online", "offline", "busy", "away"],
                default: "offline",
            },
            created: {
                type: Date,
                default: Date.now,
            },
        });

    mongoose.model("users", userSchema);
};
