import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { Context } from './ContextProvider'
import Containers from './Containers'
import Tags from './Tags'

function ContainerAndPreview() {
  const { containerId } = useContext(Context)
  return containerId ? <Tags /> : <Containers />
}

export default ContainerAndPreview
