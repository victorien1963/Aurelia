/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleExclamation,
  faCirclePlus,
  // faCopy,
  // faEye,
  faPenToSquare,
  faPlus,
  faReply,
  faSearch,
  faTimes,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import {
  Row,
  Col,
  Button,
  ListGroup,
  // ListGroupItem,
  Form,
  Modal,
  InputGroup,
  Container,
  Tabs,
  Tab,
  Carousel,
} from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Context } from './ContextProvider'
import IFrameContainer from './IFrameContainer'

function Codes({ setting }) {
  const { codes = [], setcodes = () => {} } = setting
  const handleAddCode = () => {
    setcodes([
      ...codes,
      {
        id: codes.length,
        title: `components${codes.length}.jsx`,
        code: '',
      },
    ])
  }

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
        defaultActiveKey={1}
        className="d-flex flex-nowrap mb-1 overflow-auto"
      >
        {codes.map(({ id, title, code }) => (
          <Tab
            eventKey={id}
            title={
              <Row>
                <Col xs={10}>
                  <Form.Control
                    size="sm"
                    className="border-0 h-50 fs-6"
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
              onChange={(e) => handleChangeCode(e, id)}
            />
          </Tab>
        ))}
        <Tab
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
        />
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
        幻燈片模式
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
  const [sortedTags, setsortedTags] = useState(tags)
  useEffect(() => {
    setsortedTags([
      ...tags.filter(
        ({ tag_id }) => !sortedTags.some((st) => st.tag_id === tag_id)
      ),
      ...sortedTags,
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
      placeholder: '輸入V0提供的代碼',
      type: 'code',
      default: [],
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

  const onDragEnd = (result) => {
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
    height: '270px',
  })

  const [showTag, setshowTag] = useState(false)
  const [showSlide, setshowSlide] = useState(false)

  return (
    <Container className="d-flex flex-column pt-3 h-100">
      <Row style={{ paddingLeft: '1.5rem', paddingRight: '.75rem' }}>
        <Col xs={2} className="d-flex ps-0">
          <h4 className="my-auto text-aure-dark fw-bold">V0管理</h4>
        </Col>
        <Col xs={1} />
        <Col xs={2} className="d-flex justifu-content-end" />
        <Col xs={7} className="d-flex pe-0">
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
            variant="outline-aure"
            onClick={() => {
              // setselectedId('')
              setshow(true)
            }}
          >
            新增V0預覽&ensp;
            <FontAwesomeIcon icon={faCirclePlus} />
          </Button>
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
            幻燈片模式
          </Button>
        </Col>
      </Row>
      <Row className="flex-grow-1 pt-3 pb-5 h-100">
        <Col
          xs={4}
          className="border rounded"
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
                    className="w-100 d-flex flex-nowrap"
                  >
                    <ListGroup className="pe-0 h-100 w-100">
                      {sortedTags
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
                        .map(({ name, tag_id, ...t }, i) => (
                          <Draggable
                            key={`${tag_id}`}
                            draggableId={`${tag_id}`}
                            index={i}
                          >
                            {(dragProvided, dragSnapshot) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                // style={getItemStyle(
                                //   dragSnapshot.isDragging,
                                //   dragProvided.draggableProps.style
                                // )}
                                className={`text-wom fs-7 p-2 d-flex flex-column flex-grow-1 mx-1 preview ${
                                  tag_id === selectedId ? 'active' : ''
                                }`}
                                style={{
                                  background: 'white',
                                  border: '1px solid #ced4da',
                                  borderRadius: '0.375rem',
                                  minHeight: '250px',
                                  maxHeight: '250px',
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
                                onClick={() => setselectedId(tag_id)}
                                aria-hidden
                              >
                                <Row className="d-flex row h-25" key={tag_id}>
                                  <Col
                                    xs={4}
                                    className="my-auto text-start oneLineEllipsis fs-7"
                                    title={name}
                                  >
                                    {name}
                                  </Col>
                                  <Col
                                    xs={5}
                                    className="my-auto text-start ps-2"
                                  >
                                    {/* <div className="fs-7 fw-regular text-chelonia">
                                    建立者｜
                                  </div> */}
                                    <div className="fs-7 fw-regular text-chelonia text-nowrap">
                                      建立時間｜
                                      {moment(t.created_on).format(
                                        'yyyy-MM-DD'
                                      )}
                                    </div>
                                  </Col>
                                  <Col xs={3} className="d-flex my-auto">
                                    {/* <Button
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
                                    </Button> */}
                                    <Button
                                      className="ms-auto"
                                      style={{ boxShadow: 'none' }}
                                      variant="edit"
                                      onClick={() => {
                                        setselectedId(tag_id)
                                        setshowEdit(true)
                                      }}
                                      title="重 新 命 名"
                                      size="sm"
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
                                      size="sm"
                                    >
                                      <FontAwesomeIcon icon={faTrashCan} />
                                    </Button>
                                  </Col>
                                </Row>
                                <Row className="h-75 w-100">
                                  <IFrameContainer
                                    setting={{
                                      id: t.setting?.id,
                                    }}
                                  />
                                </Row>
                              </div>
                            )}
                          </Draggable>
                        ))}
                    </ListGroup>
                  </div>
                )}
              </Droppable>
            ) : (
              <div className="d-flex ps-3 h-97">
                <h5 className="m-auto text-secondary">目前尚無資料</h5>
              </div>
            )}
          </DragDropContext>
        </Col>
        <Col
          className="d-flex flex-column h-97 border rounded ms-2"
          style={{ marginTop: '8px' }}
        >
          {selectedId ? (
            // <Codes
            //   setting={{
            //     codes:
            //       sortedTags.find((t) => t.tag_id === selectedId).setting
            //         .codes || [],
            //     setcodes: (codes) => {
            //       setsortedTags(
            //         sortedTags.map((st) =>
            //           st.tag_id === selectedId
            //             ? {
            //                 ...st,
            //                 setting: {
            //                   ...st.setting,
            //                   codes,
            //                 },
            //               }
            //             : st
            //         )
            //       )
            //     },
            //   }}
            // />
            <IFrameContainer
              setting={{
                id: sortedTags.find((t) => t.tag_id === selectedId).setting.id,
              }}
            />
          ) : (
            <h5 className="m-auto text-secondary">尚未選擇頁面</h5>
          )}
        </Col>
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
      {showSlide && (
        <SlideModal
          setting={{
            show: showSlide,
            handleClose: () => setshowSlide(false),
            previews: sortedTags,
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

SlideModal.propTypes = {
  setting: PropTypes.shape().isRequired,
}

Codes.propTypes = {
  setting: PropTypes.shape().isRequired,
}

export default Tags
