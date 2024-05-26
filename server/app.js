require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/api/yelp", async (req, res) => {
  const { location, limit } = req.query;

  const YELP_API_URL = `https://api.yelp.com/v3/businesses/search?location=${location}&limit=${limit}`;

  try {
    const response = await axios.get(YELP_API_URL, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

app.listen(port, () => console.log("Successful connection"));
