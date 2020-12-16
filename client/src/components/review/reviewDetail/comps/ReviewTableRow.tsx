/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/core';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { t } from '../../../../code/helpers/translations';
import { colors } from '../../../../styles/colors';
import CloseIcon from '@material-ui/icons/Close';
import Highlight from 'react-highlight.js';
import { getFileExtension } from '../../../../code/helpers/helpers';

interface ReviewTableRowProps {
  file: string;
  line: number;
  note: string;
  data: string;
  rowIndex: number;
  selectedRowIndex: number | null;
  handleClick: (rowIndex: number | null, note: string) => void;
}

const ReviewTableRowComponent: React.FC<ReviewTableRowProps> = ({
  file,
  line,
  note,
  rowIndex,
  selectedRowIndex,
  handleClick,
  data,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const renderDialogWindow = (
    <Dialog onClose={handleCloseDialog} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth="xl">
      <DialogTitle>
        <Grid container direction="row" alignItems="center" justify="space-between">
          {file}
          <IconButton aria-label="close" onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent dividers>
        <Highlight language={getFileExtension(file)}>
          <pre css={dataWrapper}>{data}</pre>
        </Highlight>
      </DialogContent>
    </Dialog>
  );

  return (
    <React.Fragment key={rowIndex}>
      <TableRow>
        <TableCell component="th" scope="row">
          <Button size="small" variant="text" css={fileButton} onClick={() => handleOpenDialog()}>
            {file}
          </Button>
        </TableCell>
        <TableCell component="th" scope="row">
          {line}
        </TableCell>
        <TableCell align="left">
          <Button
            aria-label="circle"
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleClick(rowIndex, note)}
          >
            {selectedRowIndex === rowIndex ? t('app.hide') : t('app.show')}
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell css={contentCellWrapper} colSpan={3}>
          <Collapse in={rowIndex === selectedRowIndex} timeout="auto" unmountOnExit css={collapseWrapper}>
            <Box css={contentBoxWrapper}>
              <div css={noteWrapper}>
                <pre>{note}</pre>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {renderDialogWindow}
    </React.Fragment>
  );
};

const StyledReviewTableRowComponent = styled(ReviewTableRowComponent)``;

export const ReviewTableRow = (props: any) => <StyledReviewTableRowComponent {...props} />;

const noteWrapper = css`
  margin-top: 20px;
  font-size: 13px;
`;

const contentCellWrapper = css`
  padding-top: 0px;
  padding-bottom: 0px;
  border: none;
`;

const contentBoxWrapper = css`
  padding: 10px;
  border: dashed 1px ${colors.blue};
`;

const collapseWrapper = css`
  margin-top: 10px;
  height: 40px;
`;

const fileButton = css`
  color: ${colors.black};
  text-transform: none;
`;

const dataWrapper = css`
  font-size: 13px;
`;
