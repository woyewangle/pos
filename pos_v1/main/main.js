'use strict';

function printReceipt(inputs){
  //统计每个种类和数量
  let shoppingList =calculateTypeAndNum(inputs);
  //从全部商品中找到对应商品的信息并且小计
  let detailItems=fIndItemDetail(shoppingList);
  //处理促销情况
  let detailItemsForDiscount= countItemsForDiscount(detailItems);
  //生成账单
  let bill=builderBill(detailItemsForDiscount);
  //打印
  console.log(bill);
};

function calculateTypeAndNum(collection) {
  let map = new Map();
  for(let i=0;i<collection.length;i++){
    // 处理正常字符
    if(collection[i].length == 10) {
      let item = collection[i];
      // 判重并且计数
      if(!map.has(item)) {
        map.set(item, 0);
      }
      map.set(item,map.get(item) + 1);
    } else {
      //处理特殊字符
      let item = collection[i].substring(0,10);
      // 判重并且计数
      if(!map.has(item)) {
        map.set(item, 0);
      }
      //提取特殊字符后边的数字
      let nums= Number(collection[i].substring(11));
      map.set(item,map.get(item) + nums);
    }
  }
  let shoppingList=[];
  map.forEach(function(value,key){
    shoppingList.push({
      barcode:key,
      count:value
    });
  })
  return shoppingList;
}

function fIndItemDetail(shoppingList){
  let detailItems=[];
  let allItems=loadAllItems();
  for(let i=0;i<shoppingList.length;i++){
    for(let j=0;j<allItems.length;j++){
      if(shoppingList[i].barcode===allItems[j].barcode){
        detailItems.push({
          barcode:shoppingList[i].barcode,
          name:allItems[j].name,
          unit:allItems[j].unit,
          price:allItems[j].price,
          num:shoppingList[i].count,
          subtotal:shoppingList[i].count*allItems[j].price})
      }
    }
  }
  return detailItems;
}

function countItemsForDiscount(detailItems){
  let countDiscountItem=loadPromotions();
  let countDiscount=0;
  for(let i=0;i< countDiscountItem[0].barcodes.length;i++){
    for(let j=0; j<detailItems.length;j++){
      if(countDiscountItem[0].barcodes[i]===detailItems[j].barcode){
        if(detailItems[j].num>=2){
          detailItems[j].subtotal=detailItems[j].subtotal-detailItems[j].price;
          countDiscount+=detailItems[j].price;
        }
      }
    }

  }
  detailItems.push({discou:countDiscount});
  console.info(JSON.stringify(detailItems));
  return detailItems;
}

function builderBill(finaldetailItems){
  let sum=0;          //数字要记得初始化
  let title="***<没钱赚商店>收据***\n";
  let content="";
  for(let i=0;i<finaldetailItems.length-1;i++){
    sum=sum+finaldetailItems[i].subtotal;
    let price=finaldetailItems[i].price.toFixed(2);

    content+="名称："+finaldetailItems[i].name+'，'+'数量：'+finaldetailItems[i].num+finaldetailItems[i].unit+'，' +
      '单价：'+price+'(元)，'+'小计：'+finaldetailItems[i].subtotal.toFixed(2)+'(元)\n';
  }
  let total='----------------------\n总计：'+sum.toFixed(2)+'(元)'+'\n';
  let subtotal='节省：'+finaldetailItems[3].discou.toFixed(2)+'(元)'+'\n**********************';
  console.info(JSON.stringify(title+content+total+subtotal));
  return title+content+total+subtotal;
}
