import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

function ApiModal({ setting }) {
  const { show, handleClose } = setting

  const [mode, setmode] = useState('api')
  const form = {
    api: [
      {
        label: '選擇媒體平台',
        name: '',
        Placeholder: '請選擇...',
        type: 'text',
      },
      {
        label: 'API文件位置(URL)',
        name: '',
        Placeholder: 'https://...',
        type: 'text',
      },
      {
        label: 'API token / key',
        name: '',
        Placeholder: 'token...',
        type: 'text',
      },
      {
        label: 'Prompts',
        name: '',
        Placeholder: '',
        type: 'textarea',
        as: 'textarea',
      },
    ],
    data: [
      {
        label: '數據/資料名稱',
        name: '',
        Placeholder: '',
        type: 'text',
      },
      {
        label: 'API回傳欄位1',
        name: '',
        Placeholder: '',
        type: 'textarea',
        as: 'textarea',
      },
      {
        label: 'API回傳欄位2',
        name: '',
        Placeholder: '',
        type: 'textarea',
        as: 'textarea',
      },
      {
        label: 'API回傳欄位3',
        name: '',
        Placeholder: '',
        type: 'textarea',
        as: 'textarea',
      },
      {
        label: 'API回傳欄位4',
        name: '',
        Placeholder: '',
        type: 'textarea',
        as: 'textarea',
      },
    ],
  }

  return (
    <Modal
      style={{ zIndex: '1501', minHeight: '60vh' }}
      show={show}
      onHide={() => handleClose()}
      size="lg"
      className="py-2 px-4"
    >
      <Modal.Header closeButton>
        <Row className="w-100">
          <Col xs={3}>
            <h4 onClick={() => setmode('api')} aria-hidden>
              API串接設定
            </h4>
          </Col>
          <Col xs={1}>
            <h4 aria-hidden>|</h4>
          </Col>
          <Col xs={3}>
            <h4 onClick={() => setmode('data')} aria-hidden>
              數據管理
            </h4>
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body className="p-4 h-100">
        {form[mode].map(({ label, name, placeholder, type, as }) => (
          <React.Fragment key={label}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              style={{
                minHeight: '30px',
              }}
              type={type}
              as={as}
              placeholder={placeholder}
              name={name}
            />
          </React.Fragment>
        ))}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="ms-auto me-2"
          style={{ boxShadow: 'none' }}
          variant="secondary"
          onClick={() => handleClose()}
        >
          取 消
        </Button>
        <Button
          className="me-auto"
          style={{ boxShadow: 'none' }}
          variant="aure"
          onClick={() => handleClose(true)}
        >
          {mode === 'api' ? '生 成' : '儲 存'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ApiModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default ApiModal
