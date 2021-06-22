import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Checkbox,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTasksStyles, StyledTableCell } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getTodayHabbits } from "../../../_actions/habbit_actions";
import { occur, occurError } from "../../../_reducers/alertSlice";
import { IHabbit } from "../../../typings/db";
import {
  handleAllChecked,
  handleCheckedState,
} from "../../../_reducers/habbitSlice";

interface ITasksProps {
  value: number;
  handleCommitStatus: (status: boolean) => void;
}
function Tasks({ value }: ITasksProps) {
  const dispatch = useAppDispatch();
  const classes = useTasksStyles();

  const [generateHabbitList, setGenerateHabbitList] = useState<IHabbit[]>([]);
  const { habbits } = useAppSelector((state) => state.habbit);
  const { userData } = useAppSelector((state) => state.user);

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(handleAllChecked());
    } else {
      dispatch(handleAllChecked());
    }
  };

  const handleClick = (e: React.MouseEvent<unknown>, _id: string) => {
    dispatch(handleCheckedState(_id));
  };

  const parsingNextDate = (arr: boolean[], dayOfWeek: number): string => {
    let i = dayOfWeek;
    let count = 0;
    if (dayOfWeek + 1 === arr.length) {
      i = 0;
    }

    for (i; i < arr.length; i++) {
      count++;
      if (arr[i] === true) {
        break;
      }
      if (i === arr.length) {
        i = -1;
      }
    }

    return dayjs().add(count, "day").format("YYYY-MM-DD");
  };

  const isIndeterminate = useCallback(() => {
    const selected = generateHabbitList.filter(
      (item) => item.checked === true
    ).length;

    return selected > 0 && selected < generateHabbitList.length;
  }, [generateHabbitList]);

  const isAllItemChecked = useCallback(() => {
    const selected = generateHabbitList.filter(
      (item) => item.checked === true
    ).length;
    return (
      generateHabbitList.length > 0 && selected === generateHabbitList.length
    );
  }, [generateHabbitList]);

  const isSelected = useCallback(
    (_id: string) => {
      const index = generateHabbitList.findIndex((item) => item._id === _id);
      return generateHabbitList[index].checked;
    },
    [generateHabbitList]
  );

  useEffect(() => {
    const getHabbits = async () => {
      const resultAction = await dispatch(
        getTodayHabbits({
          userId: userData?._id as string,
          date: dayjs().format("YYYY-MM-DD"),
        })
      );
      if (getTodayHabbits.fulfilled.match(resultAction)) {
        dispatch(occur("금일 습관을 불러오는데 성공했습니다."));
      } else {
        if (resultAction.payload) {
          dispatch(occurError(resultAction.payload.errorMessage));
        }
      }
    };
    if (userData) {
      getHabbits();
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (habbits) {
      if (value === 0) {
        setGenerateHabbitList(habbits);
      } else {
        setGenerateHabbitList(
          habbits.filter((habbit) => habbit.category === value - 1)
        );
      }
    }
  }, [habbits, value]);

  if (generateHabbitList) {
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={isIndeterminate()}
                checked={isAllItemChecked()}
                onChange={handleSelectAllClick}
              />
            </StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">NextDate</StyledTableCell>
            <StyledTableCell align="right">ExpiredDate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {generateHabbitList.map((habbit) => {
            const isItemSelected = isSelected(habbit._id);
            return (
              <TableRow
                key={habbit._id}
                hover
                onClick={(e) => handleClick(e, habbit._id)}
                role="checkbox"
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <StyledTableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} />
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className={classes.wideColumn}
                >
                  {habbit.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {parsingNextDate(habbit.schedule, dayjs().day())}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dayjs(habbit.expiredDate).format("YY-MM-DD")}
                </StyledTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  } else {
    return <div>데이터가 없습니다.</div>;
  }
}

export default Tasks;
