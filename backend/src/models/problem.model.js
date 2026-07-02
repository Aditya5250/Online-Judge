import mongoose from "mongoose";
import slugify from "slugify";

const exampleSchema = new mongoose.Schema(
    {
        input:{
            type:String,
            required:true,
            trim:true
        },

        output:{
            type:String,
            required:true,
            trim:true
        },

        explanation:{
            type:String,
            trim:true,
        },
    },{
        _id:false
    }
);


const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    problemStatement:{
        statement:{
            type:String,
            required:true,
        },

        inputFormat:{
            type:String,
            required:true,
        },

        outputFormat:{
            type:String,
            required:true,
        },
        constraints:{
            type:String,
            required:true,
        },
        notes:{
            type:String,
            default:""
        }
    },

    difficulty:{
        type:String,
        enum:["EASY","MEDIUM","HARD"],
        required:true,
    },  

    tags:[
        {
            type:String,
            trim:true,
        },
    ],

    examples:[exampleSchema],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        
    },

    isPublished:{
        type:Boolean,
        default:true,
    },
},
{
    timestamps:true,
}
);

problemSchema.pre("save",function(next){
    if(!this.isModified("title")){ // we only want to generate a new slug if the title has been modified, otherwise we will end up with a new slug every time we update the problem
        return next ;
    }

    this.slug =slugify(this.title,{
        lower:true,
        strict:true, // remove special characters
        trim:true,
    });
})


export default mongoose.model("Problem",problemSchema);