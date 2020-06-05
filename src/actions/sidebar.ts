import { SET_SIDEBAR_ITEMS } from "../constants/actionTypes";

/*
 * action creators
 */

export function setSidebarItems(sidebarItems: any) {
  return { type: SET_SIDEBAR_ITEMS, sidebarItems }
}