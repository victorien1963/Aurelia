const express = require('express')
const pg = require('../services/pgService')
const { upload } = require('../services/minio')

const router = express.Router()

router.get('/', async (req, res) => {
    const { user_id } = req.user
    const containers = await pg.exec('any', 'SELECT * FROM containers WHERE user_id = $1', [user_id])
    return res.send(containers)
})

router.get('/:container_id', async (req, res) => {
    const container = await pg.exec('any', 'SELECT * FROM containers WHERE container_id = $1', [req.params.container_id])
    return res.send(container)
})

router.put('/:container_id', async (req, res) => {
    const { name, setting } = req.body
    const container = await pg.exec('one', 'UPDATE containers SET name = $1, setting = $2, updated_on = current_timestamp WHERE container_id = $3 RETURNING *', [name, setting, req.params.container_id])
    return res.send(container)
})

router.post('/:container_id/image', async (req, res) => {
    // if (!req.user) return res.send({ error: 'user not found' })
    const container = await pg.exec('any', 'SELECT * FROM containers WHERE container_id = $1', [req.params.container_id])
    const uploads = await Promise.all(JSON.parse(req.body.files).map((file) => {
        return upload({ Key: file.name, Body: Buffer.from(file.data) })
    }))
    console.log(uploads)
    const updated = await pg.exec('one', 'UPDATE containers SET setting = $1, updated_on = current_timestamp WHERE container_id = $2 RETURNING *', [{
        ...container.setting,
        icon: uploads[0],
    }, req.params.container_id])
    return res.send(updated)
})

router.get('/:container_id/adtag', async (req, res) => {
    return res.send(`<script id="pps-script-28653" src="https://narwhal.punwave.com/${container_id}" data-click-url="%%CLICK_URL_UNESC%%" data-cache-buster="%%CACHEBUSTER%%" data-tracking="[]" data-vast-tracking=""  ></script>`)
})

router.post('/', async (req, res) => {
    const { user_id } = req.user
    const { name, setting } = req.body
    const container = await pg.exec('one', 'INSERT INTO containers(name,setting, user_id, updated_on, created_on) values($1, $2, $3, current_timestamp, current_timestamp)', [name, setting, user_id])
    return res.send(container)
})

router.delete('/:container_id', async (req, res) => {
    const container = await pg.exec('one', 'DELETE FROM containers WHERE container_id = $1 RETURNING *', [req.params.container_id])
    return res.send(container)
})

module.exports = router
