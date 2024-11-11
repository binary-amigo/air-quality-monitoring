import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    humidity: Number,
    temperature: Number,
    pressure: Number,
    altitude: Number,
    air: Number,
    city: String,
    date: {
        type: String,
        default: () => {
            const now = new Date();
            const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getFullYear()).slice(2)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            return formattedDate;
        }
    }
});


export default mongoose.model('Data', dataSchema);
