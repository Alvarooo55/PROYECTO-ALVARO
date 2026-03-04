const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || 'mongodb+srv://alvaro:Aa2323@cluster0.edw9nip.mongodb.net/JugadoresFC?appName=Cluster0';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;