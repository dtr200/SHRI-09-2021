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
    const selected = nums[nums.length -1][0];
    const result = [];
    
    if(maxNums > 0){
        for(let i = 0; i < maxNums; i++)
            result.push(nums[nums.length -1][1]);
    }
    let extra = amount % nums[nums.length -1][0];
    nums.sort((a, b) => Number(b[1]) - Number(a[1]));
    let index = 0;

    while(extra > 0 && index < maxNums){
        let flag = false,
            temp = extra + Number(selected);
        for(let i = 0; i < nums.length; i++){
            if(Number(nums[i][0]) <= temp && nums[i][1] > nums[nums.length -1][1]){
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