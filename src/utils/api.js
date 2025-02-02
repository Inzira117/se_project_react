const baseUrl = "http://localhost:3001";

const checkResponse = (res) =>
  res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status}: ${res.statusText}`);

const getItems = () => fetch(`${baseUrl}/items`).then(checkResponse);

const addItem = (item) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...item, _id: Date.now() }),
  }).then(checkResponse);

const deleteItem = (itemId) =>
  fetch(`${baseUrl}/items/${itemId}`, { method: "DELETE" }).then(checkResponse);

export { getItems, addItem, deleteItem };
