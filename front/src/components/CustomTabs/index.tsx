import React, { useEffect, useState } from "react";
import { Paper, Tabs, Tab, Divider } from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import Tasks from "./Tasks";
import EnhancedToolbar from "./EnhancedToolbar";
import { data as initialData, IData } from "./Tasks/data";
import { useCustomTapsStyles } from "./styles";

export default function CustomTabs() {
  const classes = useCustomTapsStyles();
  const [value, setValue] = useState(0);
  const [data, setData] = useState<IData[]>([]);
  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (value === 0) {
      setData(initialData);
    } else {
      setData(initialData.filter((item) => item.type === value - 1));
    }
  }, [value]);
  return (
    <Paper className={classes.paper}>
      <EnhancedToolbar />
      <Divider />
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<AllInboxIcon />} label="All"></Tab>
        <Tab icon={<FitnessCenterIcon />} label="Fitness"></Tab>
        <Tab icon={<MenuBookIcon />} label="Study"></Tab>
        <Tab icon={<SportsEsportsIcon />} label="Hobby"></Tab>
      </Tabs>
      <Divider />
      <Tasks data={data} />
    </Paper>
  );
}
