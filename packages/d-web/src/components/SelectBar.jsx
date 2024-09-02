import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'

function SelectBar(props) {
  const { setting } = props
  const {
    id,
    name,
    method,
    content,
    placeholder,
    onFocus,
    value,
    isInvalid,
    hasDivider,
    disabled,
    py,
    className = '',
  } = setting
  return (
    <Form.Group className={`text-start my-auto ${className}`}>
      <Form.Select
        className={`${py || ''} w-100`}
        id={id}
        name={name}
        aria-label="Default select example"
        onChange={method}
        value={value}
        onFocus={onFocus}
        disabled={disabled}
        isInvalid={isInvalid}
      >
        {placeholder && (
          <option
            key=""
            value=""
            style={{
              borderBottom: '1px solid #ccc',
            }}
          >
            {placeholder}
          </option>
        )}
        {hasDivider && (
          <option
            className="w-100 lh-sm"
            style={{
              color: '#ccc',
              overflow: 'hidden',
              fontSize: 'xx-small',
            }}
          >
            ——————————————————————————————————————————————————————————————————————————————————————————————————————————————
          </option>
        )}
        {content.map((c, i) => (
          <option key={i} value={c.value}>
            {c.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

SelectBar.propTypes = {
  setting: PropTypes.shape(),
}

SelectBar.defaultProps = {
  setting: {
    title: '選擇廣告平台',
    method: () => {},
    content: ['Facebook', 'Google', 'Yahoo', 'Twitter'],
  },
}

export default SelectBar
