import mongoose from 'mongoose';

// mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connect('mongodb://localhost:27017/mydb')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

export default mongoose.connection;
