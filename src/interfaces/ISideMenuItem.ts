export default interface ISideMenuItem {
  id: string;
  isShowed: boolean;
  isAllowed: boolean;
  childs?: Array<ISideMenuItem>;
}
