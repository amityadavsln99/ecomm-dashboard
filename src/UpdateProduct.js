import Header from "./Header";
import {withRouter,useParams} from 'react-router-dom';
import { useEffect, useState } from "react";

function UpdateProduct(props){
    // console.warn(props);
    const { id } = useParams();
    console.warn(id);
    const [data,setData] = useState([]);

    const [name,setName]=useState("");
    const [file,setFile]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");

    useEffect(() => {
        fetchData();
    },[]);
    const fetchData = async () => {
        let result = await fetch('http://localhost:8000/api/product/'+id)
        result = await result.json();
        setData(result);
        setName(result.name);
        setPrice(result.price);
        setDescription(result.description);
        setFile(result.file_path);
    };
    async function ediProduct(id){
        const formData = new FormData();
        formData.append("file",file);
        formData.append("name",name);
        formData.append("price",price);
        formData.append("description",description);
        // let result = await fetch('http://localhost:8000/api/updateproduct/'+id+'?_method=PUT',{
        let result = await fetch('http://localhost:8000/api/updateproduct/'+id,{
            method: 'POST',
            body: formData
        });
        alert("Data has been updated");
    }
    return(
        <div>
            <Header/>
            <div className="col-sm-6 offset-sm-3">
                <h1>Update Product</h1>
                <br/>
                <input type="text" onChange={(e)=>setName(e.target.value)} defaultValue={data.name} className="form-control" placeholder="Name" /><br/>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} defaultValue={data.file_path} className="form-control" placeholder="Name" /><br/>
                <img style={{width:50}} src={"http://localhost:8000/"+data.file_path} /><br/><br/>
                <input type="text" onChange={(e)=>setPrice(e.target.value)} className="form-control" defaultValue={data.price} placeholder="Price" /><br/>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} defaultValue={data.description} className="form-control" placeholder="Description" /><br/>
                <button onClick={()=>ediProduct(data.id)}>Update Product</button>
            </div>
        </div>
    )
}
export default UpdateProduct;