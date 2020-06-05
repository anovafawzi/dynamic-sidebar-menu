import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Checkbox, List, ListItem, ListItemText, ListItemSecondaryAction } from "@material-ui/core";
import { cleanLabel } from "../helpers";
import ISideMenuItem from "../interfaces/ISideMenuItem";

// material-ui css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    settingItem: {
      paddingLeft: 56,
      paddingTop: 15,
      paddingBottom: 16,
      color: "rgba(255,255,255,0.8)",
      letterSpacing: 0,
      fontSize: 16,
    },
    settingList: {
      maxWidth: 560,
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    settingText: {
      marginLeft: 15,
    },
  })
);

// interfaces
interface ISettingListItem {
  depthStep?: number;
  depth?: number;
  expanded?: any;
  parentItemId?: string;
  item: ISideMenuItem;
  onClickItem: (parentItemId: string, itemId: string, item: any) => void;
}

interface ISettingList {
  items: Array<ISideMenuItem>;
  depthStep?: any;
  depth?: any;
  expanded?: any;
  onClick: (parentItemId: string, itemId: string, item: any) => void;
}

// SettingListItem component
const SettingListItem: React.FC<ISettingListItem> = ({
  depthStep = 15,
  depth = 0,
  expanded,
  parentItemId = "",
  item,
  onClickItem,
  ...rest
}) => {
  const classes = useStyles();

  const { childs } = item;

  function toggleIsShowed() {
    onClickItem(parentItemId, item.id, { isShowed: !item.isShowed });
  }

  function toggleIsAllowed() {
    onClickItem(parentItemId, item.id, { isAllowed: !item.isAllowed });
  }

  return (
    <React.Fragment>
      <ListItem
        dense
        button
        {...rest}
      >
        <ListItemText
          id={`checkbox-list-secondary-label-${item.id}`}
          primary={`${cleanLabel(item.id)}`}
          style={{ paddingLeft: depth * depthStep }}
        />
        <ListItemSecondaryAction>
          <span className={classes.settingText}>show</span>
          <Checkbox
            edge="end"
            color="primary"
            onChange={toggleIsShowed}
            checked={item.isShowed}
            inputProps={{ "aria-labelledby": item.id }}
          />
          <span className={classes.settingText}>allow</span>
          <Checkbox
            edge="end"
            color="primary"
            onChange={toggleIsAllowed}
            checked={item.isAllowed}
            inputProps={{ "aria-labelledby": item.id }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {Array.isArray(childs) ? (
        <List disablePadding dense>
          {childs.map((subItem, index) => (
            <React.Fragment key={`${subItem.id}${index}`}>
              <SettingListItem
                depth={depth + 1}
                depthStep={depthStep}
                parentItemId={parentItemId}
                item={subItem}
                onClickItem={onClickItem}
              />
            </React.Fragment>
          ))}
        </List>
      ) : null}
    </React.Fragment>
  );
};

// exported SettingList component
const SettingList: React.FC<ISettingList> = ({
  items,
  depthStep,
  depth,
  expanded,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <div className="sidebar">
      <List disablePadding dense className={classes.settingList}>
        {items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.id}${index}`}>
            <SettingListItem
              depthStep={depthStep}
              depth={depth}
              expanded={expanded}
              parentItemId={sidebarItem.id}
              item={sidebarItem}
              onClickItem={(parentItemId, itemId, item) => onClick(parentItemId, itemId, item)}
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default SettingList;
