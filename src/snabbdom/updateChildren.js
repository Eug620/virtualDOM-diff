import patchVnode from "./patchVnode";
import createElement from "./createElement";
// 判断是否为同一个虚拟节点
function checkSameVnode (a, b) {
    return a.sel == b.sel && a.key == b.key
}

export default function updateChildren (parentElm, oldChildren, newChildren) {
    console.log('父节点-->', parentElm);
    console.log('老节点子集-->', oldChildren);
    console.log('新节点子集-->', newChildren);

    // 定义四个索引
    let oldStartIdx = 0 // 旧子集首部索引
    let oldEndIdx = oldChildren.length - 1// 旧子集尾部索引
    let newStartIdx = 0 // 新子集首部索引
    let newEndIdx = newChildren.length - 1// 新子集尾部索引

    // 定义四个节点
    let oldStartVnode = oldChildren[0]
    let oldEndVnode = oldChildren[oldEndIdx]
    let newStartVnode = newChildren[0]
    let newEndVnode = newChildren[newEndIdx]

    let keyMap = null

    console.log(oldEndIdx, newEndIdx);

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log('循环中...');

        if (oldStartVnode == null || oldChildren[oldStartIdx] == undefined) {
            oldStartVnode = oldChildren[++oldStartIdx]
        } else if (oldEndVnode == null || oldChildren[oldEndIdx] == undefined) {
            oldEndVnode = oldChildren[--oldEndIdx]
        } else if (newStartVnode == null || newChildren[newStartIdx] == undefined) {
            newStartVnode = newChildren[++newStartIdx]
        } else if (newEndVnode == null || newChildren[newEndIdx] == undefined) {
            newEndVnode = newChildren[--newEndIdx]
        }

        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前 & 旧前
            console.log('1命中： 新前 & 旧前');
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldChildren[++oldStartIdx]
            newStartVnode = newChildren[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后 & 旧后
            console.log('2命中： 新后 & 旧后');
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldChildren[--oldEndIdx]
            newEndVnode = newChildren[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后 & 旧前
            console.log('3命中： 新后 & 旧前');
            patchVnode(oldStartVnode, newEndVnode)
            // 移动节点 插入操作 - 只要你插入一个已经在dom上的节点，它就会移动
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldChildren[++oldStartIdx]
            newEndVnode = newChildren[--newEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前 & 旧后
            console.log('4命中： 新前 & 旧后');
            patchVnode(oldEndVnode, newStartVnode)
            // 移动节点 插入操作 - 只要你插入一个已经在dom上的节点，它就会移动
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldChildren[--oldEndIdx]
            newStartVnode = newChildren[++newStartIdx]
        } else {
            // 以上四种全未命中
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    const key = oldChildren[i].key
                    if (key !== undefined) {
                        keyMap[key] = i
                    }
                }
            }
            console.log(keyMap);
            const idxInOld = keyMap[newStartVnode.key]
            console.log(idxInOld);

            if (idxInOld == undefined) {
                // 这是个全新的项
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
            } else {
                // 这是要移动的项
                const elmToMove = oldChildren[idxInOld]
                console.log(elmToMove, 'elmToMove');
                patchVnode(elmToMove, newStartVnode)
                oldChildren[idxInOld] = undefined // 处理完了这一项
                parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm) // 移动
            }
            // 指针下移，只移动新的头
            newStartVnode = newChildren[++newStartIdx]
        }

    }
    // 结束了，start还是比end小 需要新增节点
    if (newStartIdx <= newEndIdx) {
        console.log('还有节点需要新增');
        const before = newChildren[newEndIdx + 1] == null ? null : newChildren[newEndIdx + 1].elm
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            console.log('新增节点', newChildren[i].key);
            parentElm.insertBefore(createElement(newChildren[i]), before)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            console.log('删除节点', oldChildren[i].key);
            console.log(oldChildren[i],'remove');
            // if (oldChildren[i]) {
                parentElm.removeChild(oldChildren[i].elm)
            // }
        }
    }

}