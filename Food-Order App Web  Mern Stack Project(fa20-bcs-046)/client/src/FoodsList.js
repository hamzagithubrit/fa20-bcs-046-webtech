import React, { useEffect, useState } from "react";

export default function FoodList() {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    title: "",
    desc: "",
    price: 0,
    review: 0,
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/product");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId) => {
    setShowEditModal(true);
    setEditProductId(productId);

    const productToEdit = data.find((product) => product._id === productId);
    setEditedProduct(productToEdit);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`http://localhost:5000/product/${editProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      setShowEditModal(false);

      const updatedData = data.map((food) =>
        food._id === editProductId ? editedProduct : food
      );
      setData(updatedData);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Call the backend API to delete the product
      await fetch(`http://localhost:5000/product/${productId}`, {
        method: "DELETE",
      });

      // Update the data after successful deletion
      const updatedData = data.filter((food) => food._id !== productId);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Foods list</h1>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((food, index) => (
          <div
            key={index}
            style={{
              width: "18rem",
              margin: "0.5rem",
            }}
          >
            <div style={{ border: "1px solid #ccc", borderRadius: "0.25rem" }}>
              <div style={{ padding: "1rem" }}>
                <h5 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                  {food.title}
                </h5>
                <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                  {food.desc}
                </p>
                <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                  Price: ${food.price.toFixed(2)}
                </p>
                <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                  Rating: {food.review}
                </p>
                <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                  Category: {food.category}
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{
                      width: "100px",
                      padding: "8px",
                      marginBottom: "10px",
                      boxSizing: "border-box",
                      backgroundColor: "blue",
                    }}
                    onClick={() => handleEdit(food._id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      width: "100px",
                      padding: "8px",
                      marginBottom: "10px",
                      boxSizing: "border-box",
                      backgroundColor: "red",
                    }}
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Food Product Modal */}
      {showEditModal && (
        // <div
        //   style={{
        //     position: "fixed",
        //     top: "50%",
        //     left: "50%",
        //     transform: "translate(-50%, -50%)",
        //     backgroundColor: "white",
        //     padding: "20px",
        //     zIndex: 1000,
        //   }}
        // >
        //   <h2>Edit Food Product</h2>
        //   <form onSubmit={handleEditFormSubmit}>
        //     <div className="form-group">
        //       <label>Title:</label>
        //       <input
        //         type="text"
        //         name="title"
        //         value={editedProduct.title}
        //         onChange={handleEditFormChange}
        //         className="form-control"
        //         required
        //       />
        //     </div>
        //     <div className="form-group">
        //       <label>Description:</label>
        //       <input
        //         type="text"
        //         name="desc"
        //         value={editedProduct.desc}
        //         onChange={handleEditFormChange}
        //         className="form-control"
        //         required
        //       />
        //     </div>
        //     <div className="form-group">
        //       <label>Price:</label>
        //       <input
        //         type="number"
        //         name="price"
        //         value={editedProduct.price}
        //         onChange={handleEditFormChange}
        //         className="form-control"
        //         required
        //       />
        //     </div>
        //     <div className="form-group">
        //       <label>Review:</label>
        //       <input
        //         type="number"
        //         name="review"
        //         value={editedProduct.review}
        //         onChange={handleEditFormChange}
        //         className="form-control"
        //         required
        //       />
        //     </div>
        //     <div className="form-group">
        //       <label>Category:</label>
        //       <input
        //         type="text"
        //         name="category"
        //         value={editedProduct.category}
        //         onChange={handleEditFormChange}
        //         className="form-control"
        //         required
        //       />
        //     </div>
        //     <button type="submit" className="btn btn-primary">
        //       Save Changes
        //     </button>
        //   </form>
        //   <button onClick={() => setShowEditModal(false)}>Close Modal</button>
        // </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            width: "400px", // Set the width as per your design
          }}
        >
          <h2
            style={{ marginBottom: "20px", textAlign: "center", color: "#333" }}
          >
            Edit Food Product
          </h2>
          <form onSubmit={handleEditFormSubmit}>
            <div className="form-group">
              <label style={{ marginBottom: "5px", color: "#555" }}>
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={editedProduct.title}
                onChange={handleEditFormChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "5px", color: "#555" }}>
                Description:
              </label>
              <input
                type="text"
                name="desc"
                value={editedProduct.desc}
                onChange={handleEditFormChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "5px", color: "#555" }}>
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleEditFormChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "5px", color: "#555" }}>
                Review:
              </label>
              <input
                type="number"
                name="review"
                value={editedProduct.review}
                onChange={handleEditFormChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ marginBottom: "5px", color: "#555" }}>
                Category:
              </label>
              <input
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleEditFormChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          </form>
          <button
            onClick={() => setShowEditModal(false)}
            style={{
              marginTop: "10px",
              padding: "8px",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close Modal
          </button>
        </div>
      )}
    </div>
  );
}
