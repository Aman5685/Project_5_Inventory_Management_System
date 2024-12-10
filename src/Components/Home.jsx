//import React from 'react';
import "./Home.css";
import { useState } from "react";

function Home() {
    const [formData, setFormData] = useState({ productName: '', quantity: '', price: '' });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalValue = formData.quantity * formData.price;
    const newEntry = { 
      ...formData, 
      datetimeSubmitted: new Date().toLocaleString(), 
      totalValue 
    };
    setSubmittedData([...submittedData, newEntry]);
    setFormData({ productName: '', quantity: '', price: '' });
  };

  const handleEdit = (index, updatedEntry) => {
    const updatedData = submittedData.map((entry, i) => (i === index ? updatedEntry : entry));
    setSubmittedData(updatedData);
  };

  const totalSum = submittedData.reduce((acc, entry) => acc + entry.totalValue, 0);

  return (
   <>
   <div className="App">
      <h1>Product Inventory Form</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="productName" 
          value={formData.productName} 
          onChange={handleChange} 
          placeholder="Product Name" 
          required 
        />
        <input 
          type="number" 
          name="quantity" 
          value={formData.quantity} 
          onChange={handleChange} 
          placeholder="Quantity in Stock" 
          required 
        />
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          placeholder="Price per Item" 
          required 
        />
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity in Stock</th>
            <th>Price per Item</th>
            <th>Datetime Submitted</th>
            <th>Total Value Number</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="submitted">
          {submittedData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.productName}</td>
              <td>{entry.quantity}</td>
              <td>{entry.price}</td>
              <td>{entry.datetimeSubmitted}</td>
              <td>{entry.totalValue.toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(index, { ...entry, productName: prompt("Edit Product Name", entry.productName), quantity: prompt("Edit Quantity", entry.quantity), price: prompt("Edit Price", entry.price) })}>Edit</button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="Total-sum" colSpan="4">Total Sum:</td>
            <td className="total-fixed">{totalSum.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
   </>    
)
}

export default Home
