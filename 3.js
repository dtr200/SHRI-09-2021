/*
    Проверяю на пустую строку.
    Создаю переменные для семерок и counter для подсчета единиц.
    В этой задаче учитываю возможность появления минусовых 7 и -1 (может и не надо).
    Если число не равно 7 или 1, возвращаю false.
    Если семерки еще не было, тогда проверяю не 7 ли это пришло. Если нет, то это
    единица и я увеличиваю counter. Если это 7, тогда считаю, сколько впереди было
    единиц, их число должно без остатка делиться на 4 т.к. допустимо впереди только
    число 1111. Если все ок, тогда сохраняю позицию семерки в виде строки (иначе
    если будет число и 7 будет на позиции 0, то сработает !seven).
    Далее срабатывает только блок else. Если встречу еще раз 7, тогда считаю counter
    как остаток от деления на 4 (наборы из 1111) или (counter - 2) % 4, т.к. бывают
    числа 711 вместе с 1111.
    Если строка содержит 7 и заканчивается на единицы, то обработать хвост из единиц
    будет некому, после цикла проверяю такой хвост. Если его нет и цикл завершился и 
    false не сработал, то вариантов нет - только true. Иначе считаю хвост как остаток
    от деления на 4 === 0 или (counter -2) % 4 === 0.
    Если же в строке вообще нет 7, тогда после цикла будет counter из количества 
    единиц, делю его без остатка на 4, если да - то true, иначе false т.к.
    возможны только комбинации из 1111.
    
    Выносить в функции повторяющиеся конструкции не было времени.

    ВРЕМЕННАЯ СЛОЖНОСТЬ

    Проход циклом по n элементам дает общую сложность по времени O(n)

    ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

    Ничего нигде не хранится - O(1)
*/

module.exports = (str) => {
    if(!str.length) return false;
    let seven, 
        counter = 0;

    for(let i = 0; i < str.length; i++){
        if(str[i] !== '7' && str[i] !== '1' && (str[i] !== '-' && str[i+1] !== '7') && (str[i] !== '-' && str[i+1] !== '1'))
            return false;

        if(!seven){
            // Начало или идет цикл пока не встретил 7
            if(str[i] === '7'){
                // Проверяю единицы до первой 7
                if(counter % 4 !== 0)
                    return false;
                seven = `${i}`;
            }
            else if(str[i] === '-' && str[i+1] === '7'){
                if(counter % 4 !== 0)
                    return false;
                seven = `${i}`;
                i++;
            }
            else if(str[i] === '-' && str[i+1] === '1'){
                i++;
                counter++;
            }
            else{
                counter++;
            }             
        }
        else{
            // Была 7, встретил еще одну, считаю counter
            if(str[i] === '7'){
                seven = `${i}`;
                const check = (counter % 4 === 0) || ((counter - 2) % 4 === 0);
                if(!check)
                    return false;
            }
            else if(str[i] === '-' && str[i+1] === '7' ){
                // Была 7, встретил еще одну -7, считаю counter
                seven = `${i}`;
                i++;
                const check = (counter % 4 === 0) || ((counter - 2) % 4 === 0);
                if(!check)
                    return false;
            }
            else if(str[i] === '-' && str[i+1] === '1'){
                // Была 7, считаю единицы если пришло -1
                i++;
                counter++;
            }
            else{
                // Была 7, считаю единицы
                counter++;
            }
        }
    }
    // 7 так и не было
    if(!seven){
        return counter % 4 === 0 ? true : false;
    }
    // 7 была, нужно досчитать хвосты из единиц
    else{
        // Хвоста нет
        if(counter === 0)
            return true;

        const check = (counter % 4 === 0) || ((counter - 2) % 4 === 0);
        return check ? true : false;
    }
}