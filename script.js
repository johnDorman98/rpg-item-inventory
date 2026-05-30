// Represents a single piece of gear in the player's inventory
function Item(name, type, quantity) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.type = type;
  this.quantity = quantity;
}

// Reductions when a player consumes or equips an item
Item.prototype.useItem = function () {
  if (this.quantity > 0) {
    this.quantity -= 1;
  }
};

// Instantiates a new item and adds it to the master collection
function addItemToInventory(name, type, quantity) {
  const newItem = new Item(name, type, quantity);
  inventoryItems.push(newItem);
}

// Updates inventoryContainer with a card containing data for each inventory item.
function displayInventory(inventory) {
  // Target the grid container and wipe it to prevent duplicate cards
  const inventoryContainer = document.querySelector(".inventory-container");
  inventoryContainer.textContent = "";

  inventory.forEach((item) => {
    // Create a card for each inventory item.
    const inventoryCard = document.createElement("div");
    inventoryCard.classList.add("inventory-card");

    // Create elements to be added to inventory card
    const itemNameElement = document.createElement("h3");
    itemNameElement.textContent = item.name;
    inventoryCard.appendChild(itemNameElement);

    const itemTypeElement = document.createElement("p");
    itemTypeElement.textContent = item.type;
    inventoryCard.appendChild(itemTypeElement);

    const itemQuantityElement = document.createElement("p");
    itemQuantityElement.textContent = item.quantity;
    inventoryCard.appendChild(itemQuantityElement);

    const itemUseButton = document.createElement("button");
    itemUseButton.textContent = "Use";
    itemUseButton.dataset.id = item.id;
    inventoryCard.appendChild(itemUseButton);

    inventoryContainer.appendChild(inventoryCard);
  });
}

const inventoryItems = [];

// Display test Item on page.
const testItemOne = new Item("Test Item", "Type", 10);
inventoryItems.push(testItemOne);
displayInventory(inventoryItems);

const newItemModal = document.querySelector("#add-item-modal");
const newItemForm = document.querySelector("#add-item-form");
const formFeedbackField = document.querySelector("#form-feedback");
const inventoryContainer = document.querySelector(".inventory-container");

// Handle form submissions.
newItemForm.addEventListener("submit", (event) => {
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

  // Clear and rebuild the visible inventory list on the screen
  displayInventory(inventoryItems);

  formFeedbackField.textContent = "Item added successfully! Closing form.";

  // Disable add button to prevent duplicate items.
  const submitButton = event.target.querySelector("button[type='submit']");
  submitButton.disabled = true;

  // Close and reset form after 2000ms
  setTimeout(() => {
    newItemModal.close();
    submitButton.disabled = false;
  }, 2000);
});

// Reset form when modal is closed
newItemModal.addEventListener("close", (event) => {
  formFeedbackField.textContent = "";
  newItemForm.reset();
});


// Handle events within the inventory container to use or delete items.
inventoryContainer.addEventListener("click", (event) => {
  // Decrease the items quantity when it is used.
  if (event.target.matches("button")) {
    // Locate the used item
    const usedItemId = event.target.dataset.id;
    const usedItem = inventoryItems.find((item) => item.id === usedItemId);

    usedItem.useItem();

    // Remove the item if quantity is 0.
    if (usedItem.quantity === 0) {
      const usedItemIndex = inventoryItems.findIndex(
        (item) => item.id === usedItem.id,
      );

      inventoryItems.splice(usedItemIndex, 1);
    }

    displayInventory(inventoryItems);
  }
});
