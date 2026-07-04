import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true,
    },
    input:{
        type:String,
        required:true,
        trim:true,
    },
    expectedOutput:{
        type:String,
        required:true,
        trim:true,
    },
    explanation:{
        type:String,
        default:"",
        trim:true,
    },

    isHidden:{
        type:Boolean,
        default:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

},
{timestamps:true}

);

testCaseSchema.index({problemId:1, isHidden:1}); // we can have multiple test cases for a problem, but only one of them can be hidden at a time. This index ensures that there is only one hidden test case per problem.

export default mongoose.model("TestCase",testCaseSchema);