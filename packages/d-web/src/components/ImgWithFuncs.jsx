/* eslint-disable no-promise-executor-return */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Image, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  // faDownload,
  // faTrashCan,
  // faUpload,
  faImage,
} from '@fortawesome/free-solid-svg-icons'
import { Context } from './ContextProvider'
import apiServices from '../services/apiServices'

function ImgWithFunc({ setting }) {
  const {
    container_id,
    id = 'file',
    scale = '40px',
    disabled = false,
  } = setting

  const { containers, getContainers } = useContext(Context)
  const { icon } = containers.find((c) => c.container_id === container_id).setting

  const [uploading, setuploading] = useState(null)
  useEffect(() => {
    const uploadImg = async () => {
      const getArrayBuffer = (files) =>
        new Promise((resolve) => {
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            resolve(reader.result)
          })
          reader.readAsArrayBuffer(files)
        })
      const files = []
      files.push(getArrayBuffer(uploading))

      const buffered = await Promise.all(files)
      const arrayed = buffered.map((buffer) => ({
        name: uploading.name,
        data: Array.from(new Uint8Array(buffer)),
      }))
      const res = await apiServices.data({
        path: `container/${container_id}/image`,
        method: 'post',
        data: {
          files: JSON.stringify(arrayed),
        },
      })
      console.log(res)
      // if (!res.error) handlePicChange(`/api/draft/image/${res[0].name}`)
      getContainers()
      setuploading(null)
    }
    if (uploading) uploadImg()
  }, [uploading])

  return (
    <div
      className="position-relative my-auto d-flex"
      style={{
        width: scale,
        height: scale,
      }}
    >
      <div className="position-relative imgHover w-100 h-100 ms-auto d-flex">
        <Form.Label className="m-auto w-100 h-100 d-flex" htmlFor={id}>
          {icon && icon.name
            ? <Image
              title="點擊上傳LOGO圖片"
              className="m-auto"
              src={`api/image/${icon.name}`}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
            : <FontAwesomeIcon
              title="點擊上傳LOGO圖片"
              icon={faImage}
              className="text-dai-white m-auto"
              style={{
                height: '100%',
                width: '100%',
                cursor: 'pointer'
              }}
            />
          }
        </Form.Label>
        <Form.Control
          id={id}
          name="file"
          type="file"
          disabled={disabled}
          onChange={(e) => {
            setuploading(e.target.files[0])
            e.target.value = ''
            e.stopPropagation()
          }}
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="p-0 m-0 border-0"
          style={{
            visibility: 'hidden',
            width: '0px',
            height: '0px',
          }}
        />
      </div>
    </div>
  )
}

ImgWithFunc.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default ImgWithFunc
