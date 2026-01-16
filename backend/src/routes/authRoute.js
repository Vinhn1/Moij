import express from 'express';
import {signUp} from '../controllers/authController.js';

// Tạo đối tượng router 
const router = express.Router();

// POST là một HTTP Method (Gửi dữ liệu từ client lên server, Tạo mới dữ liệu, Thực hiện hành động (signup, login))
// import từ file authController(Để xử lý logic singup)
// Router chỉ chịu trách nhiệm định nghĩa route và điều hướng request
router.post("/signup", signUp)

// Export Router 
export default router;