const  customErr = require('../errors');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const Job = require('../models/jobs');


const boost = async (req,res)=>{
    const {boost,jobId} = req.body
    req.body.user = req.user.userId
    const job = await Job.findOne({
        user:req.body.user,
        _id:jobId
    });

    if(!job){
        throw new customErr.BadRequestError("job does not exist")
    }

    job.boost = boost ;

    await job.save()

    res.status(200).json({job});
};

const justboostedSearch = async (req,res)=>{
    const job = await Job.find({boost : { $gt: 0} }).sort('updatedAt').select("user",'boost')
    res.status(200).json({jobNUM: job.length,job});
};

const mostboostedSearch = async (req,res)=>{
    const job = await Job.find({boost : { $gt: 0} }).sort('-boost').select("user",'boost')
    res.status(200).json({jobNUM: job.length,job});
};
const lessboostedsearch = async (req,res)=>{
    const job = await Job.find({boost : { $gt: 0} }).sort('-boost').select("user",'boost')
    res.status(200).json({jobNUM: job.length,job});
};
const getallboosted = async (req,res)=>{
    const job = await Job.find({boost})
    res.status(200).json({jobNUM: job.length,job});
};
const getmyboosted = async (req,res)=>{
    req.body.user = req.user.userId;
    const job = await Job.find({
        user:req.body.user,
        boost : { $gt: 0}
    })

    if(!job){
        throw new customErr.BadRequestError("no jobs found pls create a job post")
    }
    res.status(200).json({jobNUM: job.length,job});
};


module.exports = {
    boost,
    justboostedSearch,
    mostboostedSearch,
    lessboostedsearch,
    getallboosted,
    getmyboosted
};