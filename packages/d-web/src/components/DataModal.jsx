import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'react-bootstrap'

function DataModal({ setting }) {
  const { show, handleClose } = setting

  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton />
      <Modal.Body className="p-4" />
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
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

DataModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default DataModal
