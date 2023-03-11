import React from 'react'
import './preElectionTable.scss'
import bat from '../../utils/images/bat.png'
import apc from '../../utils/images/apc.png'

const PreElectionTableList = () => {
  return (
    <div className='PreElectionTableListItem'>
      <div className='PreElectionTableListItemContentWrapper'>
        <div className='PreElectionTableListItemContentImgWrapper'>
          <img
            src={bat}
            alt=''
            className='PreElectionTableListItemContentImg'
          />
        </div>
        <span>Tinubu Bola Ahmed</span>
      </div>
      <div className='PreElectionTableListItemContentWrapper'>
        <div className='PreElectionTableListItemContentImgWrapper'>
          <img
            src={apc}
            alt=''
            className='PreElectionTableListItemContentImg'
          />
        </div>
        <span>APC</span>
      </div>
      <div className='PreElectionTableListItemContentWrapper'>Male</div>
      <div className='PreElectionTableListItemContentWrapper'>
        Shettima Kashim
      </div>
    </div>
  )
}

const PreElectionTable = () => {
  return (
    <div className='preElectionTable'>
      <div className='preElectionTableTop'>
        <div className='titleWrapper'>
          <p className='title'>Candidate</p>
        </div>
        <div className='titleWrapper'>
          <p className='title'>Party</p>
        </div>
        <div className='titleWrapper'>
          <p className='title'>Gender</p>
        </div>
        <div className='titleWrapper'>
          <p className='title'>Running Mate</p>
        </div>
      </div>
      <div className='preElectionTableList'>
        <PreElectionTableList />
        <PreElectionTableList />
        <PreElectionTableList />
        <PreElectionTableList />
        <PreElectionTableList />
        <PreElectionTableList />
        <PreElectionTableList />
        <PreElectionTableList />
      </div>
    </div>
  )
}

export default PreElectionTable
