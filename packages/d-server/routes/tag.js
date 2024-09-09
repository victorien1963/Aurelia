const express = require('express')
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const pg = require('../services/pgService')

const router = express.Router()

router.get('/:container_id', async (req, res) => {
    const tags = await pg.exec('any', 'SELECT * FROM tags WHERE container_id = $1 ORDER BY created_on desc', [req.params.container_id])
    return res.send(tags)
})

router.put('/:tag_id', async (req, res) => {
    const { name, setting } = req.body

    // update timestamp
    const selected = pg.exec('one', 'SELECT container_id FROM tags WHERE tag_id = $1', [req.params.tag_id])
    await pg.exec('none', 'UPDATE containers SET updated_on = current_timestamp WHERE container_id = $1', [selected.container_id]) 

    const tag = await pg.exec('one', 'UPDATE tags SET name = $1, setting = $2 WHERE tag_id = $3 RETURNING *', [name, {
        ...setting,
        updated_on: moment().format('yyyy-MM-DD hh:mm:ss'),
    }, req.params.tag_id])
    if (setting.codes && setting.codes[0] && setting.codes[0].code) {
        const filePath = path.join(__dirname, `../public/v0/${setting.id}.tsx`)
        const cssfilePath = path.join(__dirname, `../public/v0/${setting.id}.module.css`)
        console.log(filePath)
        fs.writeFile(filePath, `
import "./${setting.id}.module.css"
${setting.codes[0]?.code || ''}
        `, (result) => {
            console.log(result)
        })
        fs.writeFile(cssfilePath, setting.codes[1]?.code || '', (result) => {
            console.log(result)
        })
    }
    if (setting.subtags) {
        setting.subtags.map(async (st) => {
            if (st.setting.id && st.setting.codes && st.setting.codes[0] && st.setting.codes[0].code) {
                const filePath = path.join(__dirname, `../public/v0/${st.setting.id}.tsx`)
                const cssfilePath = path.join(__dirname, `../public/v0/${st.setting.id}.module.css`)
                fs.writeFile(filePath, `
import "./${st.setting.id}.module.css"
${st.setting.codes[0]?.code || ''}
                `, (result) => {
                    console.log(result)
                })
                fs.writeFile(cssfilePath, st.setting.codes[1]?.code || '', (result) => {
                    console.log(result)
                })
            }
        }, [])
    }
    return res.send(tag)
})

router.post('/', async (req, res) => {
    const { user_id } = req.user
    const { name, container_id, setting } = req.body

    // update timestamp
    await pg.exec('none', 'UPDATE containers SET updated_on = current_timestamp WHERE container_id = $1', [container_id]) 

    const tag = await pg.exec('one', 'INSERT INTO tags(name, setting, container_id, user_id, created_on) values($1, $2, $3, $4, current_timestamp)', [name, {
        ...setting,
        updated_on: moment().format('yyyy-MM-DD hh:mm:ss'),
    }, container_id, user_id])

    // write file to next
    if (setting.codes && setting.codes[0] && setting.codes[0].code) {
        const filePath = path.join(__dirname, `../public/v0/${setting.id}.tsx`)
        const cssfilePath = path.join(__dirname, `../public/v0/${setting.id}.module.css`)
        console.log(filePath)
        fs.writeFile(filePath, `
import "./${setting.id}.module.css"
${setting.codes[0]?.code || ''}
            `, (result) => {
            console.log(result)
            return res.send(tag)
        })
        fs.writeFile(cssfilePath, setting.codes[1]?.code || '', (result) => {
            console.log(result)
        })
    } else {
        return res.send(tag)
    }
    // return res.send(tag)
})

router.delete('/:tag_id', async (req, res) => {
    // update timestamp
    const selected = pg.exec('one', 'SELECT container_id FROM tags WHERE tag_id = $1', [req.params.tag_id])
    await pg.exec('none', 'UPDATE containers SET updated_on = current_timestamp WHERE container_id = $1', [selected.container_id]) 

    const tag = await pg.exec('one', 'DELETE FROM tags WHERE tag_id = $1 RETURNING *', [req.params.tag_id])
    return res.send(tag)
})

module.exports = router
