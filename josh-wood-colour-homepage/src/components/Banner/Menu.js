import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Picker from './Picker'
import mq from '../../utils/mq'

const Container = styled.div`
  width: 100%;
  flex: 0 0 auto;
  display: none;
  ${mq.desktop`display: flex;`}
`

const Title = styled.div`
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0.5px;
  flex: 0 1 216px;
  margin-right: 32px;
  ${mq.large`
    flex-shrink: 0;
  `}
`

const Content = styled.div`
  background: black;
  padding: 46px 80px;
  flex: 1 1 auto;
  width: 100%;
  ${mq.desktop`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}  
`

const Items = styled.div`
    ${mq.desktop`
        display: flex;
        justify-content: flex-start;
        > * {
            border-right: 1px solid #D8D8D8;
        }
        > :first-child {
            border-left: 1px solid #D8D8D8;
        }
    `}
`

const ItemContainer = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 1 290px;
    height: 100%;
    padding: 4px 50px 4px 30px;
`

const ItemLabel = styled.div`
    
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0.5px;
    line-height: 15px;
`

const Image = styled.div`
    flex: 0 0 50px;
    height: 50px;
    margin-right: 20px;
    background-image: url(${({src}) => src});
    background-size: cover;
    border-radius: 50%;
`

const Button = styled.a`
    flex: 0 0 50px; 
    display: flex;
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0.5px;
    margin-left: 50px;
    text-decoration: none;
`

const Plus = styled.div`
    position: relative;
    top: -3px;
    margin-right: 8px;
`

const Links = styled.div`
    display: flex;
`

const Item = ({ href, children, label }) => (
    <ItemContainer href={href}>
        {children}
        <ItemLabel>{label}</ItemLabel>
    </ItemContainer>
)

Item.propTypes = {
    href: PropTypes.string.isRequired,
    label: PropTypes.string,
    children: PropTypes.node,
}

const Menu = ({ pickerLength, pickerIndex, pickerOnClick }) => {
    return (
        <Container>
            <Content>
                <Links>
                    <Title>Explore our colour community</Title>
                    <Items>
                        <Item href="https://joshwoodcolour.com/blogs/tips-tricks/summer-hair-myths-3b-busted" label="Summer hair myths, busted">
                            <Image src="https://blogstudio.s3.amazonaws.com/josh-wood-colour/6741935d599ce5502c927edbfd26adce.jpg" />
                        </Item>
                        <Item href="https://joshwoodcolour.com/blogs/tips-tricks/behind-the-scenes-of-our-shade-shot-gloss-shoot" label="Behind the scenes of our Shade Shot Gloss shoot">
                            <Image src="https://blogstudio.s3.amazonaws.com/josh-wood-colour/17a6cc53a1af379ea05c925d01b6e0f9.jpg" />
                        </Item>
                    </Items>
                </Links>
                <Button href="https://joshwoodcolour.com/blogs/tips-tricks/"><Plus>+</Plus>More</Button>
            </Content>
            <Picker length={pickerLength} index={pickerIndex} onClick={pickerOnClick} />
        </Container>
    )
}

Menu.propTypes = {
    pickerLength: PropTypes.number.isRequired,
    pickerIndex: PropTypes.number.isRequired,
    pickerOnClick: PropTypes.func.isRequired,
}

export default Menu