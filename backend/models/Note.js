const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
        long: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        tag: {
                type: String,
                required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);