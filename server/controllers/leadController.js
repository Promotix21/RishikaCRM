import leadModel from "../models/lead.js";

class leadController{
    static createLead = async(req,res)=>{
        const {name,email,incharge,incharge_email,phoneNumber,dateOfVisit,status,comment} = req.body
        if(name && email && phoneNumber && incharge && incharge_email && dateOfVisit && status && comment){
                    const user = await leadModel.findOne({email:email})
                    if(user){
                        res.send({"status":"failed","message":"Email Already Exists"})
                    }
                    else{
                   try {
                    const doc = new leadModel({
                        name:name,
                        email:email,
                        incharge:incharge,
                        incharge_email:incharge_email,
                        phone:phoneNumber,
                        date_of_visit:dateOfVisit,
                        status:status,
                        comment:comment   
                    })
                    await doc.save()
                    res.status(201).send({"status":"success","message":"Lead Inserted Successfull"})
                   } catch (error) {
                    res.send({"status":"failed","message":error})
                   }
            }
        }
            else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
    

        static getAllLead = async (req,res)=>{
            try{
                if(req.query.status==='all'){
                    const result = await leadModel.find({"incharge":req.query.paramName,"incharge_email":req.query.paramEmail}).sort({_id:-1}) 
                    res.status(201).send({"status":"success","data":result})
                }
                else{
                    const result = await leadModel.find({"incharge":req.query.paramName,"incharge_email":req.query.paramEmail,"status":req.query.status}).sort({_id:-1}) 
                    res.status(201).send({"status":"success","data":result})
                }
                
            }
            catch(error){
                res.send({"status":"failed","message":"something went wrong"})
            }
            
        }

        static getAllUserLead = async (req,res)=>{
            try{
                if(req.query.status==='all'){
                    const result = await leadModel.find().sort({_id:-1}) 
                    res.status(201).send({"status":"success","data":result})
                }
                else{
                    const result = await leadModel.find({"status":req.query.status}).sort({_id:-1}) 
                    res.status(201).send({"status":"success","data":result})
                }
            }
            catch(error){
                res.send({"status":"failed","message":error})
            }
            
        }
       

        static getUserById = async (request, response) => {
            try{
                const user = await leadModel.findById(request.params.id);
                response.status(200).json(user);
            }catch( error ){
                response.status(404).json({ message:error.message })
            }
        }


        static editLead = async (req, res) => {
            try{
                await leadModel.findByIdAndUpdate(req.params.id,req.body)
                res.status(201).send({"status":"success","message":"Lead Updated Successfull"})
            } catch (error){
                res.send({"status":"failed","message":error})    
            }
        }

        static deleteUser = async (req, res) => {
            try{
                await leadModel.deleteOne({_id: req.query.paramId});
                res.status(201).send({"status":"success","message":"Lead Deleted Successfull"})
            } catch (error){
                res.send({"status":"failed","message":error})      
            }
        }


        static getDetails = async (req, res) => {
            const name = req.query.name;
            const email = req.query.email;
            try{
                if(req.query.isAdmin==='true'){
                    const totalLead = await leadModel.find({}).count()
                    const pendingLead = await leadModel.find({status:'pending'}).count();
                    const closeLead = await leadModel.find({status:'close'}).count();
                    const openLead = await leadModel.find({status:'open'}).count();
                    res.status(200).send({"totalLead":totalLead,"pendingLead":pendingLead,"closeLead":closeLead,"openLead":openLead});
                }
                else{
                    const totalLead = await leadModel.find({incharge:name,incharge_email:email}).count()
                    const pendingLead = await leadModel.find({incharge:name,incharge_email:email,status:'pending'}).count();
                    const closeLead = await leadModel.find({incharge:name,incharge_email:email,status:'close'}).count();
                    const openLead = await leadModel.find({incharge:name,incharge_email:email,status:'open'}).count();
                    res.status(200).send({"totalLead":totalLead,"pendingLead":pendingLead,"closeLead":closeLead,"openLead":openLead})
                }
            }catch( error ){
                res.status(404).json({ message: error.message })
            }
        }

        static addCallback = async (req, res) => {
            try{
                await leadModel.findByIdAndUpdate(req.params.id,{
                    $push: {
                        next_call_back: req.body,
                    },
                  })
                res.status(201).send({"status":"success","message":"New Callback Details Inserted Successfully"})
            } catch (error){
                res.send({"status":"failed","message":error})    
            }
        }
        

       


        
    }
export default leadController;