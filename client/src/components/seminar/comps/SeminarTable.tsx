/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {
    Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@material-ui/core";
import {colors} from "../../../styles/colors";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const SeminarTableComponent: React.FC = () => {
    return (
        <p css={content}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Assignments</TableCell>
                            <TableCell align="right">Attendance</TableCell>
                            <TableCell align="right">Activity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key="1">
                            <TableCell component="th" scope="row">
                                Jan Novak
                            </TableCell>
                            <TableCell align="right">
                                <CheckBoxIcon css={greenIcon}/>
                                <CheckBoxOutlineBlankIcon/>
                                <IndeterminateCheckBoxIcon css={grayIcon}/>
                            </TableCell>
                            <TableCell align="right">
                                <CheckBoxIcon css={greenIcon}/>
                                <CheckBoxOutlineBlankIcon/>
                                <CheckBoxIcon css={greenIcon}/>
                                <CheckBoxOutlineBlankIcon/>
                            </TableCell>
                            <TableCell align="right">
                                <CheckBoxIcon css={greenIcon}/>
                                <CheckBoxIcon css={greenIcon}/>
                                <CheckBoxIcon css={greenIcon}/>
                                <CheckBoxOutlineBlankIcon/>
                                <CheckBoxOutlineBlankIcon/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </p>

    );
};

const StyledSeminarTable = styled(SeminarTableComponent)``;

export const SeminarTable = (props: any) => <StyledSeminarTable {...props} />;

const greenIcon = css`
  color: ${colors.green};
`;

const grayIcon = css`
  color: ${colors.gray};
`;

const heading = css`
  margin: 20px;
`;

const content = css`
  margin: 20px;
`;
