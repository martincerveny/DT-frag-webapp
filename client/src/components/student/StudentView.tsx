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
} from '../../store/student/actions';
import { ActivityList } from './comps/ActivityList';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { AttendanceDetails } from './comps/AttendanceDetails';
import { t } from '../../code/helpers/translations';
import { Notepads } from '../../code/interfaces/notepads';
import { NotepadsContent } from './comps/NotepadsContent';
import { Person } from '../../code/interfaces/person';
import { Loader } from '../shared/Loader';

export interface StateProps {
  assignments: Assignment[];
  evaluations: Evaluation[];
  activity: Activity[];
  studentAttendance: StudentAttendance[];
  notepads: Notepads | undefined;
  student: Person | undefined;
}

export interface DispatchProps {
  fetchAssignments: typeof fetchAssignments;
  fetchEvaluationsByStudent: typeof fetchEvaluationsByStudent;
  fetchActivityByStudent: typeof fetchActivityByStudent;
  fetchAttendanceByStudent: typeof fetchAttendanceByStudent;
  fetchNotepadsByStudent: typeof fetchNotepadsByStudent;
  fetchStudent: typeof fetchStudent;
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
}) => {
  const { studentId } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = React.useState<StudentMenu>(StudentMenu.Assignment);

  useEffect(() => {
    fetchStudent(studentId);
  }, []);

  const handleMenuClick = (menuItem: StudentMenu) => {
    setSelectedMenuItem(menuItem);
  };

  const renderHorizontalMenu = () => {
    return (
      <Grid container direction="row">
        <Button
          variant="contained"
          color={selectedMenuItem === StudentMenu.Assignment ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(StudentMenu.Assignment)}
        >
          {t('student.assignments')}
        </Button>
        <Button
          variant="contained"
          color={selectedMenuItem === StudentMenu.ActivityList ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(StudentMenu.ActivityList)}
        >
          {t('student.activityList')}
        </Button>
        <Button
          variant="contained"
          color={selectedMenuItem === StudentMenu.Attendance ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(StudentMenu.Attendance)}
        >
          {t('student.attendanceDetails')}
        </Button>
        <Button
          variant="contained"
          color={selectedMenuItem === StudentMenu.Notepads ? 'primary' : 'default'}
          disableElevation
          css={menuButton}
          onClick={() => handleMenuClick(StudentMenu.Notepads)}
        >
          {t('student.notepads')}
        </Button>
      </Grid>
    );
  };

  const renderDataComponent = () => {
    if (selectedMenuItem === StudentMenu.Assignment) {
      return (
        <AssignmentTable
          assignments={assignments}
          fetchAssignments={fetchAssignments}
          fetchEvaluationsByStudent={fetchEvaluationsByStudent}
          evaluations={evaluations}
        />
      );
    } else if (selectedMenuItem === StudentMenu.ActivityList) {
      return <ActivityList activity={activity} fetchActivityByStudent={fetchActivityByStudent} />;
    } else if (selectedMenuItem === StudentMenu.Attendance) {
      return (
        <AttendanceDetails studentAttendance={studentAttendance} fetchAttendanceByStudent={fetchAttendanceByStudent} />
      );
    } else if (selectedMenuItem === StudentMenu.Notepads) {
      return <NotepadsContent fetchNotepadsByStudent={fetchNotepadsByStudent} notepads={notepads} />;
    }
  };

  return (
    <div css={root}>
      {student ? (
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
      ) : (
        <Loader />
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
`;
