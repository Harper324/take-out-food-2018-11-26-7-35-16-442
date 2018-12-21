function bestCharge(selectedItems) {
  let itemIdPriceQuality = getItemIdPriceQuality(selectedItems);
  let reduceMoneyPrice = getReduceMoneyPrice(itemIdPriceQuality);
  let halfDiscountPrice = getHalfDiscountPrice(itemIdPriceQuality);

  return compareTwoPrice(reduceMoneyPrice, halfDiscountPrice, itemIdPriceQuality);
}
function getItemIdPriceQuality(selectedItems) {
  let itemIdAndQuality = getItemIdQuality(selectedItems);
  let itemIdPriceQuality = itemIdAndQuality.map(element => {
    let item = loadAllItems().find(ele => element.id === ele.id);
    element.price = item.price;
    element.name = item.name;
    return element;

  });
  return itemIdPriceQuality;
}
function getItemIdQuality(selectedItems) {
  let itemIdAndQuality = selectedItems.map(element => {
    return {
      id: element.slice(0, 8),
      quality: element.slice(-1)
    };
  });
  return itemIdAndQuality;
}

function getReduceMoneyPrice(itemIdPriceQuality) {
  let itemPrice = itemIdPriceQuality.map(element => element.price * element.quality);
  let totalPrice = itemPrice.reduce((a, b) => a + b);
  if (totalPrice > 30) {
    return { totalPrice: totalPrice - 6 };
  }
  return { totalPrice };
}

function getHalfDiscountPrice(itemIdPriceQuality) {

  let discountItems = (itemIdPriceQuality.filter(element => loadPromotions()[1].items.includes(element.id))).map(x => x.name);
  let itemPrice = itemIdPriceQuality.map(element => {
    if (loadPromotions()[1].items.includes(element.id)) {
      return element.price * element.quality / 2;
    }
    return element.price * element.quality;
  });

  let totalPrice = itemPrice.reduce((a, b) => a + b);
  if (discountItems.length > 0) {
    discountItems = discountItems.join('，');

    return {
      halfItems: discountItems,
      totalPrice
    };

  }
  return { totalPrice };
}


function compareTwoPrice(reduceMoneyPrice, halfDiscountPrice, itemIdPriceQuality) {
  var itemPrice = itemIdPriceQuality.map(element => element.name + ' x ' + element.quality + ' = ' +
    element.quality * element.price + '元')
  itemPrice = itemPrice.join('\n');
  let savedMoney = reduceMoneyPrice.totalPrice + 6 - halfDiscountPrice.totalPrice;
  if (reduceMoneyPrice.totalPrice <= halfDiscountPrice.totalPrice && halfDiscountPrice.halfItems) {
    return `
============= 订餐明细 =============
${itemPrice}
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：${reduceMoneyPrice.totalPrice}元
===================================`;

  } else if (reduceMoneyPrice.totalPrice > halfDiscountPrice.totalPrice) {
    return `
============= 订餐明细 =============
${itemPrice}
-----------------------------------
使用优惠:
指定菜品半价(${halfDiscountPrice.halfItems})，省${savedMoney}元
-----------------------------------
总计：${halfDiscountPrice.totalPrice}元
===================================`;

  } else {
    return ` 
============= 订餐明细 =============
${itemPrice}
-----------------------------------
总计：${reduceMoneyPrice.totalPrice}元
===================================`;
  }
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





