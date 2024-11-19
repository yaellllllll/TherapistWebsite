const express = require ('express');
const patientRouter = express.Router();
const {create,getAllDetails,updateClientDetails,deletePatient,logIn} = require('../controllers/patientController');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

patientRouter.route('/')
.post(create)
.get(getAllDetails)


patientRouter.route('/update')
.post(updateClientDetails)

patientRouter.route('/:id')
.delete(deletePatient)
.post(logIn)


module.exports = patientRouter;