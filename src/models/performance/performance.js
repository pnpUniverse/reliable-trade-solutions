const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    performance_file_path: {
        type: String,
    },
    file_name: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
    createdBy: {
        type: ObjectId,
    }
});


const Performance = mongoose.model('Performance', schema);

module.exports = {
    Performance
}