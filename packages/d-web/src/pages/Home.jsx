/* eslint-disable no-promise-executor-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'moment-timezone'
import {
  Form,
  InputGroup,
  Image,
  Button,
  Modal,
  Container,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faEyeSlash,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext, ToastContext } from '../components/ContextProvider'
import apiServices from '../services/apiServices'
import { LoadingButton, ContainerAndPreview } from '../components'
import logoFull from '../asset/images/logo-full.png'

function Warn({ setting }) {
  const { size = 'md', show = false, handleClose } = setting

  return (
    <Modal
      style={{ zIndex: '1501' }}
      size={size}
      show={show !== false}
      onHide={() => handleClose(false)}
    >
      <Modal.Header
        className="AccFormModal justify-content-center text-center pt-4"
        closeButton
      >
        <Modal.Title>
          <h4>系統訊息</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex AccformCard">
        <div className="assPermis w-100">
          <Form className="px-2 Form-card flex-grow-1">
            <Form.Group className="px-5 lh-md text-center text-aure">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                style={{ height: '5rem' }}
                className="my-4"
              />
              <Form.Label className="w-100 fs-5 fw-bold text-center pb-4">
                確定要刪除
                {/* {show && target
                  ? target.setting.name ||
                    `專案${target.setting.id || target.project_id}`
                  : '專案'} */}
                嗎？
              </Form.Label>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer className="sendForm justify-content-center py-3">
        <Button variant="secondary" onClick={() => handleClose(false)}>
          取消
        </Button>
        <Button variant="aure" onClick={() => handleClose(show)}>
          確定
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Home() {
  const { auth, setAuth } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)

  const [method, setmethod] = useState('login')

  const [reveal, setReveal] = useState(false)
  const fields = [
    {
      label: '帳號',
      type: 'text',
      name: 'email',
      placeholder: '帳號',
    },
    {
      label: '密碼',
      type: 'password',
      name: 'password',
      placeholder: '密碼',
    },
  ]

  const registerFields = [
    {
      label: '帳號',
      type: 'text',
      name: 'email',
      placeholder: '帳號',
    },
    {
      label: '密碼',
      type: 'password',
      name: 'password',
      placeholder: '密碼',
    },
    {
      label: '確認密碼',
      type: 'password',
      name: 'cpassword',
      placeholder: '確認密碼',
    },
  ]
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    setData(
      (method === 'login' ? fields : registerFields).reduce(
        (prev, cur) => ({ ...prev, [cur.name]: '' }),
        {}
      )
    )
  }, [method])
  const onDataChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }
  const handleLogin = async () => {
    if (data.cpassword && data.password !== data.cpassword) {
      setToast({
        show: true,
        text: `兩次輸入密碼不同`,
      })
      return
    }
    const { token } =
      method === 'login'
        ? await apiServices.login(data)
        : await apiServices.register(data)
    if (!token) {
      setToast({
        show: true,
        text: `${method === 'login' ? '登 入' : '註 冊'} 失 敗`,
      })
      return
    }
    document.cookie = `token=${token}; Domain=${window.location.hostname}; Path=/;`
    const { user } = await apiServices.me()
    setAuth({
      authed: true,
      nav: true,
      ...user,
    })
  }

  // const [showWarn, setshowWarn] = useState(false)

  return (
    <Container
      className="h-100 w-100 d-flex flex-column position-relative"
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
      // onClick={() => setEditing('')}
    >
      {auth.authed ? (
        <ContainerAndPreview />
      ) : (
        <div className="h-100 w-100 bg-dots-light">
          <div className="d-flex" style={{ height: '65%' }}>
            <Image
              className="mt-auto mx-auto"
              src={logoFull}
              style={{ height: 'auto', width: '19rem' }}
            />
          </div>
          <div className="d-flex w-100 my-auto" style={{ height: '35%' }}>
            <Form className="py-3 px-5 mx-auto d-flex flex-column">
              {(method === 'login' ? fields : registerFields).map((field) => (
                <Form.Group key={field.name} className="d-flex mb-2">
                  {/* <Form.Label>{field.label}</Form.Label> */}
                  {field.type === 'password' ? (
                    <InputGroup
                      id="defaultBorder"
                      className="rounded input-group-transparent-addon w-100"
                    >
                      <Form.Control
                        size="sm"
                        name={field.name}
                        type={reveal ? 'text' : field.type}
                        value={data[field.name]}
                        onChange={onDataChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.isComposing) handleLogin()
                        }}
                        placeholder={field.placeholder}
                      />
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          className="fs-6"
                          style={{
                            right: '10',
                            top: '50',
                            bottom: '50',
                            cursor: 'pointer',
                          }}
                          title={reveal ? '點擊以隱藏密碼' : '點擊以顯示密碼'}
                          icon={reveal ? faEye : faEyeSlash}
                          onClick={() => setReveal(!reveal)}
                        />
                      </InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <Form.Control
                      size="sm"
                      name={field.name}
                      type={field.type}
                      value={data[field.name]}
                      onChange={onDataChange}
                      placeholder={field.placeholder}
                    />
                  )}
                </Form.Group>
              ))}
              <LoadingButton
                className="mx-auto my-2"
                variant="aure2"
                onClick={handleLogin}
                btnText={method === 'login' ? 'Login' : 'Register'}
                disabled={Object.keys(data).some((key) => !data[key])}
              />
              <div className="d-flex">
                <span
                  className="w-100 mx-auto small"
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  onClick={() =>
                    setmethod(method === 'login' ? 'register' : 'login')
                  }
                  aria-hidden
                >
                  {method === 'login' ? '註冊' : '登入'}
                </span>
              </div>
            </Form>
          </div>
        </div>
      )}
      {/* <Warn
        setting={{
          show: showWarn,
          handleClose: () => {},
        }}
      /> */}
    </Container>
  )
}

Warn.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Home
