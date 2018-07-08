// Write your cade below:
function caclRemaindar(num,num1) {
    return num%num1;
};

function caclSum(params) {
    let sum=0;
    for(let num of params){
        sum+=num
    }
    return sum;
};

function caclSumInConditon(params,number) {
    let sum=0;
    for(let num of params){
        if(num<number){sum+=num;}
    }
	//搭建node环境
    return sum;
};

module.exports = {
    caclRemaindar,
    caclSum,
    caclSumInConditon
}