/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo, createContext } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import { Manager } from 'socket.io-client'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { v4 as uuidv4 } from 'uuid'
import apiServices from '../services/apiServices'

function ContextProvider(props) {
  const { children } = props
  const [auth, setAuth] = useState({
    authed: false,
  })
  const authValue = useMemo(() => ({ auth, setAuth }), [auth])
  const { authed, user_id } = auth

  const checkToken = async () => {
    const { user } = await apiServices.me()
    if (user) {
      setAuth({
        authed: true,
        ...user,
      })
    }
  }
  useEffect(() => {
    checkToken()
  }, [])

  const [socket, setSocket] = useState(null)
  useEffect(() => {
    if (!authed) return () => {}
    const manager = new Manager(window.location.origin)
    const newSocket = manager.socket('/', {
      auth: {
        auth: user_id,
      },
    })
    setSocket(newSocket)
    return () => newSocket.close()
  }, [setSocket, authed, user_id])
  const sendMessage = (type, message) => socket.emit(type, message)
  const socketValue = useMemo(() => ({ socket, sendMessage }), [socket])

  const [containers, setContainers] = useState([])
  const [containerId, setContainerId] = useState('')
  const container = useMemo(() => {
    if (containers && containerId)
      return (
        containers.find(({ container_id }) => container_id === containerId) ||
        {}
      )
    return {}
  }, [containers, containerId])

  const getContainers = async () => {
    const res = await apiServices.data({
      path: 'container/',
      method: 'get',
    })
    console.log('---init containers---')
    console.log(res)
    setContainers(res)
  }

  useEffect(() => {
    if (!auth.authed) return
    getContainers()
  }, [auth.authed])

  const handleAddContainer = async (name, setting) => {
    const res = await apiServices.data({
      path: 'container/',
      method: 'post',
      data: {
        name,
        setting,
      },
    })
    console.log('---add container---')
    console.log(res)
    getContainers()
  }

  const handleEditContainer = async (container_id, name, setting) => {
    const res = await apiServices.data({
      path: `container/${container_id}`,
      method: 'put',
      data: {
        name,
        setting,
      },
    })
    console.log('---edit container---')
    console.log(res)
    getContainers()
  }

  const handleDeleteContainer = async (id) => {
    const res = await apiServices.data({
      path: `container/${id}`,
      method: 'delete',
    })
    console.log('---delete container---')
    console.log(res)
    getContainers()
  }

  const [tags, setTags] = useState([])
  const getTags = async () => {
    const res = await apiServices.data({
      path: `tag/${containerId}`,
      method: 'get',
    })
    console.log('---init tags---')
    console.log(res)
    setTags(res)
  }
  useEffect(() => {
    if (containerId) getTags()
  }, [containerId])

  const handleAddTag = async (name, setting) => {
    const res = await apiServices.data({
      path: `tag`,
      method: 'post',
      data: {
        name,
        container_id: containerId,
        setting,
      },
    })
    console.log('---add tag---')
    console.log(res)
    getTags()
  }

  const handleEditTag = async (tag_id, name, setting) => {
    const res = await apiServices.data({
      path: `tag/${tag_id}`,
      method: 'put',
      data: {
        name,
        setting,
      },
    })
    console.log('---edit tag---')
    console.log(res)
    getTags()
  }

  const handleAddSubTag = async (tag_id, name, setting) => {
    const target = tags.find((tag) => tag.tag_id === tag_id)
    const res = await apiServices.data({
      path: `tag/${tag_id}`,
      method: 'put',
      data: {
        name: target.name,
        setting: {
          ...target.setting,
          subtags: [
            ...(target.setting.subtags || []),
            {
              name,
              id: uuidv4(),
              setting,
            },
          ],
        },
      },
    })
    console.log('---edit tag---')
    console.log(res)
    getTags()
  }

  const handleEditSubTag = async (tag_id, index, name, setting) => {
    const target = tags.find((tag) => tag.tag_id === tag_id)
    const res = await apiServices.data({
      path: `tag/${tag_id}`,
      method: 'put',
      data: {
        name: target.name,
        setting: {
          ...target.setting,
          subtags: target.setting.subtags.map((st, i) =>
            i === index
              ? {
                  ...st,
                  name,
                  setting,
                }
              : st
          ),
        },
      },
    })
    console.log('---edit tag---')
    console.log(res)
    getTags()
  }

  const handleDeleteSubTag = async (tag_id, index) => {
    const target = tags.find((tag) => tag.tag_id === tag_id)
    const res = await apiServices.data({
      path: `tag/${tag_id}`,
      method: 'put',
      data: {
        name: target.name,
        setting: {
          ...target.setting,
          subtags: target.setting.subtags.filter((st, i) => i !== index),
        },
      },
    })
    console.log('---edit tag---')
    console.log(res)
    getTags()
  }

  const handleDeleteTag = async (id) => {
    const res = await apiServices.data({
      path: `tag/${id}`,
      method: 'delete',
    })
    console.log('---delete tag---')
    console.log(res)
    getTags()
  }

  // const [process, setprocess] = useState({})

  // undo and redo
  // const [history, setHistory] = useState([])
  // const [recoverTarget, setRecoverTarget] = useState(-1)
  // const [cursor, setCursor] = useState(-1)
  // const handleRecover = (target) => setRecoverTarget(target)

  const contextValue = useMemo(
    () => ({
      containers,
      containerId,
      setContainerId,
      handleAddContainer,
      handleEditContainer,
      handleDeleteContainer,
      container,
      tags,
      handleAddTag,
      handleEditTag,
      handleDeleteTag,
      handleAddSubTag,
      handleEditSubTag,
      handleDeleteSubTag,
    }),
    [containers, containerId, container, tags]
  )

  useEffect(() => {
    // if (!socket) return
    // if (!drafts) {
    //   sendMessage('draft', { action: 'init' })
    // }
    // if (draftId) {
    //   sendMessage('draft', { action: 'update', data: draft })
    // }
  }, [socket])

  const [toast, setToast] = useState({ show: false, text: '' })
  const toastValue = useMemo(() => ({ toast, setToast }), [toast])
  return (
    <>
      {/* <NotiContext.Provider value={notification}> */}
      <ToastContext.Provider value={toastValue}>
        <AuthContext.Provider value={authValue}>
          <Context.Provider value={contextValue}>
            <SocketContext.Provider value={socketValue}>
              {children}
            </SocketContext.Provider>
          </Context.Provider>
        </AuthContext.Provider>
      </ToastContext.Provider>
      {/* </NotiContext.Provider> */}
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          style={{ width: '100%' }}
        >
          <Toast.Body>{toast.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

ContextProvider.propTypes = {
  children: PropTypes.shape().isRequired,
}

export default ContextProvider

export const Context = createContext(null)
// export const NotiContext = createContext([])
export const SocketContext = createContext({
  socket: null,
  sendMessage: () => {},
})
export const AuthContext = createContext({
  auth: {
    authed: false,
  },
  setAuth: () => {},
})
export const ToastContext = createContext({
  toast: { show: false, text: '' },
  setToast: () => {},
})
