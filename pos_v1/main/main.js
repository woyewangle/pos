'use strict';

function printReceipt(inputs){
  //统计每个种类和数量
  let typeAndNum =calculateTypeAndNum(inputs);
  let ItemsList=pushTypeAndNum(typeAndNum);
  //映射商品的信息并且小计
  let detailItemsList=addDetailAndSubtotal(ItemsList);
  //计算总优惠和总价
  let ItemsListFordiscount=countSaveAndSum(detailItemsList);
  //生成账单
  let bill=builderBill(ItemsListFordiscount);
  //打印
  console.log(bill);
};

function calculateTypeAndNum(collection){
    let typeAndNumMap =new Map();
      for(let i=0;i<collection.length;i++){
         let item = collection[i].substring(0,10);
         let nums=1;
         if(!typeAndNumMap.has(item)) {
            typeAndNumMap.set(item, 0);
           }
         if(collection[i].length > 10) {
            nums= Number(collection[i].substring(11));
          }
          typeAndNumMap.set(item,typeAndNumMap.get(item) + nums);
        }
    return typeAndNumMap;
}


function pushTypeAndNum(map) {
  let shoppingList=[];
  map.forEach(function(value,key){
    shoppingList.push({
      barcode:key,
      count:value
    });
  })
  return shoppingList;
}


function addDetailAndSubtotal(shoppingList){
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
let sum=0;
function countSaveAndSum(detailItems){
  let discountItem=loadPromotions();
  let discou=0;

  for(let i=0;i< detailItems.length;i++){
    for(let j=0; j<discountItem[0].barcodes.length;j++){
      if(discountItem[0].barcodes[j]===detailItems[i].barcode){
        if(detailItems[i].num>=2){
          detailItems[i].subtotal=detailItems[i].subtotal-detailItems[i].price;
          discou+=detailItems[i].price;
        }
      }
    }
    sum=sum+detailItems[i].subtotal;

  }
  detailItems.push({discou:discou});
  detailItems.push({sum:sum});
  return detailItems;
}

function builderBill(finaldetailItems){
  let title="***<没钱赚商店>收据***\n";
  let content="";
  for(let i=0;i<finaldetailItems.length-2;i++){
    content+="名称："+finaldetailItems[i].name+'，'+'数量：'+finaldetailItems[i].num+finaldetailItems[i].unit+'，' +
      '单价：'+finaldetailItems[i].price.toFixed(2)+'(元)，'+'小计：'+finaldetailItems[i].subtotal.toFixed(2)+'(元)\n';
  }
  let total='----------------------\n总计：'+finaldetailItems[4].sum.toFixed(2)+'(元)'+'\n';
  let subtotal='节省：'+finaldetailItems[3].discou.toFixed(2)+'(元)'+'\n**********************';
  console.info(JSON.stringify(title+content+total+subtotal));
  return title+content+total+subtotal;
}
