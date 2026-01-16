import express from 'express';
// import thư viện đọc giá trị file dotenv
import dotenv from 'dotenv';

// Gọi hàm dotenv để load các biến môi trường 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Thêm middlewares giúp express hiểu và đọc được request body 
app.use(express.json());

// Chạy server 
app.listen(PORT, () => {
    console.log(`server bắt đầu chạy trên cổng ${PORT}`)
})