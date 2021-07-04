##### JS225 - Object Oriented JavaScript > Object Creation Patterns

---

## Mini Inventory Management System

In this exercise, you'll build a simple inventory management system. The system is composed of an item creator, an items manager, and a reports manager. The item creator makes sure that all necessary information are present and valid. The item manager is responsible for creating items, updating information about items, deleting items, and querying information about the items. Finally, the report manager generates reports for a specific item or ALL items. Reports for specific items are generated from report objects created from the report manager. The report manager is responsible for reports for all items.  

###### Component Specifications

Here's all the required information for an item:

1. **SKU code**: This is the unique identifier for a product. It consists of the first 3 letters of the item and the first 2 letters of the category. If the item name consists of two words and the first word consists of two letters only, the next letter is taken from the next word.
2. **Item name**: This is the name of the item. It must consist of a minimum of 5 characters. Spaces are not counted as characters.
3. **Category**: This is the category that the item belongs to. It must consist of a minimum of 5 characters and be only one word.
4. **Quantity**: This is the quantity in stock of an item. This must not be blank. You may assume that a valid number will be provided.  

The following are the methods that the items manager can perform:

1. `create`: This method creates a new item. Returns false if creation is not successful.
2. `update`: This method accepts an SKU Code and an object as an argument and updates any of the information on an item. You may assume valid values will be provided.
3. `delete`: This method accepts an SKU Code and deletes the item from the list. You may assume a valid SKU code is provided.
4. `items`: This property returns all the items.
5. `inStock`: This method lists all the items that have a quantity greater than `0`.
6. `itemsInCategory`: This method lists all the items for a given category

The following are the methods on the reports managers:

1. `init`: This method accepts the `ItemManager` object as an argument and assigns it to the `items` property.

2. ```
   createReporter
   ```

   : This method accepts an SKU code as an argument and returns an object.

   - The returned object has one method, `itemInfo`. It logs to the console all the properties of an object as "key:value" pairs (one pair per line). There are no other properties or methods on the returned object (except for properties/methods inherited from `Object.prototype`).

3. `reportInStock`: Logs to the console the item names of all the items that are in stock as a comma separated values.

Notes:

- There's no need to add the ability to validate the uniqueness of the SKU code. Given the current description, it's possible that a duplicate will exist.
- Each required piece of information for an item corresponds to one property.
- If any of the information provided is not valid, the item creator returns an object with a `notValid` property with a value of `true`.
- The created item objects should not have any methods/properties on them other than the required information above and those inherited from `Object.prototype`.
- You may add methods to the item manager as you deem necessary.

Here is a sample run that you can use a reference:

```javascript
ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

ItemManager.items;
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
ItemManager.items;
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
```

---

###### My Solution

There are three main components to think about:

1. A class from which to create item objects.
2. An `ItemManager` object with a single `items` property and five methods (and any others deemed necessary).
3. A `ReportManager` object with three methods.

#### Item Objects

Items will have four properties and possibly a fifth:

1. **SKU code:** created from first 3 letters of the item name and first 2 letters of item category.
2. **Item name:** minimum of 5 characters and spaces do not count as characters.
3. **Category:** minimum of 5 characters and only one word.
4. **Quantity:** quantity of item in stock (a value must be provided).
5. **`notValid`**: if any information provided for the above properties is invalid, this property is created and given a value of `true`.

```javascript
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
```

#### Item Manager

The `ItemManager` has a single property:

1. `items`: this should be an array that stores all successfully created items.

The `ItemManager` has the following methods:

1. `create`: creates a new item and as long as the new item does not have a `notValid` property (with a value of `true`), it will push the item to the `items` list; otherwise, it will return false.
2. `update(sku, object)`: 
   * matches the `sku` to one of the items in the `items` list
   * makes the necessary update using the `object` (use `Object.assign(target, source)` method);
   * if there is no item in the list that contains the `sku`, then return `'Item does not exist.'`.
3. `delete(sku)`:
   * assume valid sku code is provided
   * find the item with that sku in the `items` list and delete it from the list.
   * if the item does not exist in the list, return `Item does not exist.`.
4. `inStock`: lists all the items that have a quantity greater than `0`.
5. `itemsInCategory(category)`: lists all the items for a given category.

```javascript
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
```

#### Reports Manager

The `ReportManager` has one property:

1. `items`: assigned to the `ItemManager`

It has two methods:

1. `createReporter(sku)`: 
   * returns an object; the object should be the object that corresponds to the given sku code.
   * the object has one method: `itemInfo`, which logs to the console all the properties of an object as "key: value" pairs
2. `reportInStock`: logs to the console the item names of all the items that are in stock as a comma separated values

```javascript
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
```

###### LS Solution

```javascript
const ItemCreator = (() => {
  function generateSkuCode(itemName, category) {
    return (itemName.replace(/\s/g, '').slice(0, 3).toUpperCase() + 
            category.replace(/\s/g, '').slice(0, 2).toUpperCase());
  }
  
  function isValidItemName(itemName) {
    return itemName.replace(/\s/g, '').length >= 5;
  }
  
  function isValidCategory(category) {
    return category.replace(/\s/g, '').length >= 5 && category.split(' ').length === 1;
  }
  
  function isQuantityProvided(quantity) {
    return quantity !== undefined;
  }
  
  return function(itemName, category, quantity) {
    if (isValidItemName(itemName) && isValidCategory(category) && isQuantityProvided(quantity)) {
      this.skuCode = generateSkuCode(itemName, category);
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  }
})();

const ItemManager = {
  items: [],
  getItem(skuCode) {
    return this.items.filter(item => item.skuCode === skuCode)[0];
  },
  
  create(itemName, category, quantity) {
    const item = new ItemCreator(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    }
  },
  
  update(skuCode, itemInformation) {
    Object.assign(this.getItem(skuCode), itemInformation);
  },
  
  delete(skuCode) {
    this.items.splice(this.items.indexOf(this.getItem(skuCode)), 1);
  },
  
  list() {
    return this.items;
  },
  
  inStock() {
    return this.items.filter(({quantity}) => quantity > 0);
  },
  
  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },
};

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },
  
  createReporter(skuCode) {
    return (() => {
      const item = this.items.getItem(skuCode);
      return {
        itemInfo() {
          Object.keys(item).forEach(key => {
            console.log(`${key}: ${item[key]}`);
          });
        },
      };
    })();
  },
  
  reportInStock() {
    console.log(this.items.inStock().map(({itemName}) => itemName).join(','));
  },
};
```

###### Discussion

The key take-away for this exercise is practicing creating and using objects that interact or collaborate with each other. The notable parts of the solution are the following:

- Using a constructor function that has private methods.
- Having an explicit return value for a constructor function.
- Maintaining a reference to an object using closures (i.e., `createReporter` method of `ReportManager`).



