export interface IData {
  _id: string;
  title: string;
  type: number;
  count: number;
  nextDate: string;
  expiredDate: string;
}
export const data = [
  {
    _id: "1",
    title: "lorem",
    type: 0,
    count: 10,
    nextDate: "2021-06-20",
    expiredDate: "2021-08-31",
  },
  {
    _id: "2",
    title: "ipsum",
    type: 1,
    count: 10,
    nextDate: "2021-06-20",
    expiredDate: "2021-08-31",
  },
  {
    _id: "3",
    title: "like",
    type: 2,
    count: 10,
    nextDate: "2021-06-20",
    expiredDate: "2021-08-31",
  },
];
