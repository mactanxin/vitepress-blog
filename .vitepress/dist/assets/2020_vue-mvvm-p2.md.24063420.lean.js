import{_ as a,o as l,c as p,x as s,a as n,t as o,N as e}from"./chunks/framework.7e203a6d.js";const x=JSON.parse('{"title":"自己动手系列之: 手写一个MVVM (Part 2): 实现Compile","description":"","frontmatter":{},"headers":[],"relativePath":"2020/vue-mvvm-p2.md"}'),t={name:"2020/vue-mvvm-p2.md"},c=e("",7),r=s("code",null,'<span v-text="content"> ',-1),F=s("code",null,"v-text",-1),y=s("code",null,"other-attr",-1),D=s("br",null,null,-1),A=s("code",null,"compileUtil.bind()",-1),C=s("code",null,"new Watcher()",-1),i=s("p",null,"至此，一个简单的Compile就完成了。接下来要看看Watcher这个订阅者的具体实现了",-1);function d(m,f,u,v,h,E){return l(),p("div",null,[c,s("p",null,[n("这里通过递归遍历保证了每个节点及子节点都会解析编译到，包括了"+o()+"表达式声明的文本节点。指令的声明规定是通过特定前缀的节点属性来标记，如 ",1),r,n("other-attr中"),F,n("便是指令， 而"),y,n("不是指令，只是普通的属性。"),D,n(" 监听数据、绑定更新函数的处理是在"),A,n("这个方法中，通过"),C,n("添加回调来接收数据变化的通知.")]),i])}const g=a(t,[["render",d]]);export{x as __pageData,g as default};