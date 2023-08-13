require('dotenv').config();

const message = 'conectados';
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error: ' + err));

db.sync({ force: false });
console.log(message);

// star server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  const PORT = 3001;
  console.log(`Server is running on port ${PORT}`);
});
