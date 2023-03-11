import React from 'react'
import './card.scss'

const CandidateCard = (props) => {
  console.log(props.info)
  const { img, title, otherText, party } = props?.info
  return (
    <div className='candidateCard'>
      <div className='cardImgWrapper'>
        <img src={img} alt='' />
      </div>
      <div className='cardTextWrapper'>
        <div className='cardTitle' style={{ color: party }}>
          {title}
        </div>
        <div className='percent'>{otherText}</div>
      </div>
    </div>
  )
}

export default CandidateCard
