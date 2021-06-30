import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Paper, Divider, Typography } from "@material-ui/core";
import { ICommit } from "@typings/db";
import { getPushedWithinRange } from "@_actions/commit_actions";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import { useContributionGraphStyles } from "./styles";
import { getPushed } from "@_reducers/commitSlice";

const today = dayjs().toDate();

interface valueType {
  date: Date;
  count: number;
}

function ContributionGraph() {
  const classes = useContributionGraphStyles();
  const dispatch = useAppDispatch();
  const { pushedAll } = useAppSelector((state) => state.commit);
  const { userData } = useAppSelector((state) => state.user);
  const [values, setValues] = useState<valueType[]>([]);
  const [maxCount, setMaxCount] = useState(0);
  const generateValues = (arr: ICommit[]): valueType[] => {
    return getRange(366).map((index) => {
      const date = shiftDate(today, index);
      const count = arr.filter((item) =>
        dayjs(item.createAt).isSame(dayjs(date), "day")
      ).length;
      return {
        date,
        count,
      };
    });
  };
  const onClickGraph = (value: valueType) => {
    dispatch(getPushed(dayjs(value.date).format("YYYY-MM-DD")));
  };

  useEffect(() => {
    if (userData) {
      dispatch(
        getPushedWithinRange({
          startDate: dayjs().format("YYYY-MM-DD"),
          endDate: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
        })
      );
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (pushedAll) {
      setValues(generateValues(pushedAll));
    }
  }, [pushedAll]);

  useEffect(() => {
    setMaxCount(
      Math.max.apply(
        Math,
        values.map((v) => v.count)
      )
    );
  }, [values]);
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Commited Habbits
      </Typography>
      <Divider />
      {pushedAll && (
        <div className={classes.graph}>
          <CalendarHeatmap
            startDate={shiftDate(today, 366)}
            endDate={today}
            values={values}
            classForValue={(value: valueType) => {
              if (value) {
                if (value.count === 0) {
                  return "color-empty";
                }
                return `color-github-${calColorSquare(value.count, maxCount)}`;
              }
            }}
            tooltipDataAttrs={(value: valueType) => {
              return {
                "data-tip": `${dayjs(value.date).format(
                  "YYYY-MM-DD"
                )} has count: ${value.count}`,
              };
            }}
            showWeekdayLabels={true}
            onClick={(value) => onClickGraph(value)}
          />
        </div>
      )}
      <ReactTooltip />
    </Paper>
  );
}

function shiftDate(date: Date, numDays: number) {
  const newDate = dayjs(date);
  return newDate.subtract(numDays, "day").toDate();
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function calColorSquare(count: number, maxCount: number) {
  const per = (count / maxCount) * 100;
  if (per >= 75 && per <= 100) {
    return 4;
  } else if (per >= 50 && per < 75) {
    return 3;
  } else if (per >= 25 && per < 50) {
    return 2;
  } else if (per > 0 && per < 25) return 1;
}
export default ContributionGraph;
