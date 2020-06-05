import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Collapse, List, ListItem } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import classNames from "classnames";
import { cleanLabel } from "../helpers";
import ISideMenuItem from "../interfaces/ISideMenuItem";

// material-ui css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebarItem: {
      paddingLeft: 56,
      paddingTop: 15,
      paddingBottom: 16,
      color: "rgba(255,255,255,0.8)",
      letterSpacing: 0,
      fontSize: 16,
    },
    sideBarItemActive: {
      background: "linear-gradient(270deg, #383838 0%, #272626 100%)",
      borderRight: "3px solid #F7B500",
    },
    sideBarItemEnabled: {
      color: "rgba(255,255,255,0.8)",
    },
    sideBarItemDisabled: {
      color: "rgba(255,255,255,0.4)",
    },
    expandIcon: {
      position: "absolute",
      right: 25,
    },
  })
);

// interfaces
interface ISidebarItem {
  depthStep?: number;
  depth?: number;
  expanded?: any;
  item: ISideMenuItem;
  onClickItem: (item: ISideMenuItem) => void;
}

interface ISidebar {
  items: Array<ISideMenuItem>;
  depthStep?: any;
  depth?: any;
  expanded?: any;
  onClick: (item: ISideMenuItem) => void;
}

// SidebarItem component
const SidebarItem: React.FC<ISidebarItem> = ({
  depthStep = 10,
  depth = 0,
  expanded,
  item,
  onClickItem,
  ...rest
}) => {
  const classes = useStyles();

  const [collapsed, setCollapsed] = React.useState(true);
  const { id, childs, isShowed, isAllowed } = item;

  function toggleCollapse() {
    setCollapsed((prevValue) => !prevValue);
  }

  function onClick(e) {
    if (Array.isArray(childs)) {
      toggleCollapse();
    }
    onClickItem(item);
  }

  let expandIcon;

  if (Array.isArray(childs) && childs.length && isAllowed) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
        className={classNames(
          isAllowed ? classes.sideBarItemEnabled : classes.sideBarItemDisabled,
          classes.expandIcon
        )}
      />
    ) : (
      <ExpandMoreIcon
        className={classNames(
          isAllowed ? classes.sideBarItemEnabled : classes.sideBarItemDisabled,
          classes.expandIcon
        )}
      />
    );
  }

  return (
    <React.Fragment>
      {isShowed && (
        <React.Fragment>
          <ListItem
            className={classNames(
              classes.sidebarItem
              // ,
              // classes.sideBarItemActive
            )}
            onClick={isAllowed ? onClick : undefined}
            button
            dense
            {...rest}
          >
            <div style={{ paddingLeft: depth * depthStep }}>
              <div
                className={
                  isAllowed
                    ? classes.sideBarItemEnabled
                    : classes.sideBarItemDisabled
                }
              >
                {cleanLabel(id)}
              </div>
            </div>
            {expandIcon}
          </ListItem>
          <Collapse in={!collapsed} timeout="auto" unmountOnExit>
            {Array.isArray(childs) ? (
              <List disablePadding dense>
                {childs.map((subItem, index) => (
                  <React.Fragment key={`${subItem.id}${index}`}>
                    <SidebarItem
                      depth={depth + 1}
                      depthStep={depthStep}
                      item={subItem}
                      onClickItem={onClickItem}
                    />
                  </React.Fragment>
                ))}
              </List>
            ) : null}
          </Collapse>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// exported Sidebar component
const Sidebar: React.FC<ISidebar> = ({
  items,
  depthStep,
  depth,
  expanded,
  onClick,
}) => {
  return (
    <div className="sidebar">
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.id}${index}`}>
            <SidebarItem
              depthStep={depthStep}
              depth={depth}
              expanded={expanded}
              item={sidebarItem}
              onClickItem={(item) => onClick(item)}
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
