/* eslint-disable react/style-prop-object */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleExclamation,
  faCirclePlus,
  faPenToSquare,
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
  // Tab,
  // Tabs,
} from 'react-bootstrap'
import { Context } from './ContextProvider'
import SelectBar from './SelectBar'

// function IframeContainer() {
//   const ref = useRef()
//   // const iframeRef = useRef()

//   const [size, setSize] = useState({
//     // width: 600,
//     // height: 450,
//   })
//   const getSize = () => {
//     console.log('getting size')
//     if (ref.current) {
//       const width = ref.current.clientWidth - 50
//       const height = ref.current.clientHeight - 100
//       console.log({ width, height })
//       return { width, height }
//     }
//     return false
//   }
//   useEffect(() => {
//     const observer = new ResizeObserver(() => {
//       const newSize = getSize()
//       if (newSize.width !== size.width || newSize.height !== size.height)
//         setSize(newSize)
//     })
//     observer.observe(ref.current)
//     return () => ref.current && observer.unobserve(ref.current)
//   }, [])
//   console.log(size)

//   // useEffect(() => {
//   //   console.log('resized')
//   //   iframeRef.current.height = `${size.height}px`
//   //   iframeRef.current.width = `${size.width}px`
//   // }, [size])
//   return (
//     <div className="h-100 w-100" ref={ref}>
//       {size.height && (
//         <iframe
//           // ref={iframeRef}
//           title="frame"
//           width={size.width}
//           height={size.height}
//           src="https://lookerstudio.google.com/embed/reporting/a560e96a-03ad-41bb-a773-a04f55aab23e/page/cQa7D"
//           frameBorder="0"
//           // style="border:0"
//           allowfullscreen
//           sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
//         />
//       )}
//     </div>
//   )
// }

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
          <span className="text-danger">{`「${name}」專案`}</span>
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
          variant="aure"
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
      <Modal.Header closeButton className="h5">
        {defaultValue.setting ? `編輯專案` : `新建專案`}
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
          variant="aure"
          onClick={() => handleClose(true)}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Containers() {
  // const navigate = useNavigate()

  const [selectedId, setselectedId] = useState('')
  const [sort, setsort] = useState({ field: 'updated_on', order: 'desc' })
  //   const [warn, setWarn] = useState({
  //     show: false,
  //     text: '',
  //     handleClose: () => {},
  //   })

  //   const { auth } = useContext(AuthContext)
  const {
    containers,
    setContainerId,
    handleAddContainer,
    handleEditContainer,
    handleDeleteContainer,
  } = useContext(Context)

  const form = [
    {
      name: 'name',
      label: '名稱',
      placeholder: '輸入名稱',
      type: 'text',
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
    handleAddContainer(name, {})
  }

  const [deleteShow, setdeleteShow] = useState(false)
  const handleDeleteClose = (value) => {
    setdeleteShow(false)
    if (value) {
      handleDeleteContainer(selectedId)
    }
  }

  const [tempSearch, setTempSearch] = useState('')
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)

  const [showEdit, setshowEdit] = useState(false)
  const [editData, seteditData] = useState({})
  useEffect(() => {
    seteditData(
      containers.find(({ container_id }) => container_id === selectedId) || {}
    )
  }, [selectedId])

  // const [tab, settab] = useState('report')

  return (
    <Container className="d-flex flex-column pt-3 h-100">
      <Row style={{ paddingLeft: '1.5rem', paddingRight: '2.25rem' }}>
        <Col xs={2} className="d-flex ps-0 my-auto">
          <h4 className="text-aure-dark fw-bold">專案列表</h4>
        </Col>
        <Col xs={1} />
        <Col xs={2} className="ms-auto">
          <SelectBar
            setting={{
              method: (e) => setsort(JSON.parse(e.target.value)),
              name: 'sort',
              value: JSON.stringify(sort),
              placeholder: '',
              content: [
                {
                  name: '建立日期新至舊',
                  value: JSON.stringify({
                    field: 'created_on',
                    order: 'desc',
                  }),
                },
                {
                  name: '建立日期舊至新',
                  value: JSON.stringify({
                    field: 'created_on',
                    order: 'aesc',
                  }),
                },
                {
                  name: '編輯日期近至遠',
                  value: JSON.stringify({
                    field: 'updated_on',
                    order: 'desc',
                  }),
                },
                {
                  name: '編輯日期遠至近',
                  value: JSON.stringify({
                    field: 'updated_on',
                    order: 'aesc',
                  }),
                },
              ],
            }}
          />
        </Col>
        <Col xs={6} className="d-flex pe-0">
          <InputGroup>
            <Form.Control
              placeholder="輸入關鍵字以搜尋專案..."
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
            className="ms-4 w-40"
            variant="outline-aure"
            onClick={() => {
              // setselectedId('')
              setshow(true)
            }}
          >
            建立新專案&ensp;
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
        </Col>
      </Row>
      <Row
        className="flex-grow-1 pt-3 pb-5 px-4 h-100"
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {containers && containers.length ? (
          <ListGroup className="pe-0 h-100 w-100">
            {containers
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
              .sort((a, b) => {
                const times = sort.order === 'desc' ? 1 : -1
                if (sort.field === 'updated_on') {
                  return (
                    times *
                    (moment(b.updated_on || b.created_on).isAfter(
                      moment(a.updated_on || a.created_on)
                    )
                      ? 1
                      : -1)
                  )
                }
                return (
                  times *
                  (moment(b.created_on).isAfter(moment(a.created_on)) ? 1 : -1)
                )
              })
              .map(({ name, container_id, created_on, updated_on }) => (
                <ListGroupItem
                  action
                  onClick={() => setContainerId(container_id)}
                  className="d-flex row"
                  key={container_id}
                >
                  <Col
                    xs={6}
                    className="my-auto text-start oneLineEllipsis fs-7"
                    title={name}
                  >
                    {name}
                  </Col>
                  <Col xs={3} className="my-auto text-start ps-2">
                    <div className="fs-7 fw-regular text-chelonia">
                      建立時間｜{moment(created_on).format('yyyy-MM-DD')}
                    </div>
                    <div className="fs-7 fw-regular text-chelonia">
                      最後更新時間｜{moment(updated_on).format('yyyy-MM-DD')}
                    </div>
                  </Col>
                  <Col xs={3} className="d-flex my-auto">
                    <Button
                      className="ms-auto"
                      style={{ boxShadow: 'none' }}
                      variant="edit"
                      onClick={(e) => {
                        setselectedId(container_id)
                        setshowEdit(true)
                        e.stopPropagation()
                      }}
                      title="重 新 命 名"
                      size
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button
                      style={{ boxShadow: 'none' }}
                      variant="red"
                      onClick={(e) => {
                        setselectedId(container_id)
                        setdeleteShow(true)
                        e.stopPropagation()
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
          <div className="d-flex ps-3">
            <h6 className="m-auto text-secondary">目前尚無資料</h6>
          </div>
        )}
      </Row>
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
      <DeleteModal
        setting={{
          show: deleteShow,
          name: containers.find(
            ({ container_id }) => container_id === selectedId
          )?.name,
          handleClose: handleDeleteClose,
        }}
      />
      {selectedId && showEdit && (
        <Modal
          style={{ zIndex: '1502' }}
          show={showEdit}
          handleClose={() => setshowEdit(false)}
        >
          <Modal.Header className="h5 text-chelonia">編輯專案</Modal.Header>
          <Modal.Body className="p-4">
            <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
              專案名稱
            </Form.Label>

            <Form.Control
              type="text"
              value={editData.name}
              onChange={(e) =>
                seteditData({
                  ...editData,
                  name: e.target.value,
                })
              }
              placeholder="輸入名稱"
            />
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <Button
              className="ms-auto me-2"
              style={{ boxShadow: 'none' }}
              variant="secondary"
              onClick={() => setshowEdit(false)}
            >
              取 消
            </Button>
            <Button
              className="me-auto"
              style={{ boxShadow: 'none' }}
              variant="aure"
              onClick={() => {
                setshowEdit(false)
                handleEditContainer(selectedId, editData.name, {})
                // handleModify(editData.type, selectedId, {
                //   name: editData.name,
                // })
              }}
            >
              確 認
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  )
}

DeleteModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

ProjectModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Containers
