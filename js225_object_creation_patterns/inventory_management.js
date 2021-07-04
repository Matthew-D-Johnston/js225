"use strict";

let itemCreator = function(name, category, quantity) {
  function isValidName(itemName) {
    let strippedName = itemName.replace(/\s/g, '');
    return strippedName.length >= 5;
  }

  function isValidCategory(itemCategory) {
    return !(itemCategory.match(/\s/g)) && itemCategory.length >= 5;
  }

  function isValidQuantity(itemQuantity) {
    return typeof itemQuantity === 'number';
  }

  function skuCreator(itemName, itemCategory) {
    return (itemName.slice(0, 3) + itemCategory.slice(0, 2)).toUpperCase();
  }

  if (isValidName(name) && isValidCategory(category) && isValidQuantity(quantity)) {
    return {
      sku: skuCreator(name, category),
      name,
      category,
      quantity,
    }
  } else if (!isValidName(name) || !isValidCategory(category)) {
    return {
      sku: 'N/A',
      name,
      category,
      quantity,
      notValid: true,
    }
  } else {
    return {
      sku: skuCreator(name, category),
      name,
      category,
      quantity,
      notValid: true,
    }
  }
};


const ItemManager = {
  items: [],

  create(name, category, quantity) {
    let item = new itemCreator(name, category, quantity);

    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
      return true;
    }
  },

  update(sku, obj) {
    if (this.findItem(sku)) {
      Object.assign(this.findItem(sku), obj);
    } else {
      console.log('Item does not exist.');
    }
  },

  delete(sku) {
    if (this.findItem(sku)) {
      let deletionIndex;

      for (let index = 0; index < this.items.length; index += 1) {
        if (this.items[index].sku === sku) {
          deletionIndex = index;
        }
      }

      this.items.splice(deletionIndex, 1);
    } else {
      console.log('Item does not exist.');
    }
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },

  findItem(sku) {
    for (let index = 0; index < this.items.length; index += 1) {
      if (this.items[index].sku === sku) {
        return this.items[index];
      }
    }

    return false;
  },
}

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  createReporter(sku) {
    if (this.items.findItem(sku)) {
      let item = this.items.findItem(sku);
      Object.setPrototypeOf(item, Reporter);
      return item;
    } else {
      return 'Item does not exist';
    }
  },

  reportInStock() {
    let inStockItems = this.items.inStock();
    console.log(inStockItems.map(item => item.name).join(','));
  },
}

const Reporter = {
  init(sku, name, category, quantity) {
    this.sku = sku;
    this.name = name;
    this.category = category;
    this.quantity = quantity;
  },

  itemInfo(sku) {
    let properties = Object.keys(this);
    properties.forEach(prop => console.log(prop + ': ' + this[prop]));
  },
};

ItemManager.create('basket ball', 'sports', 0);
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);

console.log(ItemManager.items);

ReportManager.init(ItemManager);
ReportManager.reportInStock();

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());

ReportManager.reportInStock();

console.log(ItemManager.itemsInCategory('sports'));

ItemManager.delete('SOCSP');
console.log(ItemManager.items);

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
