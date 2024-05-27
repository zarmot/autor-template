//This is script config file
console.log(`script config load.`)

//modify config
const { Example } = CFG
Example.msg = "My msg!"

//optional init func
export async function init() {
    console.log(`script config init().`)
}