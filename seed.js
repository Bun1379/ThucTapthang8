const mongoose = require("mongoose");
const User = require("./src/model/user.model");
const Product = require("./src/model/product.model");
const Order = require("./src/model/order.model");
const Review = require("./src/model/review.model");

async function seed() {
    await mongoose.connect("mongodb://127.0.0.1:27017/review_demo");

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Review.deleteMany({});

    // Tạo user
    const user1 = await User.create({ name: "Nam", email: "nam@example.com", avatar: "nam.png" });
    const user2 = await User.create({ name: "Shop Owner", email: "shop@example.com", avatar: "shop.png" });

    // Tạo product
    const product1 = await Product.create({ name: "Áo thun", category: "Thời trang", seller: user2._id, price: 150000 });
    const product2 = await Product.create({ name: "Giày sneaker", category: "Giày dép", seller: user2._id, price: 800000 });

    // Tạo order
    const order1 = await Order.create({
        user: user1._id,
        seller: user2._id,
        products: [
            { product: product1._id, variant: "Size M - Trắng", quantity: 1, price: 150000 }
        ],
        status: "COMPLETED"
    });

    // Tạo review
    await Review.create({
        user: user1._id,
        order: order1._id,
        product: product1._id,
        product_variant: "Size M - Trắng",
        rating: 5,
        product_quality: "Chất vải mềm mịn",
        impressive_feature: "Giao hàng nhanh",
        images: ["ao-thun1.png"],
        comment: "Áo mặc thoáng mát, đúng size, sẽ ủng hộ thêm!",
    });

    console.log("✅ Seed dữ liệu thành công");
    await mongoose.disconnect();
}

seed();
