//module.exports = (amount, costsArray) => {
function gteNumber(amount, costsArray){
    if(!amount) return '';
    const prices = {};

    costsArray.forEach((num, i) => {
        if(!prices[num]){
            prices[num] = [i + 1];
            return;
        }
        prices[num].push(i + 1)
    });

    const keys = Object.keys(prices)
        .sort((a, b) => a - b);

    let num;
    if(keys[0] % amount){
        // обычный расчет
        num = `${prices[key[0]].sort((a, b) => b - a)[0]}`;
    }
    else{
        // Посчитать случаи когда цены 1 нет и количество денег не
        // делится на цело на минимальную сумму.
        // Напр. am = 9, min = 5 и т.д. 
    }
    const result = num.repeat(amount);
    return result;
}

const amount = 3,
    numbers = [2,2,2,2,2,2,2,2,3];

gteNumber(amount, numbers);