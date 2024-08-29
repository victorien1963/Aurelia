import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap'

function IFrameContainer(props) {
  const { setting } = props
  const { id } = setting
  const ref = useRef()
  // const iframeRef = useRef()

  const [size, setSize] = useState({
    // width: 600,
    // height: 450,
  })
  const getSize = () => {
    if (ref.current) {
      const width = ref.current.clientWidth
      const height = ref.current.clientHeight
      return { width, height }
    }
    return false
  }
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const newSize = getSize()
      if (newSize.width !== size.width || newSize.height !== size.height)
        setSize(newSize)
    })
    observer.observe(ref.current)
    return () => ref.current && observer.unobserve(ref.current)
  }, [])
  console.log(size)

  // useEffect(() => {
  //   console.log('resized')
  //   iframeRef.current.height = `${size.height}px`
  //   iframeRef.current.width = `${size.width}px`
  // }, [size])
  const [loading, setloading] = useState(true)
  useEffect(() => {
    if (id) {
      setloading(true)
      setTimeout(() => setloading(false), 2000)
    }
  }, [id])
  return (
    <div className="h-100 w-100 position-relative" ref={ref}>
      {loading && (
        <div
          className="w-100 h-100 d-flex position-absolute"
          style={{
            color: '#000',
            backgroundColor: '#fff',
          }}
        >
          <div className="m-auto d-flex">
            <Spinner className="my-auto" size="sm" />
            <span className="my-auto ms-2">頁面載入中...</span>
          </div>
        </div>
      )}
      {size.height && (
        <iframe
          width={size.width}
          height={size.height}
          title="preview"
          src={`https://aurelia-next.punwave.com/v0/${id}`}
        />
      )}
    </div>
  )
}

IFrameContainer.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default IFrameContainer
