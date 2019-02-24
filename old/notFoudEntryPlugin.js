class notFoudPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('notFoudPlugin', (compilation) => {
            compilation.hooks.buildModule.tap('notFoudPlugin', (module) => {
                if (module.resource && !new RegExp(`node_modules`).test(module.resource) && new RegExp(`\\\\projects\\\\`).test(module.resource)) {
                     console.log(module.resource,121212121212);
                }
            })
        })
    }
}

module.exports = notFoudPlugin