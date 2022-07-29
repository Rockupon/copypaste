const  customErr = require('../errors');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const Job = require('../models/jobs');


const createJob = async (req,res)=>{
    console.log(req.user);
    req.body.user = req.user.userId;
    const {company, description, position, country, provices, city, prices} = req.body;
    
    if(!company || !description || !position || !country || !provices || !city){
        throw new customErr.BadRequestError("pleae provide all fields")
    }
    const job = await Job.create(req.body)
    res.status(200).json({msg:'create job',job});
};
const getMyJob = async (req,res)=>{
    console.log(req.user);
    req.body.user = req.user.userId;
    const job = await Job.find({user:req.body.user})
    if(!job){
        throw new customErr.BadRequestError("no jobs found pls create a job post")
    }
    res.status(200).json({msg:'create job',job});
};
const getAllJobs = async (req,res)=>{
    const jobs = await Job.find({})
    .populate({
        path:'user',
        select:'name email _id role',
    })
    res.status(200).json({msg:'cget all job',jobs,num:jobs.length});
};
const getSingleJob= async (req,res)=>{
    const {id:jobId} = req.params;
    const job = await Job.findOne({_id:jobId});
    if(!job){
        throw new customErr.BadRequestError("job does not exist")
    }
    res.status(200).json({msg:'get a job', job});
};
const editJob= async (req,res)=>{
    const {id:jobId} = req.params;
    const {company, description, position} = req.body;
    const job = await Job.findOne({_id:jobId});
    if(!job){
        throw new customErr.BadRequestError("job does not exist")
    }
    job.company = company;
    job.description = description;
    job.position = position;

    await job.save();

    res.status(200).json({msg:'edit job',job});
};
const deleteJob= async (req,res)=>{
    const {id:jobId} = req.params;
    
    const job = await Job.findOne({_id:jobId});

    if(!job){
        throw new customErr.BadRequestError("job does not exist")
    }

    await job.remove();

    res.status(200).json({msg:'delete job'});
};
const removeallJobdb= async (req,res)=>{
    
    res.status(200).json({msg:'remove all jobs after 30days after being created'});
};

module.exports = {
    createJob,
    getMyJob,
    getAllJobs,
    getSingleJob,
    editJob,
    deleteJob,
    removeallJobdb,
};