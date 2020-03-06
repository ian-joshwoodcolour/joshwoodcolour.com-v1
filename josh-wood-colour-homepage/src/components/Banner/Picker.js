import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mq from '../../utils/mq'

const Container = styled.div`
    background: rgba(0,0,0,0.50);
    font-size: 70px;
    color: #FFFFFF;
    flex: 1 1 315px;
    padding: 0 48px 0 48px;
    flex-direction: column;
    align-items: right;
    
    display: none;
    ${mq.large`
        display: flex;
    `}
`

const Index = styled.div`
    
    font-size: 70px;
    color: #FFFFFF;
    flex: 0 0 78px;
    margin-right: 27px;
`

const LineButtons = styled.div`
    > :not(:last-child) {
        margin-right: 20px;
    }
    display: flex;
    justify-content: space-between;
    flex: 1 1 auto;
    width: 100%;
`

const Button = styled.button`
    display: block;
    flex: 1 1 auto;
    height: 40px;
    position: relative;
`

const ButtonGraphic = styled.div`
    background-color: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
    height: 2px;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`

const Arrows = styled.div`
    display: flex;
    justify-content: flex-end;
    > :first-child {
        margin-right: 30px;
    }
`

const Arrow = ({ className }) => (
  <svg width="28" height="20" className={className}>
    <path d="M27.694 10.724l-8.711 8.947a1.116 1.116 0 0 1-1.54.041c-.423-.368-.434-1.088-.043-1.488l6.993-7.171H1.09C.487 11.053 0 10.582 0 10s.487-1.053 1.089-1.053h23.304L17.4 1.777c-.391-.402-.363-1.103.043-1.49.43-.406 1.14-.371 1.54.042l8.71 8.947c.256.243.303.477.307.724 0 .242-.153.567-.306.724z" fill="#FDFDFD" fill-rule="nonzero"/>
  </svg>
)

const ArrowRight = styled(Arrow)`
  path {
      fill: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  }
`

const ArrowButton = styled.button`
    
`

const ArrowLeft = styled(ArrowRight)`
  transform: rotate(180deg);
`

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const Picker = ({ index, onClick, length }) => {
    const leftEnabled = index>0
    const rightEnabled = index<=length-2
    const items = Array.apply(null, {length}).map(Number.call, Number)

    return (
    <Container>
        <Arrows>
            <button disabled={!leftEnabled} onClick={() => onClick(index-1)}>
                <ArrowLeft active={leftEnabled} />
            </button>
            <button disabled={!rightEnabled} onClick={() => onClick(index+1)}>
                <ArrowRight active={rightEnabled} /> 
            </button>
        </Arrows>
        <LineButtons>
            {items.map(
                (item) => {
                    const isActive = Boolean(index===item)

                    return (<Button disabled={isActive} key={`item`} onClick={() => onClick(item)}><ButtonGraphic active={isActive} /></Button>)
                }
            )}
        </LineButtons>
    </Container>
    )
}

Picker.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Picker