import React, { useEffect, useMemo, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import TopNavBar from './TopNavBar'
import TopBar from './TopBar'
// import GPTHelper from './GPTHelper'
import { AuthContext, Context } from './ContextProvider'

function AppWrapper({ children }) {
  const { auth } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  const { containerId } = useContext(Context)

  const isInContainer = useMemo(
    () => ['/Container'].includes(location.pathname),
    [location]
  )
  useEffect(() => {
    if (containerId) {
      // navigate('/Module1')
    }
    if (!auth.authed || !containerId) {
      navigate('/')
    }
  }, [auth, location, containerId])

  return auth.authed ? (
    <div>
      <TopNavBar setting={{}} />
      <div
        className="d-flex position-relative overflow-hidden"
        style={{
          height: '92vh',
          width: '100vw',
        }}
      >
        <Col xs={12} className="d-flex flex-column px-0">
          {isInContainer && (
            <Row
              className="h-8 ps-4"
              style={{ borderBottom: '1px solid #eee', minHeight: '8%' }}
            >
              <TopBar />
            </Row>
          )}
          <Row
            className={`${
              isInContainer ? 'h-86' : 'h-94'
            } px-4 py-2 overflow-hidden position-relative`}
          >
            {children}
          </Row>
          <div
            className="d-flex fw-bold text-aure h-6"
            style={{ backgroundColor: '#f3f3f3' }}
          >
            <small className="m-auto">
              Copyright © 2024 Wavenet all rights reserved. ｜ Powered by
              Wavenet Inc.
            </small>
          </div>
        </Col>
        {/* <GPTHelper setting={{}} /> */}
      </div>
    </div>
  ) : (
    <div
      className="d-flex position-relative"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Col xs={12} className="d-flex flex-column">
        <Row className="flex-fill">{children}</Row>
      </Col>
    </div>
  )
}

AppWrapper.propTypes = {
  children: PropTypes.shape().isRequired,
  //   setting: PropTypes.shape().isRequired,
}

export default AppWrapper
