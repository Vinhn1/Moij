import express from 'express';
// import thư viện đọc giá trị file dotenv
import dotenv from 'dotenv';
import { connectDB } from './libs/db.js';

// Gọi hàm dotenv để load các biến môi trường 
dotenv.config();

// Khởi tạo express
const app = express();
// Lấy cổng từ file .env, mặc định là 5000 nếu không tìm thấy
const PORT = process.env.PORT || 5000;

// Thêm middlewares giúp express hiểu và đọc được request body 
app.use(express.json());

// Gọi hàm connecDB từ libs/db.js 
// Khi connectDB chạy xong thì mới chạy app.listent
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server bắt đầu chạy trên cổng ${PORT}`)
    });
});

// Chạy server 
// app.listen(PORT, () => {
//     console.log(`server bắt đầu chạy trên cổng ${PORT}`)
// })