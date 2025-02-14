import Header from "./Header";
import { useState } from "react";
function AddProduct(){
    const [name,setName]=useState("");
    const [file,setFile]=useState("");
    const [price,setPrice]=useState("");
    const [description,setDescription]=useState("");
    async function addProduct(){
        const formData = new FormData();
        formData.append("file",file);
        formData.append("name",name);
        formData.append("price",price);
        formData.append("description",description);
        let result = await fetch('http://localhost:8000/api/addProduct',{
            method: 'POST',
            body: formData
        });
        alert("Data has been saved");
    }
    return(
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <br/>
                <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name" /><br/>
                <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="form-control" placeholder="Name" /><br/>
                <input type="text" onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Price" /><br/>
                <input type="text" onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description" /><br/>
                <button onClick={addProduct}>Add Product</button>
            </div>
        </div>
    )
}
export default AddProduct;