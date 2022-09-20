/**
 * @description 获取模拟数据
 *      @param {Number} num 需要获取数据的数量
 *      @param {Number} time 需要延迟的毫秒数
*/
export function getList(num = 10000, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tempArr = []
            let count = num;
            while (count--) {
                const index = num - count;
                tempArr.push({
                    id: `${index}$${Math.random().toString(16).substr(9)}`,
                    index,
                    name: `kaimo-${index}`,
                    value: index
                })
            }
            resolve(tempArr);
        }, time);
    })
}