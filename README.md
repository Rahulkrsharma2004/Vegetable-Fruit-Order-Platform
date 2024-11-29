# Bulk Vegetable/Fruit Ordering Platform

This project is a web application designed to facilitate bulk vegetable/fruit orders. Buyers can browse available products, place bulk orders, and track their status, while admins can manage orders and inventory efficiently.

## Objective

Create a web application to facilitate bulk vegetable/fruit orders, enabling buyers to browse products, place orders, and track their status, and allowing admins to manage orders and inventory.

## Features

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
