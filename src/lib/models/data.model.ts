import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    content: {
        type: String,
    }
}, { timestamps: true })

const DataModel = mongoose.models.DataModel || mongoose.model("DataModel", DataSchema);
export default DataModel;