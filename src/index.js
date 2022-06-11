// import {
//     init,
//     classModule,
//     propsModule,
//     styleModule,
//     eventListenersModule,
//     h,
// } from "snabbdom";
import h from './snabbdom/h'
import patch  from "./snabbdom/patch";
const myVnode1 =  h('ul',{},[
    h('li',{key: 1}, 'a'),
    h('li',{key: 2}, 'b'),
    h('li',{key: 3}, 'c'),
])
const myVnode2 =  h('ul',{},[
    h('li',{key: 3}, 'c'),
    h('li',{key: 2}, 'b'),
    h('li',{key: 5}, 'e'),

    h('li',{key: 1}, 'a'),
    h('li',{key: 4}, 'd'),

])
const container = document.getElementById("container");
patch(container, myVnode1)

const MyButton = document.getElementById('myButton')
MyButton.onclick = () => {
    patch(myVnode1, myVnode2)
}

// const patch = init([
//     // Init patch function with chosen modules
//     classModule, // makes it easy to toggle classes
//     propsModule, // for setting properties on DOM elements
//     styleModule, // handles styling on elements with support for animations
//     eventListenersModule, // attaches event listeners
// ]);

// const container = document.getElementById("container");

//   const vnode = h("div#container.two.classes", { on: { click: () => {} } }, [
//     h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//     " and this is just normal text",
//     h("a", { props: { href: "/foo" } }, "I'll take you places!"),
//   ]);
//   // Patch into empty DOM element – this modifies the DOM as a side effect
//   patch(container, vnode);

//   const newVnode = h(
//     "div#container.two.classes",
//     { on: { click: () => {} } },
//     [
//       h(
//         "span",
//         { style: { fontWeight: "normal", fontStyle: "italic" } },
//         "This is now italic type"
//       ),
//       " and this is still just normal text",
//       h("a", { props: { href: "/bar" } }, "I'll take you places!"),
//     ]
//   );
//   // Second `patch` invocation
//   patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state

// var testH2 = h('div', {}, '空盒子')
// var testH = h('div', { props: { class: 'wtf' } }, ['hello world!', testH2])
// console.log(testH);
// patch(container, testH)
