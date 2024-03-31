import React, {useState, useEffect} from "react";
import { useParams , useNavigate} from "react-router-dom";
import axios from 'axios' 
function UpdateFinish (){
    const{id}=useParams()
    const [finishType,setFinishType]=useState()
const [description,setDescription]=useState()
const navigate=useNavigate()

useEffect(()=>{

    axios.get('http://localhost:3001/getFinish'+id)
    .then(result=>{console.log(result)
    setFinishType(result.data.finishType)
    setDescription(result.data.description)


    })
    .catch(err=>console.log(err))
},[])

const Update=(e)=>{
    e.preventDefault();
    axios.put("http://localhost:3001/updateFinish/"+id , {finishType,description})
    .then(result=>{
        console.log(result)
        navigate('/')
    })
    .catch(err=>console.log(err))
}

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Finish</h2>
                    <div className='mb-2'>
                        <label htmlFor="">FinishType</label>
                        <input type="text" placeholder="Enter FinishType" className="form-control" 
                        value={finishType}  onChange={(e)=>setFinishType(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder="Enter Description" className="form-control" 
                        value={description}  onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Update</button>
                    
                </form>
            </div>
            </div>
    )
}
export default UpdateFinish;