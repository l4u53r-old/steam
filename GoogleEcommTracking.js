// load ecommerce plugin
ga('require', 'ecommerce');

// add transaction
ga('ecommerce:addTransaction', {
    'id': '1234',                     // Transaction ID. Required.
    'affiliation': 'Acme Clothing',   // Affiliation or store name.
    'revenue': '11.99',               // Grand Total.
    'shipping': '5',                  // Shipping.
    'tax': '1.29'                     // Tax.
});

// add item
ga('ecommerce:addItem', {
    'id': '1234',                     // Transaction ID. Required.
    'name': 'Fluffy Pink Bunnies',    // Product name. Required.
    'sku': 'DD23444',                 // SKU/code.
    'category': 'Party Toys',         // Category or variation.
    'price': '11.99',                 // Unit price.
    'quantity': '1'                   // Quantity.
});

// send data
ga('ecommerce:send');
