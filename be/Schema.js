import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    humidity: Number,
    temperature: Number,
    pressure: Number,
    altitude: Number,
    air: Number,
    date: { type: Date, default: Date.now }
})

export default mongoose.model('Data', dataSchema);
