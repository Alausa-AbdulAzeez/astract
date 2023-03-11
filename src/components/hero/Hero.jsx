/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import MiniMap from '../miniMap/MiniMap'
import MapChart from '../NigeriaChoropleth/Legend'
import MapChart2 from '../NigeriaChoropleth/Legend copy'
import MapChart3 from '../NigeriaChoropleth/Legend copy 2'
import MapChart4 from '../NigeriaChoropleth/Legend copy 3'
import ChoroplethMap2 from '../NigeriaChoropleth/LegendAndLabel'
import NigeriaMap2 from '../NigeriaChoropleth/LegendAndLabel'
import LegendAndState from '../NigeriaChoropleth/LegendAndState'
import NigeriaMap from '../NigeriaChoropleth/NC2'
import NigeriaChoropleth from '../NigeriaChoropleth/NigeriaChoropleth'
import MyResponsiveChoropleth from '../NigeriaChoropleth/Nivo'
import { Tp } from '../NigeriaChoropleth/Tp'
import NigeriaMapZoom from '../NigeriaChoropleth/Zoom'
import DoughnutChart from '../pieChart/PieChart'
import maleIcon from '../../utils/images/maleIcon.png'
import femaleIcon from '../../utils/images/femaleIcon.png'
import apcCard from '../../utils/images/apcCard.png'
import lpCard from '../../utils/images/lpCard.png'
import pdpCard from '../../utils/images/pdpCard.png'
import atiku from '../../utils/images/atiku.png'
import po from '../../utils/images/po.png'
import batCard from '../../utils/images/batCard.png'

import './hero.scss'
import PreElectionTable from '../preElectionTable/PreElectionTable'
import CandidateCard from '../card/Card'
import useComponentVisible from '../../hooks/useComponentVisible'

const Hero = () => {
  const [dropDownData, setDropDownData] = useState([])
  const [showType, setshowType] = useState(false)
  const [showStage, setShowStage] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [type, setType] = useState('Governorship')
  const [stage, setStage] = useState('Pre-Election')
  const [date, setDate] = useState(2023)

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true)

  const [dataset, setDataset] = useState({
    electionStage: 'Pre-Election',
    electionType: 'Governorship',
  })

  //   const { ref, isComponentVisible } = useComponentVisible(true);
  const electionStage = [
    'Pre-Election',
    'Election Day Live Updates',
    'Post-Election Analysis',
  ]
  const electionType = [
    'Presidential',
    'Gubernatorial',
    'Senate',
    'House of Representatives',
  ]
  const electionYear = [
    2023, 2019, 2015, 2011, 2007, 2003, 1999, 1995, 1991, 1987,
  ]

  const handleSetDropdownData = (infoType) => {
    switch (infoType) {
      case 'stage':
        setIsComponentVisible(true)
        console.log(isComponentVisible, showStage)

        setDropDownData(electionStage)
        setShowDate(false)
        setshowType(false)
        setShowStage(!showStage)
        break
      case 'type':
        setIsComponentVisible(true)
        setDropDownData(electionType)
        setShowDate(false)
        setshowType(!showType)
        setShowStage(false)
        break
      case 'year':
        setIsComponentVisible(true)
        setDropDownData(electionYear)
        setShowDate(!showDate)
        setshowType(false)
        setShowStage(false)

        break

      default:
        break
    }
  }

  const handleSelectType = (e) => {
    if (e.currentTarget.textContent === 'Presidential') {
      setDataset({ ...dataset, electionType: e.currentTarget.textContent })
    }
  }

  const handleSelectStage = (e) => {
    setDataset({ ...dataset, electionStage: e.currentTarget.textContent })

    // switch (e.currentTarget.textContent) {
    //   case 'Election Day Live Updates':
    //     setDataset({ ...dataset, electionStage: e.currentTarget.textContent })
    //     break

    //   default:
    //     break
    // }
  }

  useEffect(() => {}, [dropDownData])

  return (
    <div className='hero'>
      <div className='heroTop'>
        <div className='heroTopLeft'>
          <h3 className='title'>
            {dataset.electionStage === 'Election Day Live Updates' &&
              'Election Data'}
            {dataset.electionStage === 'Pre-Election' && 'Pre-Election'}
            {dataset.electionStage === 'Post-Election Analysis' &&
              'Post-Election Data'}
          </h3>
          <p className='updated'>
            UPDATED <span>MAR. 15, 2021, 9:43 A.M. EDT</span>
          </p>
        </div>
        <div className='heroTopRight'>
          <div className='stageRelative'>
            <div
              className='selectWrapper'
              onClick={() => handleSetDropdownData('stage')}
            >
              <input
                type='text'
                disabled={true}
                value={dataset.electionStage}
              />
              <MdKeyboardArrowDown className='arrowDownIcon' />
            </div>
            {isComponentVisible && showStage && (
              <ul className='dropdownUl' ref={ref}>
                {dropDownData.map((singleStage, index) => {
                  return (
                    <li key={index} onClick={(e) => handleSelectStage(e)}>
                      {singleStage}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className='stageRelative'>
            <div
              className='selectWrapper selectMiddle'
              onClick={() => handleSetDropdownData('type')}
            >
              <input type='text' disabled={true} value={dataset.electionType} />
              <MdKeyboardArrowDown className='arrowDownIcon' />
            </div>
            {isComponentVisible && showType && (
              <ul className='dropdownUl' ref={ref}>
                {dropDownData.map((singleStage, index) => {
                  return (
                    <li key={index} onClick={(e) => handleSelectType(e)}>
                      {singleStage}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <div className='stageRelative'>
            <div
              className='selectWrapper'
              onClick={() => handleSetDropdownData('year')}
            >
              <input type='text' disabled={true} value={date} />
              <MdKeyboardArrowDown className='arrowDownIcon' />
            </div>
            {isComponentVisible && showDate && (
              <ul className='dropdownUl' ref={ref}>
                {dropDownData?.map((singleStage, index) => {
                  return <li key={index}>{singleStage}</li>
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className='heroBottom'>
        {dataset.electionStage === 'Election Day Live Updates' &&
          dataset.electionType === 'Presidential' && (
            <>
              <div className='lineDisplayWrapper'>
                <div className='title'>PRESIDENT</div>
                <div className='lineDisplayTop'>
                  <div
                    className='candidate1 line'
                    style={{ width: '50%', backgroundColor: '#64CCFF' }}
                  >
                    <CandidateCard
                      info={{
                        img: batCard,
                        title: 'Tinubu, APC',
                        otherText: '81,283,786 votes (51.3%)',
                        party: '#64CCFF',
                      }}
                    />
                  </div>
                  <div
                    className='candidate2 line'
                    style={{ width: '30%', backgroundColor: '#0AA83F' }}
                  >
                    <CandidateCard
                      info={{
                        img: po,
                        title: 'Peter, LP',
                        otherText: '60,283,786 votes (42%)',
                        party: '#0AA83F',
                      }}
                    />
                  </div>
                  <div
                    className='candidate3 line'
                    style={{ width: '20%', backgroundColor: '#D62B3C' }}
                  >
                    <CandidateCard
                      info={{
                        img: atiku,
                        title: 'Atiku, PDP',
                        otherText: '60,283,786 votes (42%)',
                        party: '#D62B3C',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='otherLinesDisplayWrapper'>
                <div className='lineDisplayWrapper'>
                  <div className='title'>SENATE</div>
                  <div className='lineDisplayTop'>
                    <div
                      className='candidate1 line'
                      style={{ width: '40%', backgroundColor: '#64CCFF' }}
                    >
                      <CandidateCard
                        info={{
                          img: apcCard,
                          title: 'All Progressive Congress',
                          otherText: '54 Seats (51.3%)',
                          party: '#64CCFF',
                        }}
                      />
                    </div>
                    <div
                      className='candidate2 line'
                      style={{ width: '35%', backgroundColor: '#0AA83F' }}
                    >
                      <CandidateCard
                        info={{
                          img: lpCard,
                          title: 'The Labor Party',
                          otherText: '12 Seats (16.3%)',
                          party: '#0AA83F',
                        }}
                      />
                    </div>
                    <div
                      className='candidate3 line'
                      style={{ width: '35%', backgroundColor: '#D62B3C' }}
                    >
                      <CandidateCard
                        info={{
                          img: pdpCard,
                          title: 'People Democratic Party',
                          otherText: '36 Seats (46%)',
                          party: '#D62B3C',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className='lineDisplayWrapper'>
                  <div className='title'>HOUSE</div>
                  <div className='lineDisplayTop'>
                    <div
                      className='candidate1 line'
                      style={{ width: '35%', backgroundColor: '#64CCFF' }}
                    >
                      <CandidateCard
                        info={{
                          img: apcCard,
                          title: 'All Progressive Congress',
                          otherText: '54 Seats (51.3%)',
                          party: '#64CCFF',
                        }}
                      />
                    </div>
                    <div
                      className='candidate2 line'
                      style={{ width: '30%', backgroundColor: '#0AA83F' }}
                    >
                      <CandidateCard
                        info={{
                          img: lpCard,
                          title: 'The Labor Party',
                          otherText: '12 Seats (16.3%)',
                          party: '#0AA83F',
                        }}
                      />
                    </div>
                    <div
                      className='candidate3 line'
                      style={{ width: '35%', backgroundColor: '#D62B3C' }}
                    >
                      <CandidateCard
                        info={{
                          img: pdpCard,
                          title: 'People Democratic Party',
                          otherText: '36 Seats (46%)',
                          party: '#D62B3C',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        {!(
          dataset.electionStage === 'Pre-Election' &&
          dataset.electionType === 'Presidential'
        ) && (
          <div className='mapContainer'>
            <MapChart4 />
          </div>
        )}
        {/* {(dataset.electionStage === 'Pre-Election' &&
          dataset.electionType === 'Governorship') ||
          (dataset.electionStage === 'Election Day Live Updates' &&
            dataset.electionType === 'Presidential' && (
              <div className='mapWrapper'>
                <MapChart4 />
              </div>
            ))} */}

        {dataset.electionStage === 'Pre-Election' &&
          dataset.electionType === 'Presidential' && (
            <div className='preElectionTableWrapper'>
              <PreElectionTable />
            </div>
          )}
        {
          <div className='mapAndPieChartWrapper'>
            <div className='doughnutWrapper'>
              <DoughnutChart />
            </div>
            <div className='smallMapWrapper'>
              <p>CANDIDATES BY GEOPOLITICAL ZONES</p>
              <MiniMap />
            </div>
            <div className='othersWrapper'>
              <div className='totalElected'>
                <div className='totalElectedTitle'>TOTAL ELECTED MEMBERS</div>
                <div className='totalElectedAmount'>10,000 </div>
              </div>
              <div className='male'>
                <div className='maleTitle'>
                  MALE
                  <span>
                    <img src={maleIcon} alt='maleIcon' className='genderIcon' />
                  </span>
                </div>
                <div className='maleAmount'>9,000 </div>
              </div>
              <div className='female'>
                <div className='femaleTitle'>
                  FEMALE
                  <span>
                    <img
                      src={femaleIcon}
                      alt='femaleIcon'
                      className='genderIcon'
                    />
                  </span>
                </div>
                <div className='femaleAmount'>1,000 </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Hero
