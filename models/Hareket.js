const mongoose = require('mongoose'),
    Schema = mongoose.Schema


const HareketSchema = new Schema({
    name: String,
    kaslar: {
        type: String,
        require: true,
    },
    created: {
        type: Schema.Types.ObjectId, ref: 'user'
    }
    
})