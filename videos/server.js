const app = require('./src/app');
const { DB_URI } = require('./src/config/index');
const mongoose = require('mongoose');
mongoose.connect(DB_URI);

app.listen(3003, () => {
    console.log('video service started up on port 3003');
    console.log('-----------------------------------------');
});