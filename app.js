import 'dotenv/config'
import express from 'express';
import { connect } from './src/database/mongoose.js';
import { index } from './src/api/routers/index.js';

const app = express();
const PORT =  process.env.PORT;

(async function () {
    await connect();
    await index(app);
    app.get('/', (req, res) => res.status(200).json({message: 'Server is Up and Running'}))
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`)
    });
})();

process.on('unhandledRejection', error => {
  // Log or Alert
  console.log('unhandledRejection', error.message);
});