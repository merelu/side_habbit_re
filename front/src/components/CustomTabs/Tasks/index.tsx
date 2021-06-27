import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Checkbox,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getTodayHabbits } from "@_actions/habbit_actions";
import { occur, occurError } from "@_reducers/alertSlice";
import { IHabbit } from "@typings/db";
import { handleAllChecked } from "@_reducers/habbitSlice";
import CustomTableRow from "./CustomTableRow";
import {
  useCustomTapsStyles,
  StyledTableCell,
} from "@components/CustomTabs/styles";
import { getCommited } from "@_actions/commit_actions";

interface ITasksProps {
  value: number;
}
function Tasks({ value }: ITasksProps) {
  const dispatch = useAppDispatch();
  const classes = useCustomTapsStyles();
  const [generateHabbitList, setGenerateHabbitList] = useState<IHabbit[]>([]);
  const { habbits } = useAppSelector((state) => state.habbit);
  const { userData } = useAppSelector((state) => state.user);
  const { commited } = useAppSelector((state) => state.commit);

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === 0) {
      if (e.target.checked) {
        dispatch(handleAllChecked({ checked: true }));
      } else {
        dispatch(handleAllChecked({ checked: false }));
      }
    } else {
      if (e.target.checked) {
        dispatch(handleAllChecked({ checked: true, category: value - 1 }));
      } else {
        dispatch(handleAllChecked({ checked: false, category: value - 1 }));
      }
    }
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

  const isDisabled = useCallback(
    (_id: string) => {
      if (commited.find((item) => item.habbitId === _id)) {
        return true;
      } else {
        return false;
      }
    },
    [commited]
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
      if (userData) {
        dispatch(getCommited(userData._id));
      }
    }
  }, [dispatch, habbits, userData, value]);

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
            const isItemDisabled = isDisabled(habbit._id);

            return (
              <CustomTableRow
                key={habbit._id}
                habbit={habbit}
                isItemSelected={
                  isItemDisabled ? isItemDisabled : isItemSelected
                }
                isItemDisabled={isItemDisabled}
              />
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
