/* eslint-disable prefer-destructuring */
import React, { useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, DropdownButton, Row, Col, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from './ContextProvider'
import Avatar from './Avatar'
import MenuCard from './MeunCard'
import logoX from '../asset/images/logo-x.png'
// import fileFuncs from '../services/file'

function TopNavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setAuth } = useContext(AuthContext)

  const isInDraft = useMemo(
    () => location.pathname.includes('book'),
    [location]
  )

  return (
    <Row
      className="py-2 ps-4 pe-4"
      style={{
        backgroundColor: '#f3f3f3',
        height: '8vh',
      }}
    >
      <Col xs={9} className="d-flex">
        <Image src={logoX} className="me-auto my-auto" width="170px" />
      </Col>
      <Col xs={2} className="d-flex">
        <DropdownButton
          id="dropdown-button-drop-end"
          drop="end"
          className="h-100 w-100 text-end"
          title={
            <div className="text-aure fw-bolder my-auto">
              <div
                className="d-flex"
                style={{
                  height: '25px',
                }}
              >
                <Avatar />
                &emsp;username
              </div>
            </div>
          }
        >
          <MenuCard />
        </DropdownButton>
      </Col>
      {isInDraft && (
        <Col xs={1}>
          <Button
            onClick={() =>
              navigate(`/${location.pathname.split('/')[2] || ''}`)
            }
            className="mx-auto my-2 text-nowrap"
            style={{
              width: '85%',
            }}
            variant="outline-aure"
            size="sm"
          >
            <FontAwesomeIcon icon={faReply} />
            &ensp;返回列表
          </Button>
        </Col>
      )}
      <Col xs={1} className="my-auto">
        <Button
          onClick={() => {
            document.cookie = `token=; Domain=${window.location.hostname}; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
            setAuth({
              authed: false,
            })
            window.location.replace('/')
          }}
          className="my-auto w-75"
          variant="aure2"
          size="sm"
        >
          Log out
        </Button>
      </Col>
    </Row>
  )
}

export default TopNavBar
