/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faBell,
  faCartShopping,
  faChartLine,
  faChartPie,
  faCircleExclamation,
  faCircleInfo,
  faCircleMinus,
  faCirclePlus,
  faClapperboard,
  faCloudArrowUp,
  faCompass,
  faEnvelope,
  faFeatherPointed,
  faFilePen,
  faFilm,
  faFolder,
  faGear,
  faHouse,
  faImage,
  faMagnifyingGlass,
  faReply,
  faRightToBracket,
  faSackDollar,
  faShieldHalved,
  faStar,
  faTimes,
  faTrashCan,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import {
  Row,
  Col,
  Button,
  ListGroup,
  Form,
  Modal,
  InputGroup,
  Container,
  Tabs,
  Tab,
  Carousel,
  Dropdown,
} from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Context, AuthContext } from './ContextProvider'
import IFrameContainer from './IFrameContainer'
import ImgWithFunc from './ImgWithFuncs'

const icons = {
  faFilePen,
  faCartShopping,
  faSackDollar,
  faFolder,
  faBell,
  faUser,
  faCircleExclamation,
  faHouse,
  faCompass,
  faCloudArrowUp,
  faChartPie,
  faImage,
  faEnvelope,
  faUsers,
  faCircleInfo,
  faGear,
  faTrashCan,
  faFeatherPointed,
  faChartLine,
  faFilm,
  faMagnifyingGlass,
  faShieldHalved,
  faStar,
  faRightToBracket,
}

function Codes({ setting }) {
  const { codes = [], setcodes = () => {} } = setting
  // const handleAddCode = () => {
  //   setcodes([
  //     ...codes,
  //     {
  //       id: codes.length,
  //       title: `components${codes.length}.jsx`,
  //       code: '',
  //     },
  //   ])
  // }

  const handleRemoveCode = (id) => {
    setcodes(codes.filter((stsc) => stsc.id !== id))
  }

  const handleChangeCode = (e, id) => {
    setcodes(
      codes.map((stsc) =>
        stsc.id === id
          ? {
              ...stsc,
              [e.target.name]: e.target.value,
            }
          : stsc
      )
    )
  }

  return (
    <div className="h-100 w-100">
      <Tabs
        defaultActiveKey={0}
        className="d-flex flex-nowrap mb-1 overflow-auto"
      >
        {codes.map(({ id, title, code }, i) => (
          <Tab
            eventKey={i}
            title={
              <Row>
                <Col xs={10}>
                  <Form.Control
                    size="sm"
                    className="h-50 fs-6"
                    name="title"
                    value={title}
                    onChange={(e) => handleChangeCode(e, id)}
                  />
                </Col>
                <Col className="d-flex" xs={2}>
                  <FontAwesomeIcon
                    className="m-auto"
                    icon={faTimes}
                    title="新增"
                    onClick={() => handleRemoveCode(id)}
                  />
                </Col>
              </Row>
            }
            className="h-100 d-flex"
          >
            <Form.Control
              className="h-100"
              as="textarea"
              name="code"
              rows={20}
              value={code}
              placeholder="請貼上v0提供的component.tsx程式碼，可使用v0介面上的複製功能"
              onChange={(e) => handleChangeCode(e, id)}
            />
          </Tab>
        ))}
        {/* <Tab
          title={
            <div className="d-flex h-100 w-100">
              <FontAwesomeIcon
                className="m-auto pt-2"
                icon={faPlus}
                title="新增"
                onClick={handleAddCode}
              />
            </div>
          }
        /> */}
      </Tabs>
    </div>
  )
}

function SlideModal({ setting }) {
  const { show, handleClose, previews } = setting
  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
      size="xl"
    >
      <Modal.Header closeButton className="h5">
        幻燈片模式&ensp;
        <FontAwesomeIcon icon={faClapperboard} />
      </Modal.Header>
      <Modal.Body
        className="p-4"
        style={{
          height: '75vh',
        }}
      >
        <Carousel indicators={false} className="h-100">
          {previews.map &&
            previews.map((p, i) => (
              <Carousel.Item
                key={i}
                className="h-100"
                style={{
                  color: '#000',
                }}
                // interval={interval}
                // className="position-relative h-100"
              >
                <Carousel.Caption className="h-100">
                  <IFrameContainer
                    setting={{
                      id: p.setting?.id,
                    }}
                  />
                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  )
}

function ShowModal({ setting }) {
  const { show, tag, handleClose } = setting
  return (
    <Modal
      style={{ zIndex: '1501' }}
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
      size="xl"
    >
      <Modal.Header closeButton className="h5">
        Preview
      </Modal.Header>
      <Modal.Body
        className="p-4"
        style={{
          height: '75vh',
        }}
      >
        <IFrameContainer
          setting={{
            id: tag.setting?.id,
          }}
        />
      </Modal.Body>
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
      size="lg"
      show={show}
      onHide={() => handleClose()}
      className="py-2 px-4"
    >
      <Modal.Header closeButton className="h5">
        {defaultValue.setting ? `編輯預覽` : `新建預覽`}
      </Modal.Header>
      <Modal.Body
        className="p-4 overflow-auto"
        style={{
          height: '65vh',
        }}
      >
        {form.map((f, i) => {
          switch (f.type) {
            case 'code':
              return (
                <React.Fragment key={i}>
                  <Form.Label className="mb-1 mt-3 fw-bold text-chelonia">
                    {f.label}
                  </Form.Label>

                  <Codes
                    setting={{
                      codes: data.codes,
                      setcodes: (codes) => {
                        onDataChange({
                          target: {
                            name: 'codes',
                            value: codes,
                          },
                        })
                      },
                    }}
                  />
                </React.Fragment>
              )
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
          variant="aure"
          onClick={() => handleClose(true)}
          disabled={Object.keys(data).some((key) => !data[key])}
        >
          確 認
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

function Tags() {
  const { auth, setAuth } = useContext(AuthContext)
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
    container,
    handleEditContainer,
    containerId,
    setContainerId,
    handleAddTag,
    handleEditTag,
    handleDeleteTag,
    handleAddSubTag,
    // handleEditSubTag,
    handleDeleteSubTag,
  } = useContext(Context)
  // const { setToast } = useContext(ToastContext)
  const [sortedTags, setsortedTags] = useState([])
  useEffect(() => {
    setsortedTags([
      ...sortedTags
        .filter((st) => tags.find(({ tag_id }) => tag_id === st.tag_id))
        .map((st) => tags.find(({ tag_id }) => tag_id === st.tag_id)),
      ...tags.filter(
        ({ tag_id }) => !sortedTags.some((st) => st.tag_id === tag_id)
      ),
    ])
  }, [tags])

  const form = [
    {
      name: 'name',
      label: '名稱',
      placeholder: '輸入名稱',
      type: 'text',
    },
    {
      name: 'id',
      label: 'V0 ID',
      placeholder: '輸入V0提供的ID',
      type: 'tel',
    },
    {
      name: 'codes',
      label: 'V0 code',
      type: 'code',
      default: [
        {
          title: 'component.tsx',
          id: 0,
          code: '',
        },
      ],
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
            [cur.name]: cur.default || '',
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

  const onDragEnd = (result) => {
    console.log(result)
    if (!result.destination) {
      return
    }
    const r = Array.from(sortedTags)
    const [removed] = r.splice(result.source.index, 1)
    r.splice(result.destination.index, 0, removed)
    setsortedTags(r)
  }

  const grid = 8
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    minWidth: isDragging ? '' : '32%',

    // change background colour if dragging
    // background: isDragging ? 'white' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
  })

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'transparent' : 'transparent',
    padding: grid,
    width: '100%',
    // height: '270px',
  })

  const [showTag, setshowTag] = useState(false)
  const [showSlide, setshowSlide] = useState(false)
  useEffect(() => {
    setAuth({
      ...auth,
      nav: !showSlide,
    })
  }, [showSlide])

  const iframeId = useMemo(() => {
    if (!selectedId) return ''
    if (selectedId.includes('_')) {
      const [tag_id, index] = selectedId.split('_')
      const target = sortedTags.find((t) => `${t.tag_id}` === tag_id)
      return target.setting.subtags[index].setting.id
    }
    return sortedTags.find((t) => `${t.tag_id}` === selectedId).setting.id
  }, [selectedId])

  const check404 = () => {
    if (!selectedId) return false
    if (selectedId.includes('_')) {
      const [tag_id, index] = selectedId.split('_')
      const target = sortedTags.find((t) => `${t.tag_id}` === tag_id)
      return (
        target.setting.subtags[index].setting.id &&
        target.setting.subtags[index].setting.codes &&
        target.setting.subtags[index].setting.codes[0] &&
        target.setting.subtags[index].setting.codes[0].code
      )
    }
    return (
      sortedTags.find((t) => `${t.tag_id}` === selectedId).setting.id &&
      sortedTags.find((t) => `${t.tag_id}` === selectedId).setting.codes &&
      sortedTags.find((t) => `${t.tag_id}` === selectedId).setting.codes[0] &&
      sortedTags.find((t) => `${t.tag_id}` === selectedId).setting.codes[0].code
    )
  }

  const handleBlur = (tag_id) => {
    const target = sortedTags.find((t) => t.tag_id === tag_id)
    handleEditTag(tag_id, target.name, {
      ...target.setting,
    })
  }

  return (
    <Container className="d-flex flex-column pt-3 h-100">
      <Row style={{ paddingLeft: '.5rem', paddingRight: '.75rem' }}>
        {showSlide ? (
          <>
            <Col xs={2} className="d-flex ps-0 h-100">
              <ImgWithFunc
                setting={{
                  container_id: containerId,
                  disabled: showSlide,
                }}
              />
              <h4 className="my-auto text-aure-dark fw-bold text-nowrap ps-3">
                {container.name}
              </h4>
            </Col>
            <Col xs={4} className="d-flex pe-0 ms-auto">
              <Button
                className="ms-auto"
                variant="outline-aure"
                onClick={() => {
                  setshowSlide(false)
                }}
              >
                登出&ensp;
                <FontAwesomeIcon icon={faRightToBracket} />
              </Button>
            </Col>
          </>
        ) : (
          <>
            <Col xs={2} className="d-flex ps-0">
              <h4 className="my-auto text-aure-dark fw-bold">
                架構管理 / 後台
              </h4>
            </Col>
            <Col xs={2} className="d-flex">
              <h5 className="my-auto text-aure-dark fw-bold text-nowrap">
                系統LOGO與名稱：
              </h5>
            </Col>
            <Col className="d-flex ps-0 flex-grow-1">
              <ImgWithFunc
                setting={{
                  container_id: containerId,
                }}
              />
              {/* </Col>
            <Col className="d-flex ps-0 flex-grow-1"> */}
              <Form.Control
                className="ms-3"
                defaultValue={container.name}
                placeholder="請輸入系統名稱..."
                onBlur={(e) => {
                  handleEditContainer(
                    containerId,
                    e.target.value,
                    container.setting
                  )
                }}
              />
            </Col>
            <Col xs={2} />
            <Col xs={3} className="d-flex pe-0 ms-auto">
              <Button
                className="ms-4 w-50"
                variant="outline-aure"
                onClick={() => {
                  setContainerId('')
                }}
              >
                回專案列表&ensp;
                <FontAwesomeIcon icon={faReply} />
              </Button>
              <Button
                className="ms-4 w-50"
                variant="outline-aure"
                onClick={() => {
                  setshowSlide(true)
                }}
              >
                幻燈片模式&ensp;
                <FontAwesomeIcon icon={faClapperboard} />
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Row className="flex-grow-1 pt-3 pb-5 h-100">
        <Col
          xs={2}
          className="border-end pe-5"
          style={{ overflowY: 'auto', overflowX: 'hidden', marginTop: '8px' }}
        >
          {sortedTags && sortedTags.length ? (
            <ListGroup className="pe-0 h-100 w-100">
              {sortedTags.map(({ name, tag_id, ...t }) => (
                <>
                  <Row
                    className={`d-flex index row py-2 rounded flex-nowrap ${
                      selectedId === `${tag_id}` ? 'active' : ''
                    }`}
                    key={tag_id}
                    onClick={() => setselectedId(`${tag_id}`)}
                  >
                    <Col
                      className="my-auto text-center oneLineEllipsis fs-7 h-100"
                      title={name}
                    >
                      <Dropdown className="my-auto w-100 h-100">
                        <Dropdown.Toggle
                          id="dropdown-button-drop-end"
                          className="px-1 fs-8 m-auto border-0 h-100"
                          size="sm"
                        >
                          <div
                            className="d-flex h-100"
                            style={{
                              width: '18px',
                            }}
                          >
                            <FontAwesomeIcon
                              icon={icons[t.setting.icon || 'faHouse']}
                              className="text-dark m-auto fs-7"
                            />
                          </div>
                          {/* {datas[name]} */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          className="px-3 overflow-scroll w-100"
                          style={{
                            maxHeight: '45vh',
                          }}
                        >
                          {Object.keys(icons).map((key) => (
                            <Dropdown.Item
                              key={key}
                              onClick={() =>
                                handleEditTag(tag_id, name, {
                                  ...t.setting,
                                  icon: key,
                                })
                              }
                            >
                              <FontAwesomeIcon
                                style={{
                                  width: '18px',
                                  height: '18px',
                                }}
                                icon={icons[key]}
                                className="text-dark fs-7"
                              />
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                    <Col className="d-flex" xs={9}>
                      <h5
                        className="my-auto text-start text-nowrap oneLineEllipsis fs-7"
                        title={name}
                      >
                        {name}
                      </h5>
                    </Col>
                  </Row>
                  {t.setting.subtags &&
                    t.setting.subtags.map((st, i) => (
                      <Row
                        className={`index d-flex row py-2 ps-4 rounded ${
                          selectedId === `${tag_id}_${i}` ? 'active' : ''
                        }`}
                        key={`${tag_id}_${i}`}
                        onClick={() => setselectedId(`${tag_id}_${i}`)}
                      >
                        <h5
                          className="my-auto text-start oneLineEllipsis fs-7"
                          title={st.name}
                        >
                          {st.name}
                        </h5>
                      </Row>
                    ))}
                </>
              ))}
            </ListGroup>
          ) : (
            <div className="d-flex ps-3 h-97">
              <h6 className="m-auto py-5 text-secondary">目前尚無資料</h6>
            </div>
          )}
        </Col>
        {!showSlide ? (
          <Col
            className="ms-2"
            style={{ overflowY: 'auto', overflowX: 'hidden', marginTop: '8px' }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              {sortedTags && sortedTags.length ? (
                <Droppable key={1} droppableId="1" direction="vertical">
                  {(dropProvided, dropSnapshot) => (
                    <div
                      {...dropProvided.droppableProps}
                      ref={dropProvided.innerRef}
                      style={getListStyle(dropSnapshot.isDraggingOver)}
                      className="w-100 d-flex flex-nowrap pb-0"
                    >
                      <ListGroup className="pe-0 w-100">
                        {sortedTags.map(({ name, tag_id, ...t }, i) => (
                          <Draggable
                            key={`${tag_id}`}
                            draggableId={`${tag_id}`}
                            index={i}
                          >
                            {(dragProvided, dragSnapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                // {...dragProvided.dragHandleProps}
                                // style={getItemStyle(
                                //   dragSnapshot.isDragging,
                                //   dragProvided.draggableProps.style
                                // )}
                                className={`text-wom fs-7 p-2 pt-3 d-flex flex-column flex-grow-1 mx-1 preview border-0 list ${
                                  selectedId.split('_')[0] === `${tag_id}`
                                    ? 'active'
                                    : 'active'
                                }`}
                                style={{
                                  background: 'white',
                                  border: '1px solid #ced4da',
                                  borderRadius: '0.375rem',
                                  // minHeight: '100px',
                                  // maxHeight: '100px',
                                  minWidth: '100%',
                                  maxWidth: '100%',
                                  width: '100%',
                                  cursor: 'pointer',
                                  ...getItemStyle(
                                    dragSnapshot.isDragging,
                                    dragProvided.draggableProps.style
                                  ),
                                  // className="position-absolute text-wom fs-7"
                                  // top: `${5}%`,
                                  // left: `${3 + i * 32}%`,
                                  // height: '85%',
                                  // width: '30%',
                                }}
                                onClick={() => setselectedId(`${tag_id}`)}
                                aria-hidden
                              >
                                <Row className="d-flex row" key={tag_id}>
                                  <Col
                                    xs={1}
                                    className="my-auto text-center oneLineEllipsis fs-7 h-100"
                                    title={name}
                                  >
                                    <Dropdown className="my-auto w-100 h-100">
                                      <Dropdown.Toggle
                                        id="dropdown-button-drop-end"
                                        className="px-1 fs-8 m-auto border-0 h-100"
                                        size="sm"
                                      >
                                        <div
                                          className="d-flex h-100"
                                          style={{
                                            width: '30px',
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={
                                              icons[t.setting.icon || 'faHouse']
                                            }
                                            className="text-dark m-auto fs-7"
                                          />
                                        </div>
                                        {/* {datas[name]} */}
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu
                                        className="px-3 overflow-scroll w-100"
                                        style={{
                                          maxHeight: '45vh',
                                        }}
                                      >
                                        {Object.keys(icons).map((key) => (
                                          <Dropdown.Item
                                            key={key}
                                            onClick={() =>
                                              handleEditTag(tag_id, name, {
                                                ...t.setting,
                                                icon: key,
                                              })
                                            }
                                          >
                                            <FontAwesomeIcon
                                              style={{
                                                width: '30px',
                                                height: '30px',
                                              }}
                                              icon={icons[key]}
                                              className="text-dark fs-7"
                                            />
                                          </Dropdown.Item>
                                        ))}
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </Col>
                                  <Col
                                    xs={2}
                                    className="my-auto text-start ps-0 oneLineEllipsis fs-7"
                                    title={name}
                                  >
                                    <Form.Control
                                      defaultValue={name}
                                      onChange={(e) =>
                                        setsortedTags(
                                          sortedTags.map((editing) =>
                                            editing.tag_id === tag_id
                                              ? {
                                                  ...editing,
                                                  name: e.target.value,
                                                }
                                              : editing
                                          )
                                        )
                                      }
                                      onBlur={() => {
                                        handleBlur(tag_id)
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    xs={2}
                                    className="my-auto text-start oneLineEllipsis fs-7"
                                    title={name}
                                  >
                                    <Form.Control
                                      defaultValue={t.setting.id || ''}
                                      placeholder="請輸入ID..."
                                      onChange={(e) =>
                                        setsortedTags(
                                          sortedTags.map((editing) =>
                                            editing.tag_id === tag_id
                                              ? {
                                                  ...editing,
                                                  setting: {
                                                    ...editing.setting,
                                                    id: e.target.value,
                                                  },
                                                }
                                              : editing
                                          )
                                        )
                                      }
                                      onBlur={() => {
                                        handleBlur(tag_id)
                                      }}
                                    />
                                  </Col>
                                  <Col
                                    xs={4}
                                    className="my-auto text-start oneLineEllipsis fs-7 flex-grow-1"
                                    title={name}
                                  >
                                    <Form.Control
                                      defaultValue={
                                        t.setting.codes && t.setting.codes[0]
                                          ? t.setting.codes[0].code
                                          : ''
                                      }
                                      as="textarea"
                                      placeholder="請輸入V0所生成的Code..."
                                      rows={1}
                                      onChange={(e) =>
                                        setsortedTags(
                                          sortedTags.map((editing) =>
                                            editing.tag_id === tag_id
                                              ? {
                                                  ...editing,
                                                  setting: {
                                                    ...editing.setting,
                                                    codes: [
                                                      {
                                                        code: e.target.value,
                                                      },
                                                      editing.setting
                                                        .codes[1] || {},
                                                    ],
                                                  },
                                                }
                                              : editing
                                          )
                                        )
                                      }
                                      onBlur={() => {
                                        handleBlur(tag_id)
                                      }}
                                    />
                                  </Col>
                                  {/* <Col
                                    xs={2}
                                    className="my-auto text-start oneLineEllipsis fs-7 flex-grow-1"
                                    title={name}
                                  >
                                    <Form.Control
                                      defaultValue={
                                        t.setting.codes && t.setting.codes[1]
                                          ? t.setting.codes[1].code
                                          : ''
                                      }
                                      as="textarea"
                                      placeholder="請輸入V0所生成的global.css..."
                                      rows={1}
                                      onChange={(e) =>
                                        setsortedTags(
                                          sortedTags.map((editing) =>
                                            editing.tag_id === tag_id
                                              ? {
                                                  ...editing,
                                                  setting: {
                                                    ...editing.setting,
                                                    codes: [
                                                      editing.setting
                                                        .codes[0] || {},
                                                      {
                                                        code: e.target.value,
                                                      },
                                                    ],
                                                  },
                                                }
                                              : editing
                                          )
                                        )
                                      }
                                      onBlur={() => {
                                        handleBlur(tag_id)
                                      }}
                                    />
                                  </Col> */}
                                  <Col
                                    xs={1}
                                    className="d-flex my-auto flex-grow-1"
                                  >
                                    <Button
                                      {...dragProvided.dragHandleProps}
                                      style={{ boxShadow: 'none' }}
                                      variant="edit"
                                      // onClick={() => handleDeleteClip(id)}
                                      title="調 整 順 序"
                                    >
                                      <FontAwesomeIcon icon={faBars} />
                                    </Button>
                                    <Button
                                      className="ms-auto"
                                      style={{ boxShadow: 'none' }}
                                      variant="edit"
                                      onClick={() => {
                                        handleAddSubTag(tag_id, '新分頁', {})
                                      }}
                                      title="新 增"
                                      size="sm"
                                    >
                                      <FontAwesomeIcon
                                        className="text-blue"
                                        icon={faCirclePlus}
                                      />
                                    </Button>
                                    <Button
                                      className="ms-auto"
                                      style={{
                                        boxShadow: 'none',
                                      }}
                                      variant="edit"
                                      onClick={() => {
                                        handleDeleteTag(tag_id)
                                      }}
                                      title="刪 除"
                                      size="sm"
                                    >
                                      <FontAwesomeIcon
                                        className="text-red"
                                        icon={faCircleMinus}
                                      />
                                    </Button>
                                  </Col>
                                </Row>
                                {t.setting.subtags && (
                                  <Row>
                                    <DragDropContext onDragEnd={onDragEnd}>
                                      {t.setting.subtags &&
                                      t.setting.subtags ? (
                                        <Droppable
                                          key={tag_id}
                                          droppableId={`${tag_id}_sub`}
                                          direction="vertical"
                                        >
                                          {(
                                            subdropProvided,
                                            subdropSnapshot
                                          ) => (
                                            <div
                                              {...subdropProvided.droppableProps}
                                              ref={subdropProvided.innerRef}
                                              style={getListStyle(
                                                subdropSnapshot.isDraggingOver
                                              )}
                                              className="w-100 d-flex flex-nowrap pb-0"
                                            >
                                              <ListGroup className="pe-0 w-100 border-0">
                                                {t.setting.subtags.map(
                                                  (st, j) => (
                                                    <Draggable
                                                      key={`${tag_id}_${
                                                        st.id || j
                                                      }`}
                                                      draggableId={`${j}`}
                                                      index={j}
                                                    >
                                                      {(
                                                        subdragProvided,
                                                        subdragSnapshot
                                                      ) => (
                                                        <div
                                                          ref={
                                                            subdragProvided.innerRef
                                                          }
                                                          {...subdragProvided.draggableProps}
                                                          // {...subdragProvided.dragHandleProps}
                                                          // style={getItemStyle(
                                                          //   dragSnapshot.isDragging,
                                                          //   dragProvided.draggableProps.style
                                                          // )}
                                                          className={`text-wom fs-7 px-2 py-0 d-flex flex-column flex-grow-1 mx-1 border-0 ${
                                                            tag_id ===
                                                            selectedId
                                                              ? 'active'
                                                              : ''
                                                          }`}
                                                          style={{
                                                            // background: 'white',
                                                            border:
                                                              '1px solid #ced4da',
                                                            borderRadius:
                                                              '0.375rem',
                                                            // minHeight: '100px',
                                                            // maxHeight: '100px',
                                                            minWidth: '100%',
                                                            maxWidth: '100%',
                                                            width: '100%',
                                                            cursor: 'pointer',
                                                            ...getItemStyle(
                                                              subdragSnapshot.isDragging,
                                                              subdragProvided
                                                                .draggableProps
                                                                .style
                                                            ),
                                                            // className="position-absolute text-wom fs-7"
                                                            // top: `${5}%`,
                                                            // left: `${3 + i * 32}%`,
                                                            // height: '85%',
                                                            // width: '30%',
                                                          }}
                                                          onClick={(e) => {
                                                            setselectedId(
                                                              `${tag_id}_${j}`
                                                            )
                                                            e.stopPropagation()
                                                          }}
                                                          aria-hidden
                                                        >
                                                          <Row className="d-flex row">
                                                            <Col
                                                              xs={1}
                                                              className="my-auto text-end oneLineEllipsis fs-7 h-100"
                                                              title={name}
                                                            />
                                                            <Col
                                                              xs={2}
                                                              className="my-auto text-start oneLineEllipsis fs-7"
                                                              title={st.name}
                                                            >
                                                              <Form.Control
                                                                defaultValue={
                                                                  st.name
                                                                }
                                                                onChange={(e) =>
                                                                  setsortedTags(
                                                                    sortedTags.map(
                                                                      (
                                                                        editingST
                                                                      ) =>
                                                                        editingST.tag_id ===
                                                                        tag_id
                                                                          ? {
                                                                              ...editingST,
                                                                              setting:
                                                                                {
                                                                                  ...editingST.setting,
                                                                                  subtags:
                                                                                    editingST.setting.subtags.map(
                                                                                      (
                                                                                        estst,
                                                                                        k
                                                                                      ) =>
                                                                                        j ===
                                                                                        k
                                                                                          ? {
                                                                                              ...estst,
                                                                                              name: e
                                                                                                .target
                                                                                                .value,
                                                                                            }
                                                                                          : estst
                                                                                    ),
                                                                                },
                                                                            }
                                                                          : editingST
                                                                    )
                                                                  )
                                                                }
                                                                onBlur={() => {
                                                                  handleBlur(
                                                                    tag_id
                                                                  )
                                                                }}
                                                              />
                                                            </Col>
                                                            <Col
                                                              xs={2}
                                                              className="my-auto text-start oneLineEllipsis fs-7"
                                                            >
                                                              <Form.Control
                                                                defaultValue={
                                                                  st.setting
                                                                    .id || ''
                                                                }
                                                                placeholder="請輸入ID..."
                                                                onChange={(e) =>
                                                                  setsortedTags(
                                                                    sortedTags.map(
                                                                      (
                                                                        editingST
                                                                      ) =>
                                                                        editingST.tag_id ===
                                                                        tag_id
                                                                          ? {
                                                                              ...editingST,
                                                                              setting:
                                                                                {
                                                                                  ...editingST.setting,
                                                                                  subtags:
                                                                                    editingST.setting.subtags.map(
                                                                                      (
                                                                                        estst,
                                                                                        k
                                                                                      ) =>
                                                                                        j ===
                                                                                        k
                                                                                          ? {
                                                                                              ...estst,
                                                                                              setting:
                                                                                                {
                                                                                                  ...estst.setting,
                                                                                                  id: e
                                                                                                    .target
                                                                                                    .value,
                                                                                                },
                                                                                            }
                                                                                          : estst
                                                                                    ),
                                                                                },
                                                                            }
                                                                          : editingST
                                                                    )
                                                                  )
                                                                }
                                                                onBlur={() => {
                                                                  handleBlur(
                                                                    tag_id
                                                                  )
                                                                }}
                                                              />
                                                            </Col>
                                                            <Col
                                                              xs={4}
                                                              className="my-auto text-start oneLineEllipsis fs-7 flex-grow-1"
                                                            >
                                                              <Form.Control
                                                                as="textarea"
                                                                rows={1}
                                                                defaultValue={
                                                                  st.setting
                                                                    .codes &&
                                                                  st.setting
                                                                    .codes[0]
                                                                    ? st.setting
                                                                        .codes[0]
                                                                        .code
                                                                    : ''
                                                                }
                                                                placeholder="請輸入V0所生成的Code..."
                                                                onChange={(e) =>
                                                                  setsortedTags(
                                                                    sortedTags.map(
                                                                      (
                                                                        editingST
                                                                      ) =>
                                                                        editingST.tag_id ===
                                                                        tag_id
                                                                          ? {
                                                                              ...editingST,
                                                                              setting:
                                                                                {
                                                                                  ...editingST.setting,
                                                                                  subtags:
                                                                                    editingST.setting.subtags.map(
                                                                                      (
                                                                                        estst,
                                                                                        k
                                                                                      ) =>
                                                                                        j ===
                                                                                        k
                                                                                          ? {
                                                                                              ...estst,
                                                                                              setting:
                                                                                                {
                                                                                                  ...estst.setting,
                                                                                                  codes:
                                                                                                    [
                                                                                                      {
                                                                                                        code: e
                                                                                                          .target
                                                                                                          .value,
                                                                                                      },
                                                                                                      estst
                                                                                                        .setting
                                                                                                        .codes[1] ||
                                                                                                        {},
                                                                                                    ],
                                                                                                },
                                                                                            }
                                                                                          : estst
                                                                                    ),
                                                                                },
                                                                            }
                                                                          : editingST
                                                                    )
                                                                  )
                                                                }
                                                                onBlur={() => {
                                                                  handleBlur(
                                                                    tag_id
                                                                  )
                                                                }}
                                                              />
                                                            </Col>
                                                            {/* <Col
                                                              xs={2}
                                                              className="my-auto text-start oneLineEllipsis fs-7 flex-grow-1"
                                                            >
                                                              <Form.Control
                                                                as="textarea"
                                                                rows={1}
                                                                defaultValue={
                                                                  st.setting
                                                                    .codes &&
                                                                  st.setting
                                                                    .codes[1]
                                                                    ? st.setting
                                                                        .codes[1]
                                                                        .code
                                                                    : ''
                                                                }
                                                                placeholder="請輸入V0所生成的global.css..."
                                                                onChange={(e) =>
                                                                  setsortedTags(
                                                                    sortedTags.map(
                                                                      (
                                                                        editingST
                                                                      ) =>
                                                                        editingST.tag_id ===
                                                                        tag_id
                                                                          ? {
                                                                              ...editingST,
                                                                              setting:
                                                                                {
                                                                                  ...editingST.setting,
                                                                                  subtags:
                                                                                    editingST.setting.subtags.map(
                                                                                      (
                                                                                        estst,
                                                                                        k
                                                                                      ) =>
                                                                                        j ===
                                                                                        k
                                                                                          ? {
                                                                                              ...estst,
                                                                                              setting:
                                                                                                {
                                                                                                  ...estst.setting,
                                                                                                  codes:
                                                                                                    [
                                                                                                      estst
                                                                                                        .setting
                                                                                                        .codes[0] ||
                                                                                                        {},
                                                                                                      {
                                                                                                        code: e
                                                                                                          .target
                                                                                                          .value,
                                                                                                      },
                                                                                                    ],
                                                                                                },
                                                                                            }
                                                                                          : estst
                                                                                    ),
                                                                                },
                                                                            }
                                                                          : editingST
                                                                    )
                                                                  )
                                                                }
                                                                onBlur={() => {
                                                                  handleBlur(
                                                                    tag_id
                                                                  )
                                                                }}
                                                              />
                                                            </Col> */}
                                                            <Col
                                                              xs={1}
                                                              className="d-flex my-auto flex-grow-1"
                                                            >
                                                              <Button
                                                                {...subdragProvided.dragHandleProps}
                                                                style={{
                                                                  boxShadow:
                                                                    'none',
                                                                }}
                                                                variant="edit"
                                                                // onClick={() => handleDeleteClip(id)}
                                                                title="調 整 順 序"
                                                              >
                                                                <FontAwesomeIcon
                                                                  icon={faBars}
                                                                />
                                                              </Button>
                                                              <Button
                                                                className="ms-auto"
                                                                style={{
                                                                  boxShadow:
                                                                    'none',
                                                                }}
                                                                variant="edit"
                                                                onClick={() => {
                                                                  handleDeleteSubTag(
                                                                    tag_id,
                                                                    j
                                                                  )
                                                                }}
                                                                title="刪 除"
                                                                size="sm"
                                                              >
                                                                <FontAwesomeIcon
                                                                  className="text-red"
                                                                  icon={
                                                                    faCircleMinus
                                                                  }
                                                                />
                                                              </Button>
                                                            </Col>
                                                          </Row>
                                                        </div>
                                                      )}
                                                    </Draggable>
                                                  )
                                                )}
                                              </ListGroup>
                                            </div>
                                          )}
                                        </Droppable>
                                      ) : (
                                        <Row className="d-flex row">
                                          <h6 className="m-auto py-5 text-secondary">
                                            目前尚無資料
                                          </h6>
                                        </Row>
                                      )}
                                    </DragDropContext>
                                  </Row>
                                )}
                                {/* <Row className="h-75 w-100 overflow-hidden">
                                    <IFrameContainer
                                      setting={{
                                        id: t.setting?.id,
                                      }}
                                    />
                                  </Row> */}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </ListGroup>
                    </div>
                  )}
                </Droppable>
              ) : (
                <Row className="d-flex row">
                  <h6 className="m-auto text-secondary py-3">
                    點擊下方＋以新增列
                  </h6>
                </Row>
              )}
            </DragDropContext>
            <Row className="px-4">
              <Button
                className="w-100"
                variant="outline-aure"
                onClick={() => {
                  // setselectedId('')
                  // setshow(true)
                  handleAddTag('自定義命名', {
                    id: '',
                    codes: [],
                  })
                }}
              >
                {/* 新增V0預覽&ensp; */}
                <FontAwesomeIcon icon={faCirclePlus} />
              </Button>
            </Row>
          </Col>
        ) : (
          <Col
            className="d-flex flex-column h-97 border rounded ms-2"
            style={{ marginTop: '8px' }}
          >
            {selectedId ? (
              check404() ? (
                <IFrameContainer
                  setting={{
                    id: iframeId,
                  }}
                />
              ) : (
                <h5 className="m-auto text-secondary">
                  未完成ID和Code的設定，請回到專案管理確認
                </h5>
              )
            ) : (
              <h5 className="m-auto text-secondary">尚未選擇頁面</h5>
            )}
          </Col>
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
      {/* {showSlide && (
        <SlideModal
          setting={{
            show: showSlide,
            handleClose: () => setshowSlide(false),
            previews: sortedTags,
          }}
        />
      )} */}
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

SlideModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

Codes.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Tags
