/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { StudentMenu } from '../../code/enums/studentMenu';
import { Assignment } from '../../code/interfaces/assignment';
import { fetchAssignments } from '../../store/assignment/actions';
import { AssignmentTable } from './comps/AssignmentTable';
import { Evaluation } from '../../code/interfaces/evaluation';
import { fetchEvaluationsByStudent } from '../../store/evaluation/actions';
import { Activity } from '../../code/interfaces/activity';
import {
  fetchActivityByStudent,
  fetchAttendanceByStudent,
  fetchNotepadsByStudent,
  fetchStudent,
  fetchSubmissionFilesByStudent,
} from '../../store/student/actions';
import { ActivityList } from './comps/ActivityList';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { AttendanceDetails } from './comps/AttendanceDetails';
import { t } from '../../code/helpers/translations';
import { Notepads } from '../../code/interfaces/notepads';
import { NotepadsContent } from './comps/NotepadsContent';
import { Person } from '../../code/interfaces/person';
import { Loader } from '../shared/Loader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GradeIcon from '@material-ui/icons/Grade';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import NoteIcon from '@material-ui/icons/Note';
import CodeIcon from '@material-ui/icons/Code';
import { SourceCode } from './comps/SourceCode';
import { StudentFile } from '../../code/interfaces/studentFile';
import { LoadingState } from '../../code/enums/loading';

export interface StateProps {
  assignments: Assignment[];
  evaluations: Evaluation[];
  activity: Activity[];
  studentAttendance: StudentAttendance[];
  notepads: Notepads | undefined;
  student: Person | undefined;
  studentFiles: StudentFile[];
  studentRequestState: LoadingState;
  evaluationsRequestState: LoadingState;
  studentActivityRequestState: LoadingState;
  studentAttendanceRequestState: LoadingState;
  studentFilesRequestState: LoadingState;
  studentNotepadsRequestState: LoadingState;
}

export interface DispatchProps {
  fetchAssignments: typeof fetchAssignments;
  fetchEvaluationsByStudent: typeof fetchEvaluationsByStudent;
  fetchActivityByStudent: typeof fetchActivityByStudent;
  fetchAttendanceByStudent: typeof fetchAttendanceByStudent;
  fetchNotepadsByStudent: typeof fetchNotepadsByStudent;
  fetchStudent: typeof fetchStudent;
  fetchSubmissionFilesByStudent: typeof fetchSubmissionFilesByStudent;
}

type StudentViewProps = DispatchProps & StateProps;

const StudentViewComponent: React.FC<StudentViewProps> = ({
  assignments,
  fetchAssignments,
  fetchEvaluationsByStudent,
  evaluations,
  activity,
  fetchActivityByStudent,
  studentAttendance,
  fetchAttendanceByStudent,
  fetchNotepadsByStudent,
  notepads,
  student,
  fetchStudent,
  studentFiles,
  fetchSubmissionFilesByStudent,
  studentRequestState,
  evaluationsRequestState,
  studentActivityRequestState,
  studentAttendanceRequestState,
  studentFilesRequestState,
  studentNotepadsRequestState,
}) => {
  const { studentId } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<StudentMenu>(StudentMenu.Assignment);

  useEffect(() => {
    fetchStudent(studentId);
    fetchAssignments();
    fetchEvaluationsByStudent(studentId);
    fetchAttendanceByStudent(studentId);
    fetchActivityByStudent(studentId);
    fetchNotepadsByStudent(studentId);
    fetchSubmissionFilesByStudent(studentId);
  }, []);

  const handleMenuClick = (menuItem: StudentMenu) => {
    setSelectedMenuItem(menuItem);
  };

  const renderHorizontalMenu = () => {
    return (
      <Grid container direction="row" justify="flex-start">
        <Grid item css={gridItemWrapper} xl={2} lg={2} md={3} sm={5}>
          <Button
            variant="contained"
            color={selectedMenuItem === StudentMenu.Assignment ? 'primary' : 'default'}
            disableElevation
            css={menuButton}
            onClick={() => handleMenuClick(StudentMenu.Assignment)}
          >
            <AssignmentIcon css={icon} />
            {t('student.assignments')}
          </Button>
        </Grid>
        <Grid item css={gridItemWrapper} xl={2} lg={2} md={3} sm={5}>
          <Button
            variant="contained"
            color={selectedMenuItem === StudentMenu.ActivityList ? 'primary' : 'default'}
            disableElevation
            css={menuButton}
            onClick={() => handleMenuClick(StudentMenu.ActivityList)}
          >
            <GradeIcon css={icon} />
            {t('student.activityList')}
          </Button>
        </Grid>
        <Grid item css={gridItemWrapper} xl={2} lg={2} md={3} sm={5}>
          <Button
            variant="contained"
            color={selectedMenuItem === StudentMenu.Attendance ? 'primary' : 'default'}
            disableElevation
            css={menuButton}
            onClick={() => handleMenuClick(StudentMenu.Attendance)}
          >
            <EventAvailableIcon css={icon} />
            {t('student.attendance')}
          </Button>
        </Grid>
        <Grid item css={gridItemWrapper} xl={2} lg={2} md={3} sm={5}>
          <Button
            variant="contained"
            color={selectedMenuItem === StudentMenu.Notepads ? 'primary' : 'default'}
            disableElevation
            css={menuButton}
            onClick={() => handleMenuClick(StudentMenu.Notepads)}
          >
            <NoteIcon css={icon} />
            {t('student.notepads')}
          </Button>
        </Grid>
        <Grid item css={gridItemWrapper} xl={2} lg={2} md={3} sm={5}>
          <Button
            variant="contained"
            color={selectedMenuItem === StudentMenu.SourceCode ? 'primary' : 'default'}
            disableElevation
            css={menuButton}
            onClick={() => handleMenuClick(StudentMenu.SourceCode)}
          >
            <CodeIcon css={icon} />
            {t('student.sourceCode')}
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderDataComponent = () => {
    if (selectedMenuItem === StudentMenu.Assignment) {
      return (
        <AssignmentTable
          assignments={assignments}
          evaluations={evaluations}
          evaluationsRequestState={evaluationsRequestState}
        />
      );
    } else if (selectedMenuItem === StudentMenu.ActivityList) {
      return <ActivityList activity={activity} studentActivityRequestState={studentActivityRequestState} />;
    } else if (selectedMenuItem === StudentMenu.Attendance) {
      return (
        <AttendanceDetails
          studentAttendance={studentAttendance}
          studentAttendanceRequestState={studentAttendanceRequestState}
        />
      );
    } else if (selectedMenuItem === StudentMenu.Notepads) {
      return <NotepadsContent notepads={notepads} studentNotepadsRequestState={studentNotepadsRequestState} />;
    } else if (selectedMenuItem === StudentMenu.SourceCode) {
      return <SourceCode studentFiles={studentFiles} studentFilesRequestState={studentFilesRequestState} />;
    }
  };

  return (
    <div css={root}>
      {studentRequestState === LoadingState.Loading ? (
        <Loader />
      ) : (
        student && (
          <Container maxWidth="lg" css={container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper css={paper}>
                  <Grid container direction="column">
                    <Typography component="h2" variant="h6" color="primary" gutterBottom css={heading}>
                      {t('student.student')}: {student.name} ({student.login})
                    </Typography>
                    {renderHorizontalMenu()}
                    {renderDataComponent()}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )
      )}
    </div>
  );
};

const StyledStudentViewComponent = styled(StudentViewComponent)``;

export const StudentView = (props: any) => <StyledStudentViewComponent {...props} />;

const root = css`
  flex-grow: 1;
`;

const container = css`
  padding-top: 20px;
  padding-bottom: 40px;
`;

const gridItemWrapper = css`
  margin: 2px;
`;

const paper = css`
  padding: 2px;
  display: flex;
  overflow: auto;
  flex-direction: column;
  height: 240;
`;

const heading = css`
  margin: 20px;
`;

const menuButton = css`
  margin-left: 20px;
  width: 190px;
`;

const icon = css`
  margin-right: 10px;
`;
