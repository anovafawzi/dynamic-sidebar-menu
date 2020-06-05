import { createReducer } from '@reduxjs/toolkit'
import sidemenuInitial from "../configs/sidemenu.json";

const initialSidebar = {
  sidebarItems: sidemenuInitial
}

const sidebarReducer = createReducer(initialSidebar, {
  SET_SIDEBAR_ITEMS: (state, action) => {
    state.sidebarItems = action.sidebarItems;
  }
});

export default sidebarReducer;