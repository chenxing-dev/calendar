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
};

export function getOnThisDayEvents(date: Dayjs): OnThisDayEvent[] {
  return ON_THIS_DAY[date.format("M-D")] || [];
}
