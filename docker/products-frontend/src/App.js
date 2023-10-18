import axios from "axios";
import Table from "./components/Table"
import React, {useState, useEffect} from "react";

function App() {

  const [products, setProducts] = useState([{}])
  useEffect(()=>{
    axios.get("http://localhost:5000/product")
    .then((response)=>{
      if(response.data && response.data.length > 0){
        setProducts(response.data)

      }
    })
    .catch((error)=>{

    })
  })

  return (
    <div>
      <Table data={products} />

    </div>
  );
}

export default App;
