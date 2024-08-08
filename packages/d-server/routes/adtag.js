const express = require('express')
const pg = require('../services/pgService')

const router = express.Router()

router.get('/:container_id', async (req, res) => {
    const tags = await pg.exec('any', 'SELECT * FROM tags WHERE container_id = $1', [req.params.container_id])
    const max = tags.reduce((prev, cur) => prev + parseInt(cur.setting.percent, 10), 0)
    let selected = null
    let random = parseInt(Math.random() * max, 10)
    console.log(`max is ${max}, random is ${random}`)
    tags.forEach((tag, i) => {
        random = random - parseInt(tag.setting.percent, 10)
        if (random <= 0 && !selected) {
            selected = tag
            return
        }
    })
    console.log(selected)

    const str = selected.setting.adtag
    const srcdoc = `
        <header>${selected.setting.adtag}</header>
        <body style="height:400px;" />
    `
    const attrs = str.split(' ').filter((s) => s.includes('=')).reduce((prev, cur) => {
        const [key, value] = cur.split('=')
        return {
            ...prev,
            [key]: value.replaceAll('"', '')
        }
    }, {
        srcdoc,
    })

    const logEvent = await pg.exec('any', 'UPDATE tags SET setting = $2 WHERE tag_id = $1', [selected.tag_id, {
        ...selected.setting,
        times: selected.setting.times ? selected.setting.times + 1 : 1
    }])
    return res.json(attrs)
})

module.exports = router
