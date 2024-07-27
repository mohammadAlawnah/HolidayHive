import countryModel from "../../../DB/model/country.model.js";
import cloudinary from "../../utls/cloudinary.js";
import slugify from "slugify";

export const addContry =async(req,res)=>{

    req.body.name = req.body.name.toLowerCase();

    const {name} = req.body;

    if(await countryModel.findOne({name})){
        return res.status(409).json({message : 'country already exisist'})
    }


    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder : `${process.env.APPNAME}/country`
    })

    req.body.image = {secure_url,public_id};

    req.body.slug = slugify(name);

    const country = await countryModel.create(req.body);

    return res.json(country)

    

}

export const getAll = async(req,res)=>{
    const contry =await countryModel.find({});
    return res.json({message : contry})
}

export const getActive = async(req,res)=>{
    const contry = await countryModel.find({status:"Active"})
    return res.json({message : contry})
}

export const getContry = async(req,res)=>{
    const {id} = req.params;
    if(!await countryModel.findById(id)){
        return res.status(409).json({message:"contry not found"})
    }
    const contry = await countryModel.findById(id);

    return res.status(201).json({message : contry})

}

export const updateCountry = async(req,res)=>{
    const{id} = req.params;

    const country = await countryModel.findById(id);

    if(!country){
        return res.status(409).json({message : "country not found"});

    }

    country.name = req.body.name.toLowerCase();

    if(await countryModel.findOne({name : req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:"country alreade exiset"})
    }

    country.slug = slugify(req.body.name);

    if(req.file){

        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder : `${process.env.APPNAME}/country`
        })
        cloudinary.uploader.destroy(country.image.public_id)

        country.image = {secure_url,public_id}   
     }
    
    
    country.status = req.body.status

    country.updateBy = req.user._id

    await country.save();

    return res.json({message : country})

}

export const deleteContry = async(req,res)=>{
    const {id} = req.params;

    const contry = await countryModel.findByIdAndDelete(id);

    if(!contry){
        return res.status(409).json({message : "contry not found"})
    }
    await cloudinary.uploader.destroy(contry.image.public_id)

    return res.status(200).json({message :contry})


}