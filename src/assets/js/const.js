export { regionList, prefNumArray, prefArray };

const TOHOKU = "北海道・東北";
const KANTO = "関東";
const CHUBU = "中部";
const KINKI = "近畿";
const CHUGOKU = "中国";
const SHIKOKU = "四国";
const KYUSYU = "九州・沖縄";

const regionList = Object.freeze([TOHOKU, KANTO, CHUBU, KINKI, CHUGOKU, SHIKOKU, KYUSYU]);

const prefNumArray = Object.freeze([7, 7, 9, 7, 5, 4, 8]);

const prefArray = [
  {
    region: TOHOKU,
    prefList: [],
  },
  {
    region: KANTO,
    prefList: [],
  },
  {
    region: CHUBU,
    prefList: [],
  },
  {
    region: KINKI,
    prefList: [],
  },
  {
    region: CHUGOKU,
    prefList: [],
  },
  {
    region: SHIKOKU,
    prefList: [],
  },
  {
    region: KYUSYU,
    prefList: [],
  },
];
