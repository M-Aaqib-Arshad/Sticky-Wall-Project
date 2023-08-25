import React from 'react'

const list = ({Color}) => {
  return (
    <>
     <div style={{
        background:Color,
        width:"15px",
        height:"15px",
        padding: "0px 15px 0px 0px",
        borderRadius:"4px",
        marginRight:"10px"
            }}>
      </div>
    </>
  )
}

export default list