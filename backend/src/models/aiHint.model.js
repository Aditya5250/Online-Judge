import mongoose from "mongoose";

const aiHintSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
        unique: true,
    },

    hints: {
        type: [String],
        required: true,

        validate: {
            validator: (value) => value.length === 3,
            message: "Exactly 3 hints are required",
        },
    },
},
    { timestamps: true }
);


export default mongoose.model("AIHint", aiHintSchema);
