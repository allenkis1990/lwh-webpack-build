
console.log('当前是否开发环境'+dev);
console.log('我是project1的center')
if(module.hot){
    module.hot.accept();
}

