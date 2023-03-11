/* eslint-disable react/prop-types */
import React from 'react'
import './voteCountBox.scss'

export const VoteCountBoxPartyVotes = () => {
  return (
    <div className='VoteCountBoxPartyVotes'>
      <div className='VoteCountBoxCandidateName'>Bola Ahmed Tinubu</div>
      <div className='VoteCountBoxCandidateParty'>APC</div>
      <div className='VoteCountBoxCandidateVoteCount'>13,000,000</div>
    </div>
  )
}

const VoteCountBox = (props) => {
  return (
    <div className='voteCountBox'>
      <div className='voteCountBoxTop'>
        <div className='voteCountText'>VOTE COUNT {`  ${props.state}`}</div>
        <div className='fullListText'>SEE FULL LIST</div>
      </div>
      <div className='voteCountBoxBottom'>
        <VoteCountBoxPartyVotes />
        <VoteCountBoxPartyVotes />
        <VoteCountBoxPartyVotes />
      </div>
    </div>
  )
}

export default VoteCountBox
