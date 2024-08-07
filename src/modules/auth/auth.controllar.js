import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALTROUND, 10));

    const checkAdmin = await userModel.findOne({role : 'Admin'})

    if(!checkAdmin){
        console.log('yes')
        req.body.role = 'Admin'
    }

    
    const user = await userModel.create(req.body);
    if (!user) {
        return res.status(500).json({ message: 'User registration failed' });
    }

    return res.status(201).json({ message: 'User registered successfully', user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.status === 'NotActive') {
        return res.status(403).json({ message: 'Your account is blocked' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role, status: user.status }, process.env.LOGINSIG, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
};
