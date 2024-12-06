# Bulk Vegetable/Fruit Ordering Platform

This project is a web application designed to facilitate bulk vegetable/fruit orders. Buyers can browse available products, place bulk orders, and track their status, while admins can manage orders and inventory efficiently.

## Objective

Create a web application to facilitate bulk vegetable/fruit orders, enabling buyers to browse products, place orders, and track their status, and allowing admins to manage orders and inventory.

## Image

<img width="943" alt="pic1" src="https://github.com/user-attachments/assets/6b5b93b4-49ca-4752-8920-f99f0e47853d">
<img width="889" alt="pic2" src="https://github.com/user-attachments/assets/c8d3f23b-a8e7-4f0a-9c01-a24af7752eab">
<img width="944" alt="img3" src="https://github.com/user-attachments/assets/4604fc46-eee3-4b9d-af74-e5b7d05a5969">
<img width="905" alt="img4" src="https://github.com/user-attachments/assets/821df114-eb65-4f00-bc1a-a65c8c760f38">
<img width="949" alt="img5" src="https://github.com/user-attachments/assets/655209ea-4271-4286-948e-2d95757aa2e0">
<img width="942" alt="img6" src="https://github.com/user-attachments/assets/a44fd217-bce0-4a82-8356-8fa0cd99f3c3">
<img width="945" alt="img7" src="https://github.com/user-attachments/assets/2503fa5e-6b0c-4f2d-9e4a-7e4a0bb289f2">
<img width="945" alt="img8" src="https://github.com/user-attachments/assets/b0843f1b-31fe-47c1-a64c-77104ef145be">


### For Buyers

1. **Browse Vegetables/Fruits**
   - Display a product catalog with basic details such as the name and price per unit.
   - No stock tracking is required.

2. **Place Orders**
   - Allow buyers to request bulk orders by specifying the vegetable/fruit, quantity, and delivery details (name, contact information, delivery address).
   - Save the order in the database with a unique identifier.

3. **Order Tracking**
   - Enable buyers to check the status of their placed orders, which should update as:
     - Pending: Order has been received.
     - In Progress: Order is being processed for delivery.
     - Delivered: Order has been delivered successfully.

### For Admin

1. **Order Management**
   - View all placed orders with buyer details, delivery address, and the list of requested items.
   - Update the order status (Pending → In Progress → Delivered).

2. **Inventory Management**
   - Add, edit, or remove vegetables/fruits from the catalog.
   - No stock tracking is required. Assume all requested items are always available.

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS for styling
  - Axios for API requests

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

- **Deployment**:
  - Vercel for frontend
  - Vercel for backend

## Database

- MongoDB

## Installation

### Prerequisites

- Node.js
- npm

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Rahulkrsharma2004/bulk-order-platform.git
   cd bulk-order-platform/backend-app
   
### frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Rahulkrsharma2004/bulk-order-platform.git
   cd bulk-order-platform/frontend-app
