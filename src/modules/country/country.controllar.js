import countryModel from "../../../DB/model/country.model.js";
import cloudinary from "../../utls/cloudinary.js";
import slugify from "slugify";

export const addCountry = async (req, res) => {
    const name = req.body.name.toLowerCase();

    if (await countryModel.findOne({ name })) {
        return res.status(409).json({ message: 'Country already exists' });
    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.APPNAME}/country`
    });

    const countryData = {
        ...req.body,
        name,
        image: { secure_url, public_id },
        slug: slugify(name)
    };

    const country = await countryModel.create(countryData);

    return res.status(201).json({ message: 'Country added successfully', country });
};

export const getAll = async (req, res) => {
    const countries = await countryModel.find({});
    return res.status(200).json({ message: 'Success', countries });
};

export const getActive = async (req, res) => {
    const countries = await countryModel.find({ status: "Active" });
    return res.status(200).json({ message: 'Success', countries });
};

export const getCountry = async (req, res) => {
    const { id } = req.params;
    const country = await countryModel.findById(id);

    if (!country) {
        return res.status(404).json({ message: 'Country not found' });
    }

    return res.status(200).json({ message: 'Success', country });
};

export const updateCountry = async (req, res) => {
    const { id } = req.params;
    const country = await countryModel.findById(id);

    if (!country) {
        return res.status(404).json({ message: 'Country not found' });
    }

    const name = req.body.name.toLowerCase();
    const existingCountry = await countryModel.findOne({ name, _id: { $ne: id } });

    if (existingCountry) {
        return res.status(409).json({ message: 'Country already exists' });
    }

    country.name = name;
    country.slug = slugify(name);

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
            folder: `${process.env.APPNAME}/country`
        });

        if (country.image.public_id) {
            await cloudinary.uploader.destroy(country.image.public_id);
        }

        country.image = { secure_url, public_id };
    }

    country.status = req.body.status;
    country.updateBy = req.user._id;

    await country.save();

    return res.status(200).json({ message: 'Country updated successfully', country });
};

export const deleteCountry = async (req, res) => {
    const { id } = req.params;
    const country = await countryModel.findByIdAndDelete(id);

    if (!country) {
        return res.status(404).json({ message: 'Country not found' });
    }

    if (country.image.public_id) {
        await cloudinary.uploader.destroy(country.image.public_id);
    }

    return res.status(200).json({ message: 'Country deleted successfully', country });
};
