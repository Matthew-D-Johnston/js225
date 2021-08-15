"use strict";

function Item(sku, name, category, quantity) {
  this.sku = sku;
  this.name = name;
  this.category = category;
  this.quantity = quantity;
}

const ItemManager = (function() {
  function validItemName(name) {
    let charCount = (name.match(/[A-Z]/ig) || []).length;
    return charCount >= 5;
  }

  function validCategory(category) {
    let whitespaceCount = (category.match(/\s/g) || []).length;
    return whitespaceCount === 0 && category.length >= 5;
  }

  function createSKU(name, category) {
    let nameChars = name.match(/[A-Z]/ig).slice(0, 3).join('');
    let categoryChars = category.match(/[A-Z]/ig).slice(0, 2).join('');
    return (nameChars + categoryChars).toUpperCase();
  }

  function locateItem(sku, items) {
    return items.filter(item => item.sku === sku)[0];
  }

  return {
    items: [],

    create(name, category, quantity) {
      if (validItemName(name) && validCategory(category) && quantity !== undefined) {
        let sku = createSKU(name, category);
        let item = new Item(sku, name, category, quantity);
        this.items.push(item);
        return item;
      } else {
        return { notValid: true };
      }
    },

    update(sku, item) {
      let itemToUpdate = locateItem(sku, this.items);
      Object.assign(itemToUpdate, item);
    },

    delete(sku) {
      let itemToDelete = locateItem(sku, this.items);
      let index = this.items.indexOf(itemToDelete);
      this.items.splice(index, 1);
    },

    inStock() {
      let itemsInStock = this.items.filter(item => item.quantity > 0);
      return itemsInStock;
    },

    itemsInCategory(category) {
      let itemsInCategory = this.items.filter(item => item.category === category);
      return itemsInCategory;
    },
  };
})();

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  createReporter(sku) {
    let item = this.items.items.filter(item => item.sku === sku)[0];

    return new Reporter(item);
  },

  reportInStock() {
    let itemsInStock = this.items.inStock();
    let inStockItemNames = itemsInStock.map(item => item.name);
    console.log(inStockItemNames.join(','));
  },
};

function Reporter(item) {
  this.itemInfo = function() {
    Object.getOwnPropertyNames(item).forEach(prop => {
      console.log(prop + ': ' + item[prop]);
    });
  };
}


console.log(ItemManager.create('basket ball', 'sports', 0));
console.log(ItemManager.create('asd', 'sports', 0));
console.log(ItemManager.create('soccer ball', 'sports', 5));
console.log(ItemManager.create('football', 'sports'));
console.log(ItemManager.create('football', 'sports', 3));
console.log(ItemManager.create('kitchen pot', 'cooking items', 0));
console.log(ItemManager.create('kitchen pot', 'cooking', 3));

console.log(ItemManager.items);

ReportManager.init(ItemManager);
ReportManager.reportInStock();

console.log(ReportManager.items.items);

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
