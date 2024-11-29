import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../pages/Modal";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = () => {
    axios
      .get("https://veg-order-platform.vercel.app/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  };

  const fetchProducts = () => {
    axios
      .get("https://veg-order-platform.vercel.app/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handleStatusChange = (id, status) => {
    axios
      .put(`https://veg-order-platform.vercel.app/orders/status/${id}`, {
        status,
      })
      .then((response) => {
        setOrders(
          orders.map((order) => (order._id === id ? response.data : order))
        );
        toast.success("Order status updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the order status!", error);
        toast.error("Failed to update order status!");
      });
  };

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.description) {
      toast.error("Please fill in all fields");
      return;
    }

    axios
      .post("https://veg-order-platform.vercel.app/products/post", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        toast.success("Product created successfully!");
        setNewProduct({ name: "", price: "", stock: "", description: "" });
      })
      .catch((error) => {
        console.error("There was an error creating the product!", error);
        toast.error("Failed to create product!");
      });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdateProduct = () => {
    if (
      !editingProduct.name ||
      !editingProduct.price ||
      !editingProduct.stock ||
      !editingProduct.description
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    axios
      .put(
        `https://veg-order-platform.vercel.app/products/update/${editingProduct._id}`,
        editingProduct
      )
      .then((response) => {
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        toast.success("Product updated successfully!");
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("There was an error updating the product!", error);
        toast.error("Failed to update product!");
      });
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`https://veg-order-platform.vercel.app/products/delete/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
        toast.success("Product deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
        toast.error("Failed to delete product!");
      });
  };

  return (
    <div className="admin-dashboard p-6 bg-green-50 min-h-screen">
      <ToastContainer />

      {/* Order Management */}
      <div className="order-management mb-8">
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
          Order Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                {/* <img
                  src={order.product.imageUrl || 'https://via.placeholder.com/150'}
                  alt={order.product.name}
                  className="w-full h-40 object-cover rounded-lg"
                /> */}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-green-600">
                Order ID: {order._id}
              </h3>
              {/* <p className="mb-1"><span className="font-semibold">Product:</span> {order.name}</p> */}
              <p className="mb-1">
                <span className="font-semibold">Quantity:</span>{" "}
                {order.quantity}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Status:</span> {order.status}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Delivery Address:</span>{" "}
                {order.deliveryAddress}
              </p>
              <select
                className="mt-2 p-2 border rounded w-full bg-green-50"
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Management */}
      <div className="inventory-management">
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">
          Inventory Management
        </h2>

        {/* Create Product Form */}
        <div className="create-product mb-8">
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Create Product
          </h3>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleProductChange}
            placeholder="Product Name"
            className="block mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleProductChange}
            placeholder="Product Price"
            className="block mb-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleProductChange}
            placeholder="Product quantity"
            className="block mb-2 p-2 border rounded w-full"
          />
          {/* <input
            type="text"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleProductChange}
            placeholder="Image URL"
            className="block mb-2 p-2 border rounded w-full"
          /> */}
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleProductChange}
            placeholder="Description"
            className="block mb-2 p-2 border rounded w-full"
          />
          <button
            onClick={handleCreateProduct}
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 transition-all duration-300"
          >
            Create Product
          </button>
        </div>

        {/* Product List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-green-600">
                {product.name}
              </h3>
              <p className="mb-1">
                <span className="font-semibold">Price:</span> ${product.price}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Stock:</span> {product.stock}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-blue-700 text-white py-1 px-3 rounded hover:bg-blue-600 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-700 text-white py-1 px-3 rounded hover:bg-red-600 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Product Modal */}
      {isModalOpen && editingProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateProduct}
        >
          <div className="edit-product">
            <h3 className="text-2xl font-bold mb-4">Edit Product</h3>
            <input
              type="text"
              name="name"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              placeholder="Product Name"
              className="block mb-2 p-2 border rounded w-full"
            />
            <input
              type="number"
              name="price"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              placeholder="Product Price"
              className="block mb-2 p-2 border rounded w-full"
            />
            <input
              type="number"
              name="stock"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
              placeholder="Product quantity"
              className="block mb-2 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="description"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              placeholder="Description"
              className="block mb-2 p-2 border rounded w-full"
            />
            <button
            onClick={handleUpdateProduct}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Update Product
          </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminDashboard;
