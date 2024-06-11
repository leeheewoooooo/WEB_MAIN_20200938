const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS 미들웨어 사용
app.use(cors());

app.use(express.static('public'));

// MongoDB 연결
mongoose.connect('mongodb+srv://user:1111@cluster0.cwbjg71.mongodb.net/')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB:', err));

// MongoDB 모델 정의
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    repeatPassword: String
});

// body-parser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST 요청 처리
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 사용자 생성
        const user = new User({ name, email, password });
        await user.save();

        res.status(201).send('User created successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password.');
        }

        res.status(200).send('Login successful.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
