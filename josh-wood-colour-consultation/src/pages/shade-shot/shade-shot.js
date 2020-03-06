import React from "react";
import PropTypes from "prop-types";

import Page from "../../components/page";
import Title from "../../components/title";
import Description from "../../components/description";
import NavigationButtons from "../../components/navigation";
import { BoxedWrap } from "../../components/page/styled";
import {
  ShadeShotForm,
  Preview,
  Side,
  Selectors,
  VideoSection,
  VideoTitle,
  VideoIFrame,
  TipsButtonTop,
  ButtonSelectorsWrap,
  ChoicesWrap
} from "./styled";
import ShadeShotSelector from "./shade-shot-selector";
import CheckboxSelector from "../../components/checkbox";
import Modal from "../../components/modal";
import ShadeShotBox from "./shade-shot-box";
import ShadeShotModal from "./shade-shot-modal";

import GraysLevelSelector from "../grays/grays-level-selector";

const CurrentTypePage = ({
  isModalVisible,
  shadeShots,
  selectedShadeShotId,
  preview,
  isFinished,
  handleSelect,
  handleNoShadeShot,
  handleShowComparison,
  handleCloseModalClick,
  handleNextPageClick,
  handlePreviousPageClick
}) => (
  <Page step={5}>
    <BoxedWrap>
      <Title>Let&apos;s personalise your colour</Title>
      <Description>
        &quot;Adding a Shade Shot Plus to your Permanent Kit adds tone and
        emphasises your hair’s natural highs and lows, for a colour truly
        personal to you.&quot; – Josh
      </Description>
      <TipsButtonTop onClick={handleShowComparison}>
        Show me a before and after
      </TipsButtonTop>
      <ShadeShotForm>
        <Preview src={preview} />
        <Side>
          <Selectors>
            <ChoicesWrap>
              {shadeShots.map(shadeShot => (
                <GraysLevelSelector
                  key={shadeShot.id}
                  level={{
                    label: shadeShot.name,
                    picture: shadeShot.picture
                  }}
                  selectedGraysLevelId={selectedShadeShotId}
                  onClick={handleSelect}
                />
              ))}
            </ChoicesWrap>
            <ButtonSelectorsWrap>
              {shadeShots.map(shadeShot => (
                <ShadeShotSelector
                  key={shadeShot.id}
                  shadeShot={shadeShot}
                  selectedShadeShotId={selectedShadeShotId}
                  onClick={handleSelect}
                />
              ))}
            </ButtonSelectorsWrap>
            <CheckboxSelector
              label="Just a base shade for now"
              isChecked={selectedShadeShotId === 0}
              style={{ border: "none" }}
              onClick={handleNoShadeShot}
            />
          </Selectors>
          {selectedShadeShotId ? (
            <ShadeShotBox
              selectedShadeShotId={selectedShadeShotId}
              handleShowComparison={handleShowComparison}
            />
          ) : null}
        </Side>
      </ShadeShotForm>
      <NavigationButtons
        handleNextClick={handleNextPageClick}
        handlePreviousClick={handlePreviousPageClick}
        isFinished={isFinished}
      />
    </BoxedWrap>
    <Modal isVisible={isModalVisible} onCloseClick={handleCloseModalClick}>
      {selectedShadeShotId ? (
        <ShadeShotModal selectedShadeShotId={selectedShadeShotId} />
      ) : null}
    </Modal>
    <VideoSection>
      <Title>
        Josh explains
        <br />
        <VideoTitle>how Shade Shot Plus works</VideoTitle>
      </Title>
      <VideoIFrame
        title="Shade shot video"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/zUImjBPy7W0"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoSection>
  </Page>
);

CurrentTypePage.defaultProps = {
  isFinished: false,
  selectedShadeShotId: null
};

CurrentTypePage.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  shadeShots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired,
  selectedShadeShotId: PropTypes.number,
  preview: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleNoShadeShot: PropTypes.func.isRequired,
  handleShowComparison: PropTypes.func.isRequired,
  handleCloseModalClick: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool
};

export default CurrentTypePage;
