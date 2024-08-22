const express = require('express')
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
    const tag = await pg.exec('one', 'UPDATE tags SET name = $1, setting = $2 WHERE tag_id = $3 RETURNING *', [name, setting, req.params.tag_id])
    if (setting.subtags) {
        setting.subtags.map(async (st) => {
            if (st.setting.id && st.setting.codes && st.setting.codes[0] && st.setting.codes[0].code) {
                const filePath = path.join(__dirname, `../public/v0/${st.setting.id}.tsx`)
                fs.writeFile(filePath, st.setting.codes[0].code, (result) => {
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
    const tag = await pg.exec('one', 'INSERT INTO tags(name, setting, container_id, user_id, created_on) values($1, $2, $3, $4, current_timestamp)', [name, setting, container_id, user_id])

    // write file to next
    const filePath = path.join(__dirname, `../public/v0/${setting.id}.tsx`)
    console.log(filePath)
    fs.writeFile(filePath, setting.codes[0].code, (result) => {
        console.log(result)
        return res.send(tag)
    })
    // return res.send(tag)
})

router.delete('/:tag_id', async (req, res) => {
    const tag = await pg.exec('one', 'DELETE FROM tags WHERE tag_id = $1 RETURNING *', [req.params.tag_id])
    return res.send(tag)
})

module.exports = router
