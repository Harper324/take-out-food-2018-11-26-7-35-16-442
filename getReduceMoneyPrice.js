function getReduceMoneyPrice(itemIdPriceQuality) {
    let itemPrice = itemIdPriceQuality.map(element => element.price * element.quality);
    let totalPrice = itemPrice.reduce((a, b) => a + b);
    let reduceMoneyPrice={};
    if (totalPrice > 30) {
        reduceMoneyPrice.总计 =  totalPrice-6;
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
console.log(getReduceMoneyPrice([{ id: 'ITEM0001', quality: '1', price: 18, name: '黄焖鸡' },
{ id: 'ITEM0013', quality: '2', price: 6, name: '肉夹馍' },
{ id: 'ITEM0022', quality: '1', price: 8, name: '凉皮' }]));