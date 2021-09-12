/*
    Формирую массив с элементами "уникальная цена, самая дальняя позиция этой цены".
    Сортирую по убыванию цены.
    Считаю сколько индексов я могу себе позволить и пушу их в результирующий массив.
    Подсчитываю остаток денег.
    Для трат денежного остатка, я формирую массив sorted из чисел больших, чем
    минимальное и сортирую по убыванию позиции. Также завожу массив для отработанных
    чисел.
    В цикле хожу по sorted массиву беру позицию самого дорого числа и ставлю в 
    начало результирующего массива. Чтобы поддержать разнообразие, добавляю это 
    число в массив отработанных и больше к нему не возвращаюсь.
    Создаю разнообразие.
    Проверяю сколько минимальных чисел в результирующем массиве.
    Иду по исходному массиву и собираю позиции минимальных чисел в массив, убираю
    наибольшую т.к. она уже используется, сортирую по убыванию и меняю хвост
    результирующего массива на аналогичной длины массив позиций minPos.

    ВРЕМЕННАЯ СЛОЖНОСТЬ

    Проход по costsArray это O(n).
    Проход по prices с целью сортировки это O(n*n log n).
    Сбор ключей-значений из prices и их последующая сортировка это O(n log n + n).        
    Если maxNums > 0, тогда еще O(n).
    Формирование массива sorted и его сортировка - O(n log n + n).
    Потратить оставшиеся деньги - O(n**3)
    Подсчет количества минимальных индексов в текущем результате O(n).
    Поиск других индексов минимальных значений O(n).
    Сортировка O(n log n).

    Итого, суммарная сложность алгоритма O(n**3 + n**2 log n + 3n log n + 6n),
    асимптотическая сложность O(n**3). 
    При массиве на 9 элементов сложность не страшная. 

    ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

    Храню объект prices - O(n).
    Создаю массив nums - O(n).
    Создаю массив под результат - O(n).
    Завожу массив sorted - O(n).
    Массив использованных чисел - O(n).
    Держу в памяти массив позиций минимальных чисел - O(n).
    Массив positions - O(n).
    Суммарная сложность по памяти O(7n), асимптотическая - O(n).
*/

module.exports = (amount, costsArray) => {
    if(!amount) return '';

    const prices = {};
    costsArray.forEach((price, i) => {
        if(!prices[price]){
            prices[price] = [i + 1];
            return;
        }
        prices[price].push(i + 1);
    });
    for(let key in prices){
        prices[key].sort((a, b) => b - a);
        prices[key] = prices[key][0]; 
    }

    const nums = Object.entries(prices)
        .sort((a, b) => Number(b[0]) - Number(a[0]));
        
    const maxNums = Math.floor(amount/Number(nums[nums.length -1][0]));
    const result = [];
    
    if(maxNums > 0){
        for(let i = 0; i < maxNums; i++)
            result.push(nums[nums.length -1][1]);
    }
    let extra = amount % Number(nums[nums.length -1][0]);
    const minNum = Number(nums[nums.length -1][0]);
    const minNumPos = nums[nums.length -1][1];       

    const sorted = [];
    costsArray.forEach((num, i) => {
        if(num !== minNum)
            sorted.push([num, i+1]);
    });
    sorted.sort((a, b) => b[1] - a[1]);
    const used = [];
    let index = 0;

    // Трачу остатки денег разнообразно
    while(extra > 0 && index < maxNums){
        let flag = false,
            sum = extra + minNum;

        for(let i = 0; i < sorted.length; i++){
            if(sorted[i][0] <= sum && !used.includes(sorted[i][0])){
                result[index] = sorted[i][1];
                index++;
                extra = sum - sorted[i][0];
                used.push(sorted[i][0]);                
                flag = true;
                break;
            }
        }
        if(!flag)
            break;
    }

    // Создаю разнообразие
    let min = 0;
    for(let num of result){
        if(num === minNumPos)
            min++;
    } 

    const minPos = [];
    for(let i = 0; i < costsArray.length; i++){
        if(costsArray[i] === minNum)
            minPos.push(i + 1);
    }
    minPos.pop()    
    minPos.sort((a, b) => b - a);
    const positions = minPos.slice(0, result.length -1);

    if(min > 1 && positions.length)
        result.splice(-positions.length, positions.length, ...positions);

    return result.length === 0 ? '' : result.join(''); 
}