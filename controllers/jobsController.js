import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
import moment from "moment";

export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;

  const job = await jobsModel.create(req.body);
  res.status(201).json({ job });
};

//get jobs
export const getAllJobsController = async (req, res, next) => {
 const {status,workType,search,sort} = req.query
//  conditions for searching 

const queryObject = {
  createdBy: req.user.userId
}

// /logic filter
if (status && status !== 'all') {
  queryObject.status = status
}

if (workType && workType !== 'all') {
  queryObject.workType = workType
}
if (search) {
  queryObject.position = {$regex: search,$options:"i"}
}

let queryResult = jobsModel.find(queryObject)
if (sort === 'latest') {
  queryResult = queryResult.sort('-createdAt')
}
if (sort === 'oldest') {
  queryResult = queryResult.sort('createdAt')
}
if (sort === 'a-z') {
  queryResult = queryResult.sort('position')
}
if (sort === 'z-a') {
  queryResult = queryResult.sort('-position')
}


//pagination 
const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10

const skip = (page -1 ) * limit
queryResult = queryResult.skip(skip).limit(limit)

//jobs count
const totalJobs = await jobsModel.countDocuments(queryResult)

const numOfPage = Math.ceil(totalJobs/limit)


const jobs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs,
    jobs,
    numOfPage
  });
};

//update jobs

export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //validation

  if (!company || !position) {
    next("Please Provide ALl Fields");
  }

  //find job
  const job = await jobsModel.findOne({ _id: id });

  //validation

  if (!job) {
    next(`No Jobs found with this Id ${id}`);
  }
  // if (req.user.userId === job.createdBy.toString()) {

  //   return;
  //   next("You are nor aythorized to update this job");

  // }

  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  //res
  res.status(200).json({ updateJob });
};

//delete job

export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;

  //find
  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`No Job found with this ID ${id}`);
  }
  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not allowed to delete this job");
    return;
  }

  await job.deleteOne();
  res.status(200).json({ message: "Success, Job Deleted!" });
};

// JOBs ststs and filter
export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    //serach by user jobs
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  //default stats
  const defaultstats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stat

  let montltApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  montltApplication =
    montltApplication
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;
        const date = moment()
          .month(month - 1)
          .year(year)
          .format("MMM Y");
        return { date, count };
      })
      .reverse();
  res
    .status(200)
    .json({ totalJob: stats.length, defaultstats, montltApplication });
};
