import {Dimensions, PixelRatio} from "react-native";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: number) => size / fontScale;
export const COLOR = {
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  PLATINUM: '#E5E4E2',
  PRIMARY_50: "#fef0eb",
  PRIMARY_75: "#fac3ab",
  PRIMARY_100: "#f8aa88",
  PRIMARY_200: "#f58555",
  PRIMARY_300: "#f36c32",
  PRIMARY_400: "#aa4c23",
  PRIMARY_500: "#94421f",
  GREY_50: "#e9e9e9",
  GREY_75: "#a3a3a3",
  GREY_100: "#7d7d7d",
  GREY_200: "#454545",
  GREY_300: "#1f1f1f",
  GREY_400: "#161616",
  GREY_500: "#131313",
  SECONDARY_50: "#e9eaeb",
  SECONDARY_75: "#a3a7ad",
  SECONDARY_100: "#7d838b",
  SECONDARY_200: "#454d59",
  SECONDARY_300: "#1f2937",
  SECONDARY_400: "#161d27",
  SECONDARY_500: "#131922",
  WHITE: "#ffffff",
  NEUTRAL_1: "#0000001A",
  NEUTRAL_2: "rgba(0,0,0,0.2)",
  NEUTRAL_3: "rgba(0,0,0,0.6)",
  DANGER: 'red',
  ORANGE_BLACK: '#291208',
  CODEBACKGROUND: '#1E1E1E',
  P_TRANSPARENT_10: 'rgba(243, 108, 50, 0.1)',
  P_TRANSPARENT_25: 'rgba(243, 108, 50, 0.25)',
  P_TRANSPARENT_50: 'rgba(243, 108, 50, 0.5)',
  P_TRANSPARENT_75: 'rgba(243, 108, 50, 0.75)',
  P_TRANSPARENT_90: 'rgba(243, 108, 50, 0.9)',
};

export const FONTSIZE = {
  HEADING_1: getFontSize(48),
  HEADING_2: getFontSize(40),
  HEADING_3: getFontSize(33),
  HEADING_4: getFontSize(28),
  HEADING_5: getFontSize(23),
  TITLE_1: getFontSize(19),
  TITLE_2: getFontSize(16),
  BODY: getFontSize(13),
  SMALL: getFontSize(10),
  X_SMALL: getFontSize(8),
}

export const DIMEN = {
  SCREENWIDTH: Dimensions.get('screen').width,
  SCREENHEIGHT: Dimensions.get('screen').height,
  PADDING: {
    ES: 2,
    SM: 5,
    ME: 10,
    LG: 15,
    ELG: 20
  },
  MARGIN: {
    XLG: 25,
    LG: 20,
    ME: 15,
    SM: 10,
    XSM: 5,
    XXSM: 2.5,
  },
  CONSTANT: {
    XLG: 25,
    LG: 20,
    ME: 15,
    SM: 10,
    XSM: 5,
    XXSM: 2.5,
  }
}

export const BGTASKS = {
  CHECK_ONLINE_STATUS: 'background-network-check',
}