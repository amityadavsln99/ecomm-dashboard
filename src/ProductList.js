import Header from "./Header";
import React,{useState,useEffect} from "react";
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
function ProductList(){
    const [data,setData] = useState([]);
    // useEffect( async ()=>{
    //     let result = await fetch('http://localhost:8000/api/list');
    //     result = await result.json();
    //     setData(result);
    // },[]);
    useEffect(() => {
        fetchData();
    }, []);
    async function deleteOperation(id){
        let result = await fetch("http://localhost:8000/api/delete/"+id,{
            method:'DELETE',
        });
        result=await result.json();
        fetchData();
    }
    const fetchData = async () => {
        let result = await fetch('http://localhost:8000/api/list');
        result = await result.json();
        setData(result);
    };
    return(
        <div>
            <Header/>
            <div className="col-sm-8 offset-sm-2">
                <h1>Product List</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item)=>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><img style={{width:100}} src={"http://localhost:8000/"+item.file_path} /></td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <span onClick={()=>{deleteOperation(item.id)}} className="delete">Delete</span>
                                    </td>
                                    <td>
                                        <Link to={"update/"+item.id}><span className="update">Update</span></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default ProductList;