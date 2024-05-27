import { readdir } from "fs/promises"

const outdir = ".built"
const jspath = `${process.cwd()}/${outdir}`

declare global {
  interface Config {}
  var CFG: Config
}
global.CFG = {} as any

const inits: Array<() => Promise<void>> = []
async function load(path: string) {
  let mod: any
  try { mod = await import(path) } catch { }
  if (mod?.init) {
    inits.push(mod.init)
  }
}

const gpath = `${jspath}/global`;
const dirents = await readdir(gpath, { withFileTypes: true })
for (let i = 0; i < dirents.length; i++) {
  const dirent = dirents[i]
  if (dirent.isDirectory()) {
    await load(`file://${gpath}/${dirent.name}/index.js`)
  }
}

export default async function ginit() {
  for (let i = 0; i < inits.length; i++) {
    await inits[i]()
  }
}