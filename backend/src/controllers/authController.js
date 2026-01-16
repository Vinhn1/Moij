// import bcrypt
import bcrypt from 'bcrypt';
import User from '../models/User.js';

//==================================================================
// export hàm singup dưới dạng async function 
// Quy trình hoạt động 
// Kiểm tra input 
// Kiểm tra username có bị trùng không 
// Mã hóa password 
// Tạo User mới 
// Trả về status 204 nếu thành công 
// Nếu có lỗi trả về status 500 
// Hàm nhận vế request và respone từ express
//==================================================================
export const signUp = async (req, res) => {
    // B1: Lấy dữ liệu từ người dùng gửi lên từ request.body
    try{
        // cú pháp (destructuring) 
        // Lấy dữ liệu từ request gửi lên (body) và gán nhanh vào biến
        const {username, password, email, firstname, lastname} = req.body;

        // Kiểm tra các trường có tồn tại hay không 
        if(!username || !password || !email || !firstname || !lastname){
            // Kết thúc luôn hàm, Không chạy các đoạn code phía dưới (ví dụ: lưu DB)
            // 400 Bad Request(Thiếu field, Dữ liệu không hợp lệ) 
            return res.status(400).json({message: "Không thể thiếu username, password, email, firstname và lastname"});
        }

        // B2: Kiểm tra username tồn tại chưa
        // findOne là một hàm của Mongoose -> Tìm 1 document duy nhất trong MongoDB thỏa mãn điều kiện
        const duplicate = await User.findOne({username});
        // Nếu tìm thấy 
        if(duplicate){
            // 409 = Conflict (Xung đột) -> Nếu lỗi 409 tức là username đã tồn tại rồi không cho phép tạo mới vì xung đột
            return res.status(409).json({message: "Username đã tồn tại "})
        } 


        // Mã hóa password 
        // salt = 10 (Số lần bcrypt thực hiện việc mã hóa lập đi lập lại để tạo ra kq cuối cùng)
        const hashedPassword = await bcrypt.hash(password, 10);


        // Tạo user mới 
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstname} ${lastname}`
        })

        // Return 
        // 204 = No Content - Server xử lý THÀNH CÔNG request, Nhưng KHÔNG trả về dữ liệu gì
        // dùng trong trường hợp (Xóa thành công, Logout, Cập nhật thành công nhưng không cần dữ liệu, Verify email xong)
        return res.sendStatus(204); 
    }catch(error){
        console.error("Lỗi khi gọi signup", error);
        // 500 = Internal Server Error
        // Server bị lỗi trong quá trình xử lý
        // Không phải lỗi do client gửi sai
        return res.status(500).json({message: "Lỗi hệ thống"});
    }

};