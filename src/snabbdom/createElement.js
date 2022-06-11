export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel)
    if (vnode.text !== '' && (vnode.children == undefined || vnode.children.length == 0)) {
        console.log('文字节点上树');
        domNode.innerText = vnode.text
        // 补充elm
        vnode.elm = domNode
    } else if (Array.isArray(vnode.children) & vnode.children.length > 0) {
        console.log('数组节点上树 - 递归');
        for(let i = 0 ; i <  vnode.children.length; i++ ){
            let ch = vnode.children[i]
            console.log(ch);
            let chDom = createElement(ch)
            domNode.appendChild(chDom)
        }
        vnode.elm = domNode
    }

    // 返回的就是dom
    return vnode.elm
}