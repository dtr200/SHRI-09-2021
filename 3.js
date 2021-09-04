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