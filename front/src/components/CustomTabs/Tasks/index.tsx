import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Checkbox,
} from "@material-ui/core";
import React, { useState } from "react";
import dayjs from "dayjs";
import { IData } from "./data";
import { useTasksStyles, StyledTableCell } from "./styles";

interface TasksProps {
  data: IData[];
}
function Tasks({ data }: TasksProps) {
  const classes = useTasksStyles();
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const newSelecteds = data.map((n) => n._id);
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  if (data) {
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={
                  selected.length > 0 && selected.length < data.length
                }
                checked={data.length > 0 && selected.length === data.length}
                onChange={handleSelectAllClick}
              />
            </StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Count</StyledTableCell>
            <StyledTableCell align="right">NextDate</StyledTableCell>
            <StyledTableCell align="right">ExpiredDate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const isItemSelected = isSelected(row._id);
            return (
              <TableRow
                key={row._id}
                hover
                onClick={(e) => handleClick(e, row._id)}
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
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.count}</StyledTableCell>
                <StyledTableCell align="right">
                  {dayjs(row.nextDate).format("YY-MM-DD")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dayjs(row.expiredDate).format("YY-MM-DD")}
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
