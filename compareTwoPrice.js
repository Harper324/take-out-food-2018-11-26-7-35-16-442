function compareTwoPrice(reduceMoneyPrice,halfDiscountPrice,itemIdPriceQuality) {
    var itemPrice=[];
    for(var i=0; i<itemIdPriceQuality.length; i++) {
        itemPrice[i]=itemIdPriceQuality[i].name+'*'+itemIdPriceQuality[i].quality+'='+itemIdPriceQuality[i].quality*itemIdPriceQuality[i].price+'元';

    }
    itemPrice=itemPrice.join('\n');
    var savedMoney=reduceMoneyPrice.总计+6-halfDiscountPrice.总计;
    var order;
    if(reduceMoneyPrice.总计 <= halfDiscountPrice.总计 && halfDiscountPrice.半价菜品 ) {
      order='=========订单明细=========\n'+itemPrice+'\n'+'------------------------'+'\n'+'使用优惠：'+'\n'+'满30减6元，省6元'+'\n'+'---------------------------'+'\n'+'总计：'+reduceMoneyPrice.总计+'元'+'\n'+'========================================';

    } else if(reduceMoneyPrice.总计 > halfDiscountPrice.总计) {
        order='=========订单明细=========\n'+itemPrice+'\n'+'------------------------'+'\n'+'使用优惠：'+'\n'+'指定菜品半价（'+halfDiscountPrice.半价菜品+'),省'+savedMoney+'元'+'\n'+'---------------------------'+'总计：'+halfDiscountPrice.总计+'元'+'\n'+'========================================';

    } else {
        order='=========订单明细=========\n'+itemPrice+'\n'+'------------------------'+'\n'+ '总计：'+reduceMoneyPrice.总计+'元'+'\n'+'========================================';
    }
    return order;
}