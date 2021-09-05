module.exports = (amount, costsArray) => {
    if(!amount) return '';
    const prices = {};

    costsArray.forEach((num, i) => {
        if(!prices[num]){
            prices[num] = [i + 1];
            return;
        }
        prices[num].push(i + 1);
    });

    const keys = Object.keys(prices)
        .map(key => Number(key))
        .sort((a, b) =>a - b);

    // Есть единица, значит можно составить самое длинное число из них
    if(keys[0] === 1)
        return String(prices[keys[0]][0]).repeat(amount);

    // Поиск минимального числа
    let minNum = Math.floor(amount/keys[0]),
        minKey = keys[0];

    const comparator = (minKey, key) => 
        costsArray.lastIndexOf(key) > 
        costsArray.lastIndexOf(minKey);        

    for(let i = 1; i < keys.length; i++){
        const currentMin = Math.floor(amount/keys[i]);
        if(currentMin >= minNum && comparator(minKey, keys[i])){
            minNum = currentMin;
            minKey = keys[i];
        }
    }

    const num = `${prices[minKey].sort((a, b) => b - a)[0]}`;
    const repeats = Math.floor(amount/minKey);

    const result = num.repeat(repeats);
    return result;
}