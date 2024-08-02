import destinationModel from "../../../DB/model/destination.model.js";
import userTripModel from "../../../DB/model/userTrip.model.js";
import tripModel from "../../../DB/model/trip.model.js";

export const get = async (req, res) => {
    const userTrip = await userTripModel.findOne({ userId: req.user._id }).populate({
        path: 'tripId',
        populate: {
            path: 'destinationId',
            model: 'destination',
            select: 'name'
        }
    }).populate({
        path: 'tripId',
        populate: {
            path: 'price',
            model: 'price',
            select: 'amount currency'
        }
    });

    if (!userTrip) {
        return res.status(409).json({ message: 'Trips not found for this user' });
    }

    const tripsWithDetails = userTrip.tripId.map(trip => ({
        tripId: trip._id,
        destinationName: trip.destinationId.name,
        startDate: trip.startDate,
        endDate: trip.endDate,
        price: trip.price.amount,
        currency: trip.price.currency
    }));

    return res.status(200).json({ message: 'Success', trips: tripsWithDetails });
};

export const create = async (req, res) => {
    const { tripId } = req.body;

    const trip = await tripModel.findById(tripId);
    if (!trip) {
        return res.status(409).json({ message: 'Trip not found' });
    }

    let tripUser = await userTripModel.findOne({ userId: req.user._id });
    if (!tripUser) {
        tripUser = await userTripModel.create({
            userId: req.user._id,
            tripId: [tripId],
        });
        return res.status(201).json({ message: 'Trip created successfully', tripUser });
    }

    if (tripUser.tripId.includes(tripId)) {
        return res.status(409).json({ message: 'Trip already added for the user' });
    }

    const existingTrips = await tripModel.find({
        _id: { $in: tripUser.tripId }
    });

    for (const existingTrip of existingTrips) {
        if (
            (trip.startDate < existingTrip.endDate) &&
            (trip.endDate > existingTrip.startDate)
        ) {
            return res.status(409).json({
                message: 'Trip dates conflict with an existing trip',
                conflictingTripId: existingTrip._id
            });
        }
    }

    tripUser.tripId.push(tripId);
    await tripUser.save();

    return res.status(200).json({ message: 'Trip added successfully', tripUser });
};

export const remove = async (req, res) => {
    const { tripId } = req.body;

    const userTrip = await userTripModel.findOne({ userId: req.user._id });
    if (!userTrip) {
        return res.status(409).json({ message: 'No trips found for this user' });
    }

    if (!userTrip.tripId.includes(tripId)) {
        return res.status(409).json({ message: 'Trip not found for this user' });
    }

    const updatedUserTrip = await userTripModel.findOneAndUpdate(
        { userId: req.user._id },
        { $pull: { tripId: tripId } },
        { new: true }
    );

    return res.status(200).json({ message: 'Trip removed successfully', updatedUserTrip });
};
