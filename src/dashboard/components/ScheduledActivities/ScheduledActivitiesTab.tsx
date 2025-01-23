import React from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress,
  Alert,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Subject } from '../../../interfaces/subject';
import { useGetScheduledActivitiesQuery } from '../../../services/api/scheduledActivityApi';
import ScheduledActivitiesList from './ScheduledActivitiesList';

interface ScheduledActivitiesTabProps {
  subject: Subject;
}

const ScheduledActivitiesTab: React.FC<ScheduledActivitiesTabProps> = ({ subject }) => {
  const location = useLocation();
  const { classId } = location.state;

  const {
    data: scheduledActivitiesData,
    isLoading,
    error
  } = useGetScheduledActivitiesQuery({ 
    classId: classId,
    page: 1,
    limit: 100
  });
  console.log(scheduledActivitiesData);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error al cargar las actividades programadas. Por favor, intente nuevamente.
      </Alert>
    );
  }

  const sortedActivities = [...(scheduledActivitiesData?.items || [])].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Actividades Programadas
      </Typography>
      <ScheduledActivitiesList activities={sortedActivities} />
    </Box>
  );
};

export default ScheduledActivitiesTab;