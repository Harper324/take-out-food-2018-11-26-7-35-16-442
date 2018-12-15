function bestCharge(selectedItems) {
  getItemIdQuality(selectedItems);
  var itemIdPriceQuality = getItemIdPriceQuality(selectedItems);
  var reduceMoneyPrice = getReduceMoneyPrice(itemIdPriceQuality);
  var halfDiscountPrice = getHalfDiscountPrice(itemIdPriceQuality);

  var result = compareTwoPrice(reduceMoneyPrice, halfDiscountPrice, itemIdPriceQuality);
  return result;
}
function getItemIdPriceQuality(selectedItems) {
  var itemIdAndQuality = getItemIdQuality(selectedItems);
  var itemIdPriceQuality = itemIdAndQuality.map(function (element) {
    element.price = (loadAllItems().find(function (ele) {
      return element.id === ele.id;
    })).price;
    element.name = (loadAllItems().find(function (ele) {
      return element.id === ele.id;
    })).name;
    return element;

  });
  return itemIdPriceQuality;
}
function getItemIdQuality(selectedItems) {
  let itemIdAndQuality = selectedItems.map(function (element) {
    var idAndQuality = {
      id: element.slice(0, 8),
      quality: element.slice(-1)
    };
    return idAndQuality;
  });
  return itemIdAndQuality;
}

function getReduceMoneyPrice(itemIdPriceQuality) {
  var itemPrice = itemIdPriceQuality.map(function (element) {
    return element.price * element.quality;
  });
  var totalPrice = itemPrice.reduce(function (a, b) {
    return a + b;
  });
  var reduceMoneyPrice = {};
  if (totalPrice > 30) {
    reduceMoneyPrice.总计 = totalPrice - 6;
  } else {
    reduceMoneyPrice = { 总计: totalPrice };
  }
  return reduceMoneyPrice;
}

function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

function getHalfDiscountPrice(itemIdPriceQuality) {

  var discountItems = (itemIdPriceQuality.filter(function (element) {
    return (loadPromotions()[1].items.includes(element.id));
  })).map(x => x.name);

  var itemPrice = itemIdPriceQuality.map(function (element) {
    if (loadPromotions()[1].items.includes(element.id)) {
      return element.price * element.quality / 2;
    } else {
      return element.price * element.quality;
    }

  });
  var totalPrice = itemPrice.reduce(function (a, b) {
    return a + b;
  });
  var halfDiscountPrice = {};
  if (discountItems) {
    halfDiscountPrice.半价菜品 = discountItems.join();
    halfDiscountPrice.总计 = totalPrice;
  } else {
    halfDiscountPrice.总计 = totalPrice;
  }
  return halfDiscountPrice;
}
function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

function compareTwoPrice(reduceMoneyPrice, halfDiscountPrice, itemIdPriceQuality) {
  var itemPrice = [];
  for (var i = 0; i < itemIdPriceQuality.length; i++) {
    itemPrice[i] = itemIdPriceQuality[i].name + ' × ' + itemIdPriceQuality[i].quality + ' = ' + itemIdPriceQuality[i].quality * itemIdPriceQuality[i].price + '元';
  }
  itemPrice = itemPrice.join('\n');
  var savedMoney = reduceMoneyPrice.总计 + 6 - halfDiscountPrice.总计;
  var order;
  if (reduceMoneyPrice.总计 <= halfDiscountPrice.总计 && halfDiscountPrice.半价菜品) {
    order = '============= 订单明细 =============\n' + itemPrice + '\n' + '-----------------------------------' + '\n' + '使用优惠：' + '\n' + '满30减6元，省6元' + '\n' + '-----------------------------------' + '\n' + '总计：' + reduceMoneyPrice.总计 + '元' + '\n' + '===================================';

  } else if (reduceMoneyPrice.总计 > halfDiscountPrice.总计) {
    order = '============= 订单明细 =============\n' + itemPrice + '\n' + '-----------------------------------' + '\n' + '使用优惠：' + '\n' + '指定菜品半价（' + halfDiscountPrice.半价菜品 + '), 省' + savedMoney + '元' + '\n' + '-----------------------------------' + '\n' + '总计：' + halfDiscountPrice.总计 + '元' + '\n' + '===================================';

  } else {
    order = '============= 订单明细 =============\n' + itemPrice + '\n' + '-----------------------------------' + '\n' + '总计：' + reduceMoneyPrice.总计 + '元' + '\n' + '===================================';
  }
  return order;
}



function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}

console.log(bestCharge(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]));
console.log(bestCharge(["ITEM0013 x 4", "ITEM0022 x 1"]));
console.log(bestCharge(["ITEM0013 x 4"]));



