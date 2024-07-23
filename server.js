const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
  try {
    const { message } = req.body;
    // Here you can process the message and generate a response
    // For demonstration, let's just echo back the message
    res.json({ message: `You asked: "${message}". Here's a placeholder response.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
