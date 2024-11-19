const {createPatient,getPatients,createTreat,updateClientDetailsM,deleteP,logInM} = require('../models/patientModel')

async function create(req, res) {
    console.log("im in patient-controller")
    const { id, name, phone } = req.body;
    res.send(await createPatient( id, name, phone ))

    // const { date, time, treatmentType,id } = req.body;
    // res.send(await createTreat(date, time, treatmentType,id))
  }


async function getAllDetails(req,res) {
  const details= await getPatients();
  res.send(details)
  console.log(details)
}

async function updateClientDetails(req,res)  {
  console.log(req.body)
  const { id, name, phone } = req.body;
  res.send(await updateClientDetailsM( id, name, phone ))
}

async function deletePatient(req,res){
  const id = req.params.id;
  console.log(id)
  res.send(await deleteP(id))

}

async function logIn(req,res){
  const {id,name}=req.body;
  console.log(id)
  console.log(name)
  res.send(logInM(id,name))
}
  module.exports={create,getAllDetails,updateClientDetails,deletePatient,deleteP,logIn}