function getHalfDiscountPrice(itemIdPriceQuality) {

    var discountItems = (itemIdPriceQuality.filter(function(element){
        return (loadPromotions()[1].items.includes(element.id));         
    })).map(x => x.name);

    var itemPrice=itemIdPriceQuality.map(function(element) {
       if(loadPromotions()[1].items.includes(element.id)) {
          return element.price * element.quality /2;
       } else {
           return element.price * element.quality;
       }
       
    });

    var totalPrice = itemPrice.reduce(function (a, b) {
        return a + b;
    });

    var halfDiscountPrice={};
    if (discountItems) {
        halfDiscountPrice.半价菜品=discountItems.join();
        halfDiscountPrice.总计=totalPrice;

    } else {
        halfDiscountPrice.总计=totalPrice;

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
console.log(getHalfDiscountPrice([{ id: 'ITEM0001', quality: '1', price: 18, name: '黄焖鸡' },
{ id: 'ITEM0013', quality: '2', price: 6, name: '肉夹馍' },
{ id: 'ITEM0022', quality: '1', price: 8, name: '凉皮' }]));