import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPushedWithinRange } from "@_actions/commit_actions";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";

const today = dayjs().toDate();

interface valueType {
  date: Date;
  count: number;
}

function ContributionGraph() {
  const dispatch = useAppDispatch();
  const { pushedAll } = useAppSelector((state) => state.commit);
  const { userData } = useAppSelector((state) => state.user);
  const [values, setValues] = useState<valueType[]>([]);

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
      setValues(
        getRange(400).map((index) => {
          const date = shiftDate(today, -index);
          const count = pushedAll.filter((item) =>
            dayjs(item.createAt).isSame(dayjs(date), "date")
          ).length;
          return {
            date,
            count,
          };
        })
      );
    }
  }, [pushedAll]);

  if (values.length > 0) {
    return (
      <div>
        <CalendarHeatmap
          startDate={shiftDate(today, -366)}
          endDate={today}
          values={values}
          classForValue={(value: valueType) => {
            if (!value) {
              return "color-empty";
            }
            return `color-github-3`;
          }}
          tooltipDataAttrs={(value: valueType) => {
            return {
              "data-tip": `${dayjs(value.date).format(
                "YYYY-MM-DD"
              )} has count: ${value.count}`,
            };
          }}
          showWeekdayLabels={true}
          onClick={(value) =>
            alert(`Clicked on value with count: ${value.count}`)
          }
        />
        <ReactTooltip />
      </div>
    );
  } else {
    return <div>없음</div>;
  }
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

export default ContributionGraph;
