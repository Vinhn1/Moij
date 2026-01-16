import mongoose from 'mongoose';

// Hàm kết nối db MongoDB
export const connectDB = async () => {
    try{
        // Chờ kết nối thành công rồi mới chạy tiếp
        // mongoose.connect(...): Thực hiện kết nối tới MongoDB, Nhận vào connection string (URI)
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Kết nối CSDL thành công!")
    }catch(error){
        console.log("Lỗi khi kết nối CSDL:", error);
        // Dừng chương trình nếu không kết nối được với db 
        // 1 = thoát do lỗi, Không cho server chạy khi DB chưa kết nối
        process.exit(1);
    }
}
