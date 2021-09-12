/*
        Формирую массив с элементами "уникальная цена, самая дальняя позиция этой цены".
        Массив отсортирован по убыванию цены.
        Беру последнее самое дешевое значение и делю количество денег amount на это
        значение, так я узнаю максимальное количество индексов, сколько я могу себе
        позволить. Округляю в меньшую сторону.
        Если это число больше 0, то столько раз пушу в массив это число.
        Подсчитываю остаток денег: беру остаток от деления суммы денег на самый дешевый 
        индекс. Сортирую массив nums по убыванию позиции.
        Создаю разнообразие.
        Собираю позиции минимальных чисел в массив, убираю наибольшую т.к. она уже
        используется, сортирую по убыванию и меняю хвост результирующего массива на 
        аналогичной длины массив позиций minPos.
        Трачу деньги по максимуму.
        Предварительно завожу переменную index, которая будет считать от 0 до макс.
        кол-ва индексов, сколько я смогу себе позволить maxNums. 
        Запускаю цикл while пока не закончатся экстра деньги и пока индекс не станет 
        равным maxNums.
        Внутри while создаю флаг и темп переменную, которая равна экстра деньгам + 
        цене одного самого дешевого индекса на место которого я поставлю индекс побольше,
        если таковой найдется. Если он таки найдется, то ставлю вперед т.к. он 
        будет больше наименьших индексов. В случае нахождения флаг становися true и
        цикл продолжается, в противном случае ничего лучше нет и цикл следуюет 
        прекращать и возвращать результат.

        ВРЕМЕННАЯ СЛОЖНОСТЬ

        Проход по costsArray это O(n).
        Проход по prices с целью сортировки это O(n*n log n).
        Сбор ключей-значений из prices и их последующая сортировка это O(n log n + n).        
        Если maxNums > 0, тогда еще O(n).
        Вторая сортировка массива nums - O(n log n). 
        Потратить оставшиеся деньги - O(n**2)
        Поиск других индексов минимальных значений O(n).
        Сортировка O(n log n).

        Итого, суммарная сложность алгоритма O(n**2 log n + n**2 + 3n log n + 4n),
        асимптотическая сложность O(n**2 log n). Что не так страшно, когда массив
        на 9 элементов. 

        ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

        Храню объект prices - O(n).
        Создаю массив nums - O(n).
        Создаю массив под результат - O(n).
        Держу в памяти массив позиций минимальных чисел - O(n)
        Суммарная сложность по памяти O(4n), асимптотическая - O(n).
    */


//module.exports = (amount, costsArray) => {
const f = (amount, costsArray) => {
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
    nums.sort((a, b) => Number(b[1]) - Number(a[1]));
    let index = 0;

     // Создаю разнообразие 
     const minPos = [];
     for(let i = 0; i < costsArray.length; i++){
         if(costsArray[i] === minNum)
             minPos.push(i + 1);
     }
     minPos.pop()    
     minPos.sort((a, b) => b - a);
     const positions = minPos.slice(0, result.length -1)

     if(positions.length)
         result.splice(-positions.length, positions.length, ...positions);

    // Трачу остатки денег
    while(extra > 0 && index < maxNums){
        let flag = false,
            temp = extra + minNum;

        for(let i = 0; i < nums.length; i++){
            if(Number(nums[i][0]) <= temp && nums[i][1] > minNumPos){
                result[index] = nums[i][1];
                index++;
                extra = temp - nums[i][0];
                flag = true;
                break;
            }
        }
        if(!flag)
            break;
    }   

    return result.length === 0 ? '' : result.join(''); 
}

// f(11, [5,4,3,2,2,2,3,4,5]);
//f(2,[9,11,1,12,5,8,9,10,6]);
//f(13,[2,2,2,2,2,3,5]);
//f(11,[2,2,2,3,5]); //43321
//f(11, [6, 5, 4, 3, 11, 3, 4, 5, 6]); //864
f(5,[1,1,1,1,1,1,1,1,2,3]);
// f(5,[1,1,1,2,3]); //33321