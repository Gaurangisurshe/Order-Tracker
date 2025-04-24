// script.js

const statusCycle = ["Pending", "Preparing", "Out for Delivery", "Delivered"];
let myOrderId = null;

function placeOrder() {
  const item = document.getElementById('orderInput').value.trim();
  if (!item) return alert("Please enter an order.");

  const order = {
    id: Date.now().toString(),
    item: item,
    status: "Pending"
  };

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  myOrderId = order.id;
  renderOrders();
  updateMyOrderStatus();
}

function updateStatus(id) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const order = orders.find(o => o.id === id);
  const currentIndex = statusCycle.indexOf(order.status);
  if (currentIndex < statusCycle.length - 1) {
    order.status = statusCycle[currentIndex + 1];
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
    updateMyOrderStatus();
  }
}

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const container = document.getElementById("orderList");
  container.innerHTML = "";

  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order";
    div.innerHTML = `
      <strong>Item:</strong> ${order.item} <br/>
      <strong>Status:</strong> ${order.status}<br/>
      <button onclick="updateStatus('${order.id}')">Next Status</button>
    `;
    container.appendChild(div);
  });
}



function updateMyOrderStatus() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const myOrder = orders.find(o => o.id === myOrderId);
  const statusText = myOrder ? `Order Status: ${myOrder.status}` : "No order placed yet.";
  document.getElementById("myOrderStatus").innerText = statusText;
}

renderOrders(); // Load orders on page load
