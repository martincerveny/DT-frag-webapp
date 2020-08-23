/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import {css, jsx} from '@emotion/core';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Badge, Button, Collapse,
    Container,
    Grid, IconButton,
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from '@material-ui/core';
import {
    useParams
} from "react-router-dom";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const AssignmentViewComponent: React.FC = () => {
    const {assignmentId} = useParams();
    const [expanded, setExpanded] = React.useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    const dataRows = [{
        name: "Jan Novak",
        date: "11.5.2020",

    },
        {
            name: "David Kakis",
            date: "2.5.2020",

        },
        {
            name: "Martin Havlik",
            date: "21.4.2020",
        }
    ];

    return (
        <div css={root}>
            <Container maxWidth="lg" css={container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Paper css={paper}>
                            <Grid container direction="column">
                                <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                                    Assignment: {assignmentId}
                                </Typography>
                                <p css={content}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                    <TableCell align="right">Test</TableCell>
                                                    <TableCell align="right">Points</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dataRows.map(d => (
                                                    <TableRow key="1">
                                                        <TableCell component="th" scope="row">
                                                            {d.name}
                                                        </TableCell>
                                                        <TableCell align="right">{d.date}</TableCell>
                                                        <TableCell align="right">
                                                            <IconButton aria-label="circle" size="small"
                                                                        onClick={handleClick}>
                                                                <RadioButtonUncheckedIcon fontSize="inherit"/>
                                                            </IconButton>
                                                            <IconButton aria-label="circle" size="small"
                                                                        onClick={handleClick}>
                                                                <FiberManualRecordIcon fontSize="small"/>
                                                            </IconButton>
                                                            <IconButton aria-label="circle" size="small"
                                                                        onClick={handleClick}>
                                                                <FiberManualRecordIcon fontSize="small"/>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="right">0</TableCell>
                                                    </TableRow>
                                                ))}
                                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                                    <TableRow>
                                                        <TableCell>Test information</TableCell>
                                                    </TableRow>
                                                </Collapse>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </p>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

const StyledAssignmentViewComponent = styled(AssignmentViewComponent)``;

export const AssignmentView = (props: any) => <StyledAssignmentViewComponent {...props} />;

const root = css`
  flex-grow: 1;
`;

const container = css`
  padding-top: 20px;
  padding-bottom: 40px;
`;

const paper = css`
  padding: 2px;
  display: flex;
  overflow: auto;
  flexdirection: column;
  height: 240;
`;

const heading = css`
  margin: 20px;
`;

const content = css`
  margin: 20px;
`;