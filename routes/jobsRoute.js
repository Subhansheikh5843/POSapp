import express from 'express'
import userAuth from '../middlewares/authMiddleware.js'
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js'

const router = express.Router()


//routes
//CREATR JOB || POST

router.post('/create-job',userAuth,createJobController)



//CREATR JOB || GET

router.get('/get-job',userAuth,getAllJobsController)


//CREATR JOB || patch

router.patch('/update-job/:id',userAuth,updateJobController)

//CREATR JOB || delete

router.delete('/delete-job/:id',userAuth,deleteJobController)


//Jobs STATS FILTER || GET

router.get('/job-stats',userAuth,jobStatsController)



export default router