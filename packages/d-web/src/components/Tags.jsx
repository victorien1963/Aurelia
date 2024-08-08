/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
// import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleExclamation,
  faCirclePlus,
  // faCopy,
  faEye,
  faPenToSquare,
  faReply,
  faSearch,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import {
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  Modal,
  InputGroup,
  Container,
} from 'react-bootstrap'
import { Context } from './ContextProvider'

function ShowModal({ setting }) {
  const { show, tag, handleClose } = setting
  // useEffect(() => {
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.appendChild(document.createTextNode(``))

  //   const parent = document.head // or document.body;
  //   parent.appendChild(script)
  // })
  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton />
      <Modal.Body className="p-4">
        <iframe
          width="400"
          height="400"
          title="preview"
          srcDoc={`
          <header>${tag.setting?.code}</header>
          <body style="height:400px;" />
        `}
        />
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
          variant="narwhal"
          onClick={() => handleClose(true)}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function DeleteModal({ setting }) {
  const { show, name, handleClose } = setting

  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton />
      <Modal.Body className="p-4">
        <div className="d-flex">
          <FontAwesomeIcon
            className="px-0 m-auto text-chelonia text-center"
            style={{
              height: '100px',
            }}
            icon={faCircleExclamation}
          />
        </div>
        <h5 className="text-center lh-lg text-chelonia">
          <br />
          警告！刪除後無法復原！
          <br />
          仍要刪除
          <span className="text-danger">{`「${name}」標籤`}</span>
          嗎？
        </h5>
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
          variant="narwhal"
          onClick={() => handleClose(true)}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function ProjectModal({ setting }) {
  const {
    show,
    form,
    defaultValue = {},
    setDuration,
    handleClose,
    data,
    onDataChange,
  } = setting
  const [showDate, setshowDate] = useState(false)

  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton>
        {defaultValue.setting ? `編輯預覽` : `新建預覽`}
      </Modal.Header>
      <Modal.Body className="p-4">
        {form.map((f, i) => {
          switch (f.type) {
            case 'date':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      name={f.name}
                      type="text"
                      value={data[f.name] || f.placeholder}
                      placeholder={f.placeholder}
                      onFocus={() => setshowDate(!showDate)}
                      readOnly
                    />
                    <Button
                      variant="chelonia2"
                      onClick={() => setshowDate(!showDate)}
                    >
                      確認
                    </Button>
                  </InputGroup>
                </React.Fragment>
              )
            case 'select':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Select
                    name={f.name}
                    type={f.type}
                    value={data[f.name] || ''}
                    onChange={onDataChange}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  >
                    <option value="">未選擇</option>
                    {f.content.map((c) => (
                      <option value={c}>{c}</option>
                    ))}
                  </Form.Select>
                </React.Fragment>
              )
            case 'file':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Control
                    name={f.name}
                    type={f.type}
                    onChange={async (e) => {
                      // const formData = new FormData()
                      // formData.append('file', e.target.files[0])
                      onDataChange({
                        target: {
                          name: f.name,
                          value: e.target.files[0],
                        },
                      })
                      console.log('file append')
                      const temp = URL.createObjectURL(e.target.files[0])
                      const audio = document.createElement('audio')
                      audio.muted = true
                      console.log('audio created')
                      const source = document.createElement('source')
                      source.src = temp // --> blob URL
                      audio.preload = 'metadata'
                      audio.appendChild(source)
                      console.log('reading metadata')
                      audio.onloadedmetadata = () => {
                        console.log(audio.duration)
                        setDuration(audio.duration)
                      }
                      // const uploaded = await apiServices.data({
                      //   path: `material/file`,
                      //   method: 'post',
                      //   data: formData,
                      //   contentType: 'multipart/form-data',
                      // })
                      // console.log(uploaded)
                    }}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  />
                </React.Fragment>
              )
            case 'textarea':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Control
                    name={f.name}
                    type="text"
                    as="textarea"
                    rows="10"
                    value={data[f.name] || ''}
                    onChange={onDataChange}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  />
                </React.Fragment>
              )
            default:
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Form.Control
                    name={f.name}
                    type={f.type}
                    value={data[f.name] || ''}
                    onChange={onDataChange}
                    placeholder={f.placeholder}
                    onFocus={() => setshowDate(false)}
                  />
                </React.Fragment>
              )
          }
        })}
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          className="ms-auto"
          style={{ boxShadow: 'none' }}
          variant="secondary"
          onClick={() => handleClose()}
        >
          取 消
        </Button>
        <Button
          className="me-auto"
          style={{ boxShadow: 'none' }}
          variant="narwhal"
          onClick={() => handleClose(true)}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Tags() {
  // const navigate = useNavigate()

  const [selectedId, setselectedId] = useState('')
  //   const [warn, setWarn] = useState({
  //     show: false,
  //     text: '',
  //     handleClose: () => {},
  //   })

  //   const { auth } = useContext(AuthContext)
  const {
    tags,
    // containerId,
    setContainerId,
    handleAddTag,
    handleEditTag,
    handleDeleteTag,
  } = useContext(Context)
  // const { setToast } = useContext(ToastContext)

  const form = [
    {
      name: 'name',
      label: '名稱',
      placeholder: '輸入名稱',
      type: 'text',
    },
    {
      name: 'id',
      label: 'v0 ID',
      placeholder: '輸入v0提供的ID',
      type: 'tel',
    },
    {
      name: 'code',
      label: 'v0 code',
      placeholder: '輸入v0提供的代碼',
      type: 'textarea',
    },
  ]

  const [show, setshow] = useState(false)
  const [data, setdata] = useState({})
  const onDataChange = (e) =>
    setdata({ ...data, [e.target.name]: e.target.value })
  useEffect(() => {
    if (show) {
      setdata(
        form.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.name]: '',
          }),
          {}
        )
      )
    }
  }, [show])

  const handleClose = (value) => {
    setshow(false)
    if (!value) return
    const { name } = data
    handleAddTag(name, data)
  }

  const [deleteShow, setdeleteShow] = useState(false)
  const handleDeleteClose = (value) => {
    setdeleteShow(false)
    if (value) {
      handleDeleteTag(selectedId)
    }
  }

  const [tempSearch, setTempSearch] = useState('')
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)

  const [showEdit, setshowEdit] = useState(false)
  const [editData, seteditData] = useState({})
  const onEditDataChange = (e) =>
    seteditData({ ...editData, [e.target.name]: e.target.value })
  const handleCloseEdit = (value) => {
    setshowEdit(false)
    console.log(value)
    if (value) {
      handleEditTag(selectedId, editData.name, {
        ...editData,
      })
    }
    // if (!value) return
  }

  useEffect(() => {
    const target = tags.find(({ tag_id }) => tag_id === selectedId) || {}
    seteditData(
      form.reduce(
        (prev, cur) => ({
          ...prev,
          [cur.name]: target.setting
            ? target.setting[cur.name] || target[cur.name] || ''
            : '',
        }),
        {}
      )
    )
  }, [selectedId])

  const [showTag, setshowTag] = useState(false)
  return (
    <Container className="d-flex flex-column pt-3 h-100">
      <Row className="px-5">
        <Col xs={2} className="d-flex">
          <h5 className="my-auto text-chelonia-light fw-bold">v0管理</h5>
        </Col>
        <Col xs={2} />
        <Col xs={3} className="d-flex justifu-content-end">
          {/* <Form.Select
            className="w-100 h-100"
            aria-label="Default select example"
            onChange={(e) => setselected(e.target.value)}
            value={selected}
          >
            <option value="" className="d-none">
              選擇素材類型
            </option>
            {(allowTypes.length
              ? allowTypes.map(
                  (t) =>
                    ({
                      ta: '轉場動畫',
                      wm: '浮水印',
                      clip: '影片',
                      video: '影片',
                    }[t])
                )
              : ['浮水印', '轉場動畫', '影片']
            ).map((label, i) => (
              <option key={i} value={label}>
                {label}
              </option>
            ))}
          </Form.Select> */}
        </Col>
        <Col xs={5} className="d-flex pe-0">
          <InputGroup>
            <Form.Control
              placeholder="輸入關鍵字以搜尋..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={tempSearch}
              onChange={(event) => setTempSearch(event.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.nativeEvent.isComposing &&
                  focus
                )
                  setSearch(tempSearch)
              }}
            />
            <Button
              variant="outline-dark"
              id="button-addon2"
              title="搜 尋"
              onClick={() => setSearch(tempSearch)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
          <Button
            className="ms-4 w-50"
            variant="narwhal"
            onClick={() => {
              // setselectedId('')
              setshow(true)
            }}
          >
            新增v0預覽&ensp;
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
          <Button
            className="ms-4 w-50"
            variant="narwhal"
            onClick={() => {
              setContainerId('')
            }}
          >
            回容器列表&ensp;
            <FontAwesomeIcon icon={faReply} />
          </Button>
        </Col>
      </Row>
      <Row
        className="flex-grow-1 pt-3 pb-5 px-5 h-100"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {tags && tags.length ? (
          <ListGroup className="pe-0 h-100">
            {tags
              .filter(
                ({ name, setting }) =>
                  !search ||
                  (Object.keys(setting).some(
                    (key) =>
                      setting[key] &&
                      `${setting[key]}`
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  ) &&
                    (!search || name.includes(search)))
              )
              .map(({ name, tag_id }) => (
                <ListGroupItem className="d-flex row" key={tag_id}>
                  <Col
                    xs={3}
                    className="my-auto text-start oneLineEllipsis fs-7"
                    title={name}
                  >
                    {name}
                  </Col>
                  <Col xs={6} className="my-auto text-start ps-2">
                    <div className="fs-7 fw-regular text-chelonia">
                      建立者｜
                    </div>
                    <div className="fs-7 fw-regular text-chelonia">
                      建立時間｜
                    </div>
                  </Col>
                  <Col xs={3} className="d-flex my-auto">
                    <Button
                      className="ms-auto"
                      style={{ boxShadow: 'none' }}
                      variant="edit"
                      onClick={() => {
                        setselectedId(tag_id)
                        setshowTag(true)
                      }}
                      title="重 新 命 名"
                      size
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                      className="ms-auto"
                      style={{ boxShadow: 'none' }}
                      variant="edit"
                      onClick={() => {
                        setselectedId(tag_id)
                        setshowEdit(true)
                      }}
                      title="重 新 命 名"
                      size
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      style={{ boxShadow: 'none' }}
                      variant="red"
                      onClick={() => {
                        setselectedId(tag_id)
                        setdeleteShow(true)
                      }}
                      title="刪 除"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </Col>
                </ListGroupItem>
              ))}
          </ListGroup>
        ) : (
          <div className="d-flex ps-3 border">
            <h5 className="m-auto text-chelonia-light">目前尚無資料</h5>
          </div>
        )}
      </Row>
      {show && (
        <ProjectModal
          setting={{
            show,
            form,
            // duration,
            //   setDuration,
            // defaultValue: selectedId
            //   ? list.find((l) => l.material_id === selectedId)
            //   : {},
            data,
            onDataChange,
            defaultValue: {},
            handleClose,
          }}
        />
      )}
      <DeleteModal
        setting={{
          show: deleteShow,
          name: tags.find(({ tag_id }) => tag_id === selectedId)?.name,
          handleClose: handleDeleteClose,
        }}
      />
      {showTag && (
        <ShowModal
          setting={{
            show: showTag,
            tag: tags.find(({ tag_id }) => tag_id === selectedId),
            handleClose: () => setshowTag(false),
          }}
        />
      )}
      {selectedId && showEdit && (
        <ProjectModal
          setting={{
            show: showEdit,
            form,
            // duration,
            //   setDuration,
            // defaultValue: selectedId
            //   ? list.find((l) => l.material_id === selectedId)
            //   : {},
            data: editData,
            onDataChange: onEditDataChange,
            defaultValue: {},
            handleClose: handleCloseEdit,
          }}
        />
      )}
    </Container>
  )
}

ShowModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

DeleteModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

ProjectModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Tags
