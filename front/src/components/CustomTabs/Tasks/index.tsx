import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Checkbox,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTasksStyles, StyledTableCell } from "./styles";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getTodayHabbits } from "../../../_actions/habbit_actions";
import { occur, occurError } from "../../../_reducers/alertSlice";

function Tasks() {
  const dispatch = useAppDispatch();
  const classes = useTasksStyles();
  const [selected, setSelected] = useState<string[]>([]);
  const { habbits } = useAppSelector((state) => state.habbit);
  const { userData } = useAppSelector((state) => state.user);

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = habbits.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

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

  if (habbits) {
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selected.length > 0 && selected.length < habbits.length
                }
                checked={
                  habbits.length > 0 && selected.length === habbits.length
                }
                onChange={handleSelectAllClick}
              />
            </StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">NextDate</StyledTableCell>
            <StyledTableCell align="right">ExpiredDate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {habbits.map((habbit) => {
            const isItemSelected = isSelected(habbit._id);
            return (
              <TableRow
                key={habbit._id}
                hover
                onClick={(e) => handleClick(e, habbit._id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
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
