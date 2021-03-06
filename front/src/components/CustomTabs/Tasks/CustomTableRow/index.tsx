import React, { useMemo } from "react";
import { TableRow, Checkbox } from "@material-ui/core";
import dayjs from "dayjs";
import { useAppDispatch } from "@store/hooks";
import { IHabbit } from "@typings/db";
import { handleCheckedState } from "@_reducers/habbitSlice";
import {
  useCustomTapsStyles,
  StyledTableCell,
} from "@components/CustomTabs/styles";
import { occurError } from "@_reducers/alertSlice";

interface ICustomTableRowProps {
  habbit: IHabbit;
  isItemSelected: boolean;
  isItemDisabled: boolean;
}

const parsingNextDate = (arr: boolean[], dayOfWeek: number): string => {
  let i = dayOfWeek + 1;
  let count = 0;

  for (i; i < arr.length; i++) {
    count++;
    if (i + 1 === arr.length) {
      i = 0;
    }
    if (arr[i] === true) {
      break;
    }
    if (i === arr.length) {
      i = -1;
    }
  }
  return dayjs().add(count, "day").format("YYYY-MM-DD");
};

function CustomTableRow({
  habbit,
  isItemSelected,
  isItemDisabled,
}: ICustomTableRowProps) {
  const classes = useCustomTapsStyles();
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<unknown>, _id: string) => {
    if (isItemDisabled) {
      dispatch(
        occurError("이미 commit된 습관입니다. commit버튼을 눌러서 수정해주세요")
      );
      return;
    }
    dispatch(handleCheckedState(_id));
  };
  const nextDate = useMemo(
    () => parsingNextDate(habbit.schedule, dayjs().day()),
    [habbit.schedule]
  );

  return (
    <TableRow
      hover
      onClick={(e) => handleClick(e, habbit._id)}
      role="checkbox"
      aria-checked={isItemSelected}
      selected={isItemSelected}
    >
      <StyledTableCell padding="checkbox">
        <Checkbox checked={isItemSelected} disabled={isItemDisabled} />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {habbit.title}
      </StyledTableCell>
      <StyledTableCell align="right">
        {dayjs(nextDate) < dayjs(habbit.expiredDate) ? nextDate : "당일"}
      </StyledTableCell>
      <StyledTableCell align="right">
        {dayjs(habbit.expiredDate).format("YY-MM-DD")}
      </StyledTableCell>
    </TableRow>
  );
}

export default React.memo(CustomTableRow);
