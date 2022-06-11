import vnode from './vnode'
console.log(vnode('div', 2, 3, 4));


export default function (sel, data, c) {
    // 检查参数个数
    if (arguments.length !== 3) {
        throw new Error('参数必须为三')
    }

    if (typeof c == 'string' || typeof c == 'number') { //1 第三个参数 为文字
        return vnode(sel, data, undefined, c, undefined)
    } else if (Array.isArray(c)) { // 2 第三个参数为数组
        let children = []
        for (let i = 0; i < c.length; i++) {
            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel'))) {
                throw new Error('数组中 参数类型错误')
            }
            children.push(c[i])
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof c == 'object' && c.hasOwnProperty('sel')) { // 第三个参数为h函数
        // 说明现在调用函数形态为3
    } else {
        throw new Error('传入第三个参数类型错误')
    }
}