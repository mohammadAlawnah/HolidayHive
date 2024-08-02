import couponModel from "../../../DB/model/coupon.model.js";

export const create = async (req, res) => {
    const existingCoupon = await couponModel.findOne({ name: req.body.name });

    if (existingCoupon) {
        return res.status(409).json({ message: 'Coupon already exists' });
    }

    req.body.expireDate = new Date(req.body.expireDate);
    const coupon = await couponModel.create(req.body);

    return res.status(201).json({ message: 'Coupon created successfully', coupon });
};

export const getAll = async (req, res) => {
    const coupons = await couponModel.find({});
    return res.status(200).json({ message: 'Success', coupons });
};

export const getCoupon = async (req, res) => {
    const { id } = req.params;
    const coupon = await couponModel.findById(id);

    if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
    }

    if (coupon.expireDate < new Date()) {
        return res.status(400).json({ message: 'Coupon expired', coupon });
    }

    return res.status(200).json({ message: 'Success', coupon });
};

export const update = async (req, res) => {
    const { id } = req.params;
    const coupon = await couponModel.findById(id);

    if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' });
    }

    if (req.body.name) {
        const existingCoupon = await couponModel.findOne({ name: req.body.name, _id: { $ne: id } });

        if (existingCoupon) {
            return res.status(409).json({ message: 'Coupon with this name already exists' });
        }
    }

    if (req.body.expireDate) {
        req.body.expireDate = new Date(req.body.expireDate);
    }

    const updatedCoupon = await couponModel.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ message: 'Coupon updated successfully', coupon: updatedCoupon });
};
