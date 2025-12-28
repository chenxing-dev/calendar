import type { Dayjs } from "dayjs";

export interface OnThisDayEvent {
  year: number;
  description: string;
}

const ON_THIS_DAY: Record<string, OnThisDayEvent[]> = {
  "5-23": [
    {
      year: 1995,
      description: "加拿大软件专家詹姆斯·高斯林及其太阳微系统同事正式开发出编程语言Java。",
    },
  ],
  "12-13": [
    {
      year: 1937,
      description: "日本军队成功攻占中华民国首都南京市，并在未来数星期内展开各式反人类战争罪行。",
    },
    {
      year: 2003,
      description: "美军寻获前伊拉克总统萨达姆·侯赛因在提克里特的藏身处，并发起行动将其俘虏。",
    },
  ],
  "12-26": [
    {
      year: 1893,
      description: "中国共产主义革命家、首任中国共产党中央委员会主席毛泽东出生。",
    },
  ],
  "12-29": [
    {
      year: 1911,
      description:
        "中华民国临时大总统选举，孙中山以16票当选中华民国临时大总统，黎元洪以17票当选中华民国临时副总统。",
    },
    {
      year: 1996,
      description:
        "危地马拉总统阿尔瓦罗·恩里克·阿尔苏·伊里戈延与反政府游击队签署和平协议，结束长达36年的内战。",
    },
  ],
  "12-30": [
    {
      year: 1922,
      description: "蘇維埃俄國、烏克蘭、白俄羅斯、外高加索聯邦正式簽署《蘇聯成立條約》而組成蘇聯。",
    },
  ],
};

export function getOnThisDayEvents(date: Dayjs): OnThisDayEvent[] {
  return ON_THIS_DAY[date.format("M-D")] || [];
}
