import React from 'react'
import Classes from '/styles/cta.module.css'

const CTA = (props) => {
  return (
    <div className={Classes['cta-btn']}>
        <button onClick={()=>props.onClick && props.onClick()}>{props.title}</button>
    </div>
  )
}

export default CTA