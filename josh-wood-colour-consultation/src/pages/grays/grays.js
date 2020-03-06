import React from "react";
import PropTypes from "prop-types";

import Page from "../../components/page";
import { BoxedWrap } from "../../components/page/styled";
import Title from "../../components/title";
import Description from "../../components/description";
import NavigationButtons from "../../components/navigation";
import { GRAYS_LEVELS } from "../../common/enums";
import { GraysForm } from "./styled";
import GraysLevelSelector from "./grays-level-selector";

const GraysPage = ({
  isFinished,
  selectedGraysLevel,
  handleLevelSelected,
  handleNextPageClick,
  handlePreviousPageClick
}) => (
  <Page step={6}>
    <BoxedWrap>
      <Title>If any, how much grey hair do you have?</Title>
      <Description>
        &quot;Look at a section of hair around the middle of your head to
        roughly judge what percentage of your hair is grey.&quot;– Josh
      </Description>
      <GraysForm>
        {GRAYS_LEVELS.idsAsEnum.map(levelId => (
          <GraysLevelSelector
            key={levelId}
            level={GRAYS_LEVELS.ids[levelId]}
            selectedGraysLevelId={selectedGraysLevel}
            onClick={handleLevelSelected}
          />
        ))}
      </GraysForm>
      <NavigationButtons
        handleNextClick={handleNextPageClick}
        handlePreviousClick={handlePreviousPageClick}
        isFinished={isFinished}
      />
    </BoxedWrap>
  </Page>
);

GraysPage.defaultProps = {
  isFinished: false,
  selectedGraysLevel: null
};

GraysPage.propTypes = {
  selectedGraysLevel: PropTypes.number,
  handleLevelSelected: PropTypes.func.isRequired,
  handleNextPageClick: PropTypes.func.isRequired,
  handlePreviousPageClick: PropTypes.func.isRequired,
  isFinished: PropTypes.bool
};

export default GraysPage;
