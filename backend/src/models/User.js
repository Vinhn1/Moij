import mongoose from "mongoose";

// Schema – bản thiết kế dữ liệu trong MongoDB.
const userSchema = new mongoose.Schema({
    // Định nghĩa các trường User
    // Khai báo một field tên là username.
    username: {
        type: String,
        required: true, // Bắt buộc phải có giá trị.
        unique: true, // Giá trị không được trùng trong collection.
        trim: true, // Bỏ khoảng trắng ở đầu và cuối 
        lowercase: true // Chuyển hết về chữ thường 

    },
    hashedPassword: {
        type: String,
        required: true, // Lưu mật khẩu sau khi đã được mã hóa 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    // Tên hiển thị của người dùng 
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    // Lưu đường dẫn ảnh đại diện người dùng 
    avatarUrl: {
        type: String, // link CND để hiển thị hình 
    },
    // Lưu ảnh đại diện 
    avatarId: {
        type: String, // Lưu Cloudinary public_id để xóa hình 
    },
    // Mô tả ngắn của người dùng 
    bio: {
        type: String,
        maxlength: 500, // Giới hạn độ dài bio là 500 kí tự (Có thể có hoặc không) 
    },
    phone: {
        type: String,
        sparse: true // Cho phép giá trị để trống, nhưng không được trùng
    }
}, {
    // Cấu hình 
    timestamps: true
    // sẽ tự động tạo ra 2 trường
    // createdAt: Date -> Thời điểm document được tạo lần đầu
    // updatedAt: Date -> Thời điểm document được cập nhật gần nhất (save(), updateOne(), findByIdAndUpdate())
    // updatedAt tự đổi giá trị
});

// Tạo model và export 
const User = mongoose.model("User", userSchema);
export default User;