import destinationModel from "../../../DB/model/destination.model.js";
import priceModel from "../../../DB/model/price.model.js";
import tripModel from "../../../DB/model/trip.model.js";
import userTripModel from "../../../DB/model/userTrip.model.js";

export const getAll = async (req, res) => {
    const trips = await tripModel.find({}).populate('destinationId', 'name').populate('price');
    return res.status(200).json({ message: 'Success', trips });
};

export const get = async (req, res) => {
    const trip = await tripModel.findById(req.params.id).populate('destinationId', 'name').populate('price');
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }
    return res.status(200).json({ message: 'Success', trip });
};

export const create = async (req, res) => {
    const { amount, currency, duration, durationUnit } = req.body;

    req.body.startDate = new Date(req.body.startDate);
    req.body.endDate = new Date(req.body.endDate);

    if (req.body.endDate <= req.body.startDate) {
        return res.status(400).json({ message: 'End date must be greater than start date' });
    }

    const price = new priceModel({ amount, currency, duration, durationUnit });
    await price.save();

    req.body.price = price._id;

    const trip = await tripModel.create(req.body);

    return res.status(201).json({ message: 'Trip created successfully', trip });
};


export const update = async (req, res) => {
    const { id } = req.params;

    const trip = await tripModel.findById(id).populate('price');
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }

    if (req.body.startDate) {
        req.body.startDate = new Date(req.body.startDate);
    }
    if (req.body.endDate) {
        req.body.endDate = new Date(req.body.endDate);
    }

    if (req.body.amount || req.body.currency || req.body.duration || req.body.durationUnit) {
        const priceData = {
            amount: req.body.amount,
            currency: req.body.currency,
            duration: req.body.duration,
            durationUnit: req.body.durationUnit
        };

        const updatedPrice = await priceModel.findByIdAndUpdate(trip.price._id, priceData, { new: true });

        if (!updatedPrice) {
            return res.status(500).json({ message: 'Failed to update price' });
        }

        req.body.price = updatedPrice._id;
    }

    const updatedTrip = await tripModel.findByIdAndUpdate(id, req.body, { new: true }).populate('price');

    return res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
};

export const remove = async(req,res)=>{
    const { id } = req.params;

    const trip = await tripModel.findById(id).populate('price');
    if (!trip) {
        return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.price) {
        await priceModel.findByIdAndDelete(trip.price._id);
    }

    await tripModel.findByIdAndDelete(id);

    await userTripModel.findOneAndUpdate(
        { tripId: id },
        { $pull: { tripId: id } }
    );

    return res.status(200).json({ message: 'Trip, associated price, and related userTrip removed successfully' });
}

