const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ... rest of your code


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/leaveApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema and Model
const leaveSchema = new mongoose.Schema({
  empName: String, 		// Field for member name
  moduleName: String, 	// Field for module name 
  date: { type: Date, default: Date.now },
});

const Leave = mongoose.model('Leave', leaveSchema);

// API to Mark Leave
// API to Mark Leave
app.post('/mark-leave', async (req, res) => {
  const { empName, moduleName } 	= req.body;
  try {
    console.log('Received Leave request for:', empName, 'From Module:', moduleName);

    const leave = new Leave({ empName, moduleName });
    await leave.save();

    console.log('Leave marked successfully.');
    res.status(200).send('Leave marked successfully.');
  } catch (error) {
    console.error('Error marking leave:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
