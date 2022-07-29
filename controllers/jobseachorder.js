const  customErr = require('../errors');
const {StatusCodes} = require('http-status-codes');
const User = require('../models/User');
const Job = require('../models/jobs');


const barSearch = async (req,res)=>{
    const {search} = req.body
    const job = await Job.find({position: {$regex: search, $options: 'i'},});
    res.status(200).json({jobNUM: job.length,job});
};

const abcSearch = async (req,res)=>{
    const job = await Job.find({}).sort('country')
    res.status(200).json({jobNUM: job.length,job});
};
const cbaSearch = async (req,res)=>{
    const job = await Job.find({}).sort('-country')
    res.status(200).json({jobNUM: job.length,job});
};
const salaryHTL = async (req,res)=>{
    const job = await Job.find({}).sort('-price')
    res.status(200).json({jobNUM: job.length,job});
};
const remoteSearch = async (req,res)=>{
    const job = await Job.find({country:'remote'})
    res.status(200).json({jobNUM: job.length,job});
};
const newestSearch = async (req,res)=>{
    const job = await Job.find({}).sort('-createdAt')
    res.status(200).json({jobNUM: job.length,job});
};
const oldestSearch = async (req,res)=>{
    const job = await Job.find({}).sort('createdAt')
    res.status(200).json({jobNUM: job.length,job});
};

module.exports = {
    barSearch,
    abcSearch,
    cbaSearch,
    salaryHTL,
    remoteSearch,
    newestSearch,
    oldestSearch,
};