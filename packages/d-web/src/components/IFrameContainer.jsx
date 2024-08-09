import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

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
    console.log('getting size')
    if (ref.current) {
      const width = ref.current.clientWidth
      const height = ref.current.clientHeight
      console.log({ width, height })
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
  return (
    <div className="h-100 w-100" ref={ref}>
      {size.height && (
        <iframe
          width={size.width}
          height={size.height}
          title="preview"
          src={`https://generated.vusercontent.net/p/${id}?flags=1&flags=1`}
        />
      )}
    </div>
  )
}

IFrameContainer.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default IFrameContainer
