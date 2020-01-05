module.exports = loader

function loader(source){
    source = JSON.stringify(source)
    let moduleStr = `module.exports = ${source}`
    return moduleStr
}