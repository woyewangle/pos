'use strict';


describe('pos', () => {

  it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    spyOn(console, 'log');

    printReceipt(tags);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});


describe('pos', () => {

  it('Function calculateTypeAndNum test', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];

    let shoppingList=calculateTypeAndNum(tags);
    const result=[
            {"barcode":"ITEM000001","count":5},
            {"barcode":"ITEM000003","count":2.5},
            {"barcode":"ITEM000005","count":3}
     ];
    expect(shoppingList).toEqual(result);

  });
});



describe('pos', () => {

  it('Function fIndItemDetail test', () => {

    const tags = [
      {"barcode":"ITEM000001","count":5},
      {"barcode":"ITEM000003","count":2.5},
      {"barcode":"ITEM000005","count":3}
    ];

    let detailItems=fIndItemDetail(tags);
    const result=[
            {"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"num":5,"subtotal":15},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"num":2.5,"subtotal":37.5},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"num":3,"subtotal":13.5}
     ];
    expect(detailItems).toEqual(result);

  });
});


describe('pos', () => {

  it('Function countItemsForDiscount test', () => {

    const tags = [
            {"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"num":5,"subtotal":15},
            {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"num":2.5,"subtotal":37.5},
            {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"num":3,"subtotal":13.5}
     ];

    let detailItemsForDiscount=countItemsForDiscount(tags);
    const result=[
             {"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"num":5,"subtotal":12},
             {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"num":2.5,"subtotal":37.5},
             {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"num":3,"subtotal":9},
             {"discou":7.5}
     ];
    expect(detailItemsForDiscount).toEqual(result);

  });
});


describe('pos', () => {

  it('Function builderBill test', () => {

    const tags = [
             {"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"num":5,"subtotal":12},
             {"barcode":"ITEM000003","name":"荔枝","unit":"斤","price":15,"num":2.5,"subtotal":37.5},
             {"barcode":"ITEM000005","name":"方便面","unit":"袋","price":4.5,"num":3,"subtotal":9},
             {"discou":7.5}
     ];

    let bill=builderBill(tags);

    const result="***<没钱赚商店>收据***\n名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)\n名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n----------------------\n总计：58.50(元)\n节省：7.50(元)\n**********************";
    expect(bill).toEqual(result);

  });
});

