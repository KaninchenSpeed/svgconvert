import fs from 'fs'
import fsp from 'fs/promises'

const [ _bin, _dir, rinp, rout, rtempl ] = process.argv

const inp = `${process.cwd()}/${rinp.replace(/.\//g, '')}`
const out = `${process.cwd()}/${rout.replace(/.\//g, '')}`
const templ = `${process.cwd()}/${rtempl.replace(/.\//g, '')}`

const template = fs.readFileSync(templ).toString()
const type = templ.replace(/.template/g, '').split('.').find((v, i, arr) => i + 1 == arr.length)!
console.log(`input: ${inp}\noutput ${out}\ntemplate: ${templ}`)

const convert = async (path: string) => {
    const name = path.split('.').filter((v, i, arr) => i + 1 < arr.length).join('.')
    const cont = (await fsp.readFile(path)).toString()
    const outp = template.replace(/<<name>>/g, name).replace(/<<Name>>/g, name.charAt(0).toUpperCase() + name.slice(1)).replace(/<<content>>/g, cont)
    fs.writeFileSync(`${out}/${name}.${type}`, outp)
}

const run = (...changes: string[]) => {
    (changes.length > 0 ? changes : fs.readdirSync(inp)).forEach(name => {
        if (!name.endsWith('.svg')) return
        convert(name)
    })
}


fs.watch(inp, change => {
    if (!change.endsWith('.svg')) return
    console.log('changes detected, rerunning')
    run(change)
})
run()