import { generateMedia } from "styled-media-query";

const MOBILE = 'mobile'
const LARGE = 'large'

const media = generateMedia({
  [MOBILE]: "768px",
  [LARGE]: "1170px"
});

const mq = {
  desktop: media.greaterThan(MOBILE),
  large: media.greaterThan(LARGE)
};

export default mq