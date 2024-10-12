//"env/**/0.ts" will be automatically loaded
console.log(`Env Module "Example" load.`)

//cfg
declare global {
    interface Config {
        Example: typeof MCFG
    }
}
const MCFG = {
    msg: "Default msg."
}
global.CFG.Example = MCFG

//mod
declare global {
    var Example: typeof MOD
}
const MOD = {
    show_msg,
}
global.Example = MOD

function show_msg() {
    console.log(`CFG.Example.msg: ${MCFG.msg}`)
}

//optional init func
export async function init() {
    console.log(`Env Module "Example" init().`)
}