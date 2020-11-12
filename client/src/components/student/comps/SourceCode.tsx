/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import { useParams } from 'react-router';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  IconButton,
} from '@material-ui/core';
import { fetchSubmissionFilesByStudent } from '../../../store/student/actions';
import { StudentFile } from '../../../code/interfaces/studentFile';
import { getFileExtension, removeArrayDuplicatesByProp } from '../../../code/helpers/helpers';
import { t } from '../../../code/helpers/translations';
import { colors } from '../../../styles/colors';
import CloseIcon from '@material-ui/icons/Close';
import Highlight from 'react-highlight.js';

interface SourceCodeProps {
  fetchSubmissionFilesByStudent: typeof fetchSubmissionFilesByStudent;
  studentFiles: StudentFile[];
}

const SourceCodeComponent: React.FC<SourceCodeProps> = ({ studentFiles, fetchSubmissionFilesByStudent }) => {
  const { studentId } = useParams();
  const assignments = removeArrayDuplicatesByProp(studentFiles, ['assignment_id']);
  const [fileName, setFileName] = React.useState<string>('');
  const [data, setData] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = (name: string, data: string) => {
    setFileName(name);
    setData(data);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchSubmissionFilesByStudent(studentId);
  }, []);

  return (
    <div css={content}>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        {assignments.map((a: StudentFile, assignmentIndex: number) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12} key={assignmentIndex}>
              <List>
                <Typography variant="h6" color="primary">
                  {t('student.assignment')}: {a.assignment_name}
                </Typography>
                {studentFiles.map((sf: StudentFile, sfIndex) => {
                  if (sf.assignment_id === a.assignment_id) {
                    return (
                      <ListItem key={sfIndex}>
                        <Button
                          size="small"
                          variant="text"
                          css={fileButton}
                          onClick={() => handleOpenDialog(sf.name, sf.data)}
                        >
                          <ListItemText primary={sf.name} />
                        </Button>
                      </ListItem>
                    );
                  }
                })}
              </List>
            </Grid>
          );
        })}
        <div>
          <Dialog
            onClose={handleCloseDialog}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle>
              <Grid container direction="row" alignItems="center" justify="space-between">
                {fileName}
                <IconButton aria-label="close" onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </DialogTitle>
            <DialogContent dividers>
              <Highlight language={getFileExtension(fileName)}>
                <pre css={dataWrapper}>{data}</pre>
              </Highlight>
            </DialogContent>
          </Dialog>
        </div>
      </Grid>
    </div>
  );
};

const StyledSourceCodeComponent = styled(SourceCodeComponent)``;

export const SourceCode = (props: any) => <StyledSourceCodeComponent {...props} />;

const content = css`
  margin: 30px 20px;
`;

const fileButton = css`
  color: ${colors.black};
  text-transform: none;
`;

const dataWrapper = css`
  font-size: 13px;
`;
