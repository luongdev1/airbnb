import {useState} from "react"

const FormInput = (props) => {
  const {messageErr, require, ...input} = props
  const [focused, setFocused] = useState(false)

  const handleFocused = (e) => {
    setFocused(true)
  }

  return (
    <div className="w-full">
      <input
        type="text"
        require={require.toString()}
        {...input}
        onBlur={handleFocused}
        focused={focused.toString()}
        className="formInput"
      />
      <span className={`text-red-500 hidden`}>{messageErr}</span>
    </div>
  )
}

export default FormInput
