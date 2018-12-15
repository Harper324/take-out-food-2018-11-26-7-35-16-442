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
  console.log(getItemIdQuality(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]));
  console.log(getItemIdPriceQuality(["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]));