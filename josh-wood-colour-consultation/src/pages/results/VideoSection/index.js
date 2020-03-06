import React from "react";

import { SubHeadlineTop, Title, SubTitle, VideoWrap, Wrap, Iframe } from "./styled";

const VideoSection = () => {
  return (
    <Wrap>
      <SubHeadlineTop>Video for you</SubHeadlineTop>
      <Title>Josh Explains</Title>
      <SubTitle>
        How to colour your roots and refresh your ends with the Josh Wood Colour
        Permanent Kit
      </SubTitle>
      <VideoWrap>
          <Iframe
              title="Shade shot video"
              height="315"
              src="https://www.youtube.com/embed/EyfHNJP7Lks"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
          />
      </VideoWrap>
    </Wrap>
  );
};

export default VideoSection;
