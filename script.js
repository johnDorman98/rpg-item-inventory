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
}

const inventoryItems = [];

// Instantiates a new item and adds it to the master collection
function addItemToInventory(name, type, quantity) {
  const newItem = new Item(name, type, quantity);
  inventoryItems.push(newItem);
}