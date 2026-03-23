const mongoose = require('mongoose');

// Connection to your local database
const mongoose = require('mongoose');

// PASTE IT HERE
mongoose.connect('mongodb+srv://public_user:codealpha123@cluster0.mongodb.net/ecommerce_db?retryWrites=true&w=majority')
    .then(() => console.log("✅ Connected to Cloud MongoDB for seeding..."))
    .catch(err => console.error("❌ Connection Error:", err));

// ... the rest of the file stays the same
    .then(() => console.log("Connected to MongoDB for seeding..."))
    .catch(err => console.error("Could not connect:", err));

// The Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
});

const Product = mongoose.model('Product', productSchema);

const seedProducts = [
    {
        name: "Premium Laptop",
        price: 1200,
        description: "High-speed processor with 16GB RAM and 512GB SSD.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
    },
    {
        name: "Wireless Headphones",
        price: 150,
        description: "Noise-cancelling over-ear headphones with 20h battery.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
    },
    {
        name: "Smart Watch",
        price: 250,
        description: "Track your health and notifications on the go.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
    }
];

const seedDB = async () => {
    await Product.deleteMany({}); // Clears old data
    await Product.insertMany(seedProducts);
    console.log("✅ Database Seeded with 3 Products!");
    process.exit();
};

seedDB();