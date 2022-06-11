import vnode from './vnode'
import createElement from './createElement'
import patchVnode from './patchVnode';

export default function (oldVnode, newVnode) {
    // 判断传入参数是否为虚拟节点， 不是就包装为虚拟节点
    if (oldVnode.sel == '' || oldVnode.sel == undefined) {
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
    }

    if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
        console.log('同一节点');
        patchVnode(oldVnode, newVnode )
    } else {
        console.log('暴力替换');
        let newVnodeElm = createElement(newVnode)
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
        }
    }
}