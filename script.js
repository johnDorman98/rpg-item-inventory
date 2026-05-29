// Represents a single piece of gear in the player's inventory
function Item(name, type, quantity) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.type = type;
  this.quantity = quantity;
}

// Reductions when a player consumes or equips an item
Item.prototype.useItem = function () {
  this.quantity -= 1;
};

// Instantiates a new item and adds it to the master collection
function addItemToInventory(name, type, quantity) {
  const newItem = new Item(name, type, quantity);
  inventoryItems.push(newItem);
}

function displayInventory(inventory) {
  const inventoryContainer = document.querySelector(".inventory-container");
  inventoryContainer.textContent = "";

  inventory.forEach(item => {
    const inventoryCard = document.createElement("div");
    inventoryCard.classList.add("inventory-card")
  });
}

const inventoryItems = [];

// Handle form submissions.
const form = document.querySelector("#add-item-form");

form.addEventListener("submit", (event) => {
  // Prevent default behavior
  event.preventDefault();

  // Extract values from submitted form.
  const newItemName = event.target.elements["new-item-name"].value;
  const newItemType = event.target.elements["new-item-type"].value;
  const newItemQuantity = Number(
    event.target.elements["new-item-quantity"].value,
  );

  // Create new Item object
  addItemToInventory(newItemName, newItemType, newItemQuantity);
});
