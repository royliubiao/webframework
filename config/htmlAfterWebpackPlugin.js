function htmlAfterWebpackPlugin(options) {
    //打包的数据
    this.options = options
}
function assetsHelp(arrs) {
    let js = [],css=[];
    let dir = {
        js: (item) =>`<script src="${item}"></script>`,
        css: (item)=>`<link rel="stylesheet" href="${item}"></link>`
    }
    for(let item of arrs.js){
        js.push(dir.js(item))
    }
    for (let item of arrs.css) {
        css.push(dir.css(item))
    }
    // css = arrs.css.reduce(dir.css);
    // js = arrs.js.reduce(dir.js);
    return {
        css,
        js
    }
}
htmlAfterWebpackPlugin.prototype.apply = function (compiler) {
    console.log(12456)
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing',function (htmlPluginData,callback) {
            //htmlPluginData.assets
            let _html = htmlPluginData.html;
            let result = assetsHelp(htmlPluginData.assets);
            //将css和js插入到页面中
            _html = _html.replace('<!-- injectcss -->', result.css.join(""));
            _html = _html.replace('<!-- injecscripts -->', result.js.join(""));
            //将html变 成想要的额值
            htmlPluginData.html = _html
            callback(null,htmlPluginData); 
        })
    })
}
module.exports = htmlAfterWebpackPlugin;