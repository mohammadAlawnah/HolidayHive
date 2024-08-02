import slugify from "slugify";
import priceModel from "../../../DB/model/price.model.js";
import countryModel from "../../../DB/model/country.model.js";
import destinationModel from "../../../DB/model/destination.model.js";
import cloudinary from 'cloudinary';

export const getAll = async (req, res) => {
    const destinations = await destinationModel.find({});
    return res.status(200).json({ message: 'Success', destinations });
};

export const addDestination = async (req, res) => {
    const { name, description, country, location, activities, bestTimesToVisit } = req.body;
    const { amount, currency, duration, durationUnit } = req.body;

    const countryDoc = await countryModel.findOne({ name: country });

    if (!countryDoc) {
        return res.status(409).json({ message: 'Country not found' });
    }

    const slug = slugify(name);

    const { secure_url: mainImageUrl, public_id: mainImageId } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
        folder: `${process.env.APPNAME}/destination/${name}`
    });

    const mainImage = { secure_url: mainImageUrl, public_id: mainImageId };

    const subImages = [];
    for (const file of req.files.subImages) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            folder: `${process.env.APPNAME}/destination/${name}/subImages`
        });
        subImages.push({ secure_url, public_id });
    }

    const destination = await destinationModel.create({
        name, slug, description, country: countryDoc._id, location, mainImage, subImages, bestTimesToVisit, activities
    });

    return res.status(201).json({ message: 'Destination created successfully', destination });
};

export const getDestinations = async (req, res) => {
    const { id } = req.params;
    const destinations = await destinationModel.find({ country: id });
    return res.status(200).json({ message: 'Success', destinations });
};

export const updateDestination = async (req, res) => {
    const { id } = req.params;
    const { name, description, location, activities, bestTimesToVisit } = req.body;

    const destination = await destinationModel.findById(id);
    if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
    }

    if (name) {
        if (await destinationModel.findOne({ name, _id: { $ne: id } })) {
            return res.status(409).json({ message: 'Destination with this name already exists' });
        }
        destination.name = name;
        destination.slug = slugify(name);
    }

    if (description) destination.description = description;
    if (location) destination.location = location;
    if (activities) destination.activities = activities;
    if (bestTimesToVisit) destination.bestTimesToVisit = bestTimesToVisit;

    await destination.save();

    return res.status(200).json({ message: 'Destination updated successfully', destination });
};
