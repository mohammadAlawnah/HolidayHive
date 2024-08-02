import userModel from "../../../DB/model/user.model.js";

export const getAllUsers = async (req, res) => {
    const users = await userModel.find({});
    return res.status(200).json({ message: 'Success', users });
};

export const getActiveUsers = async (req, res) => {
    const users = await userModel.find({ status: "Active" });
    return res.status(200).json({ message: 'Success', users });
};

export const getNotActiveUsers = async (req, res) => {
    const users = await userModel.find({ status: "NotActive" });
    return res.status(200).json({ message: 'Success', users });
};

export const getConfirmedUsers = async (req, res) => {
    const users = await userModel.find({ confirmEmail: true });
    return res.status(200).json({ message: 'Success', users });
};

export const getNotConfirmedUsers = async (req, res) => {
    const users = await userModel.find({ confirmEmail: false });
    return res.status(200).json({ message: 'Success', users });
};

export const updateRole = async (req, res) => {
    const { email, role } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === role) {
        return res.status(200).json({ message: `User is already a ${role}` });
    }

    await userModel.updateOne({ email }, { role });

    return res.status(200).json({ message: `User role updated to ${role}` });
};
