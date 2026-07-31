import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },
    input: {
        type: String,
        required: true,
        trim: true,
    },
    expectedOutput: {
        type: String,
        required: true,
        trim: true,
    },
    explanation: {
        type: String,
        default: "",
        trim: true,
    },

    isHidden: {
        type: Boolean,
        default: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

},
    { timestamps: true }

);

testCaseSchema.index({ problemId: 1, isHidden: 1 });

export default mongoose.model("TestCase", testCaseSchema);