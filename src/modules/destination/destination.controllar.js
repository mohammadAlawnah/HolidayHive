import slugify from "slugify";
import priceModel from "../../../DB/model/price.model.js"
import countryModel from "../../../DB/model/country.model.js";
import destinationModel from "../../../DB/model/destination.model.js";
import cloudinary from 'cloudinary'; 

export const addDestination = async(req,res)=>{
    const {amount,currency,duration,durationUnit} = req.body;

    const {name,description,country,location,activities,bestTimesToVisit} = req.body;

    const Contry  = await countryModel.findOne({name :country})

    if(!Contry){
        return res.status(409).json({ message: "Country not found" });
    }

    const price = new priceModel({amount,currency,duration,durationUnit});


    const slug = slugify(name);

    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder :`${process.env.APPNAME}/destination/${name}`
    })
    const mainImage = {secure_url,public_id}

    const subImages =[];

    for (const file of req.files.subImages){

        const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{
            folder :`${process.env.APPNAME}/destination/${name}/subImages`
        })

       subImages.push({secure_url,public_id});
    }
    
    const destination = await destinationModel.create({name,slug,description,country:Contry._id,location,mainImage,subImages,bestTimesToVisit,activities,price:price._id})
    
    const newPrice = await price.save();

    return res.json({message : 'success',destination})
   
}

export const getDestinations = async(req,res)=>{
    const{id} = req.params;

    const destination = await destinationModel.find({country:id})

    return res.status(200).json({message : destination})


}

export const updateDestenation = async(req,res)=>{
    const {id} = req.params;

    const destination = await destinationModel.findById(id);

    if(!destination){
        return res.status(409).json({message : 'destination not found'});
    }
    destination.name = req.body.name;

    if(await destination.findOne({name : req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message : "destination already exiset"})
    }

    destination.slug = slugify(req.body.name);


}
