const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Mock Data (No Database Needed!)
const products = [
    { name: "Premium Laptop", price: 1200, description: "High-speed performance", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300" },
    { name: "Wireless Headphones", price: 150, description: "Noise-cancelling", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { name: "Smart Watch", price: 250, description: "Health tracking", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" }
];

// Routes
app.get('/api/products', (req, res) => res.json(products));

app.post('/api/register', (req, res) => res.json({ message: "User Registered (Demo Mode)" }));

app.post('/api/login', (req, res) => res.json({ token: "fake-jwt-token", email: req.body.email }));

app.listen(5000, () => {
    console.log("🚀 SERVER IS LIVE ON PORT 5000");
    console.log("✅ Running in Demo Mode (No Database required)");
});