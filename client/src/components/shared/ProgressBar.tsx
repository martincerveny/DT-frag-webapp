import { Box, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';
import { t } from '../../code/translations';

interface ProgressBarProps {
  points: number;
  maxPoints: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ points, maxPoints }) => {
  const progress = (points / maxPoints) * 100;
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${points} / ${maxPoints} ${t(
          'progressBar.pts',
        )}`}</Typography>
      </Box>
    </Box>
  );
};
