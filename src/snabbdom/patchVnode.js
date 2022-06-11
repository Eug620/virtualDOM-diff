import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchVnode(oldVnode, newVnode) {
    
    if (oldVnode === newVnode) return // 完全相等退出
    if (newVnode.text && (newVnode.children == undefined || newVnode.children.length == 0)) {
        console.log('新节点下为文字');

        if (newVnode.text !== oldVnode.text) {
            // 直接替换为文字即可
            oldVnode.elm.innerText = newVnode.text
        }

    } else {
        console.log('新节点下不为文字');
        if (oldVnode.children!==undefined && oldVnode.children.length>0) {
            console.log('新老都有子节点');
            // let un = 0 // 所有未处理节点的索引
            // // 旧节点有children ，新旧都有children
            // for(let i = 0 ; i <  newVnode.children.length; i++ ){
            //     let ch = newVnode.children[i]
            //     // 查找老节点里面有没有跟这个key一致的
            //     let isExist = false
            //     for(let j = 0 ; j <  oldVnode.children.length; j++ ){
            //         if (oldVnode.children[j].sel == ch.sel&& oldVnode.children[j].key == ch.key) {
            //             isExist = true
            //         }

                  
            //     }
            //     if (!isExist) {
            //         console.log(ch, i);
            //         let dom = createElement(ch)
            //         ch.elm = dom
            //         if (un<oldVnode.children.length) {
            //             oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
            //         } else {
            //             oldVnode.elm.appendChild(dom)
            //         }
            //     } else {
            //         // 指针下移
            //         un++

            //         // 如果位置发生变化

            //     }
            // }

            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
        } else {
            // 旧的没有， 新的有
            // 清空老的节点内容
            oldVnode.elm.innerText = ''
            // 遍历新节点子集 并且上树
            for(let i = 0 ; i <  newVnode.children.length; i++ ){
                let newDom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(newDom)
            }
        }

    }

}