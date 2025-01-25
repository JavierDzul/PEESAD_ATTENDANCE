import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useGetScheduledActivityQuery } from '../../../services/api/scheduledActivityApi';

const ScheduledActivityDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: scheduledActivity, isLoading, error } = useGetScheduledActivityQuery({ id: parseInt(id as string, 10) });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Error al cargar la actividad programada.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {scheduledActivity?.activity.title}
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de la Actividad Programada
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          <span dangerouslySetInnerHTML={{ __html: scheduledActivity?.activity.content }} />
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">
              Inicio: {new Date(scheduledActivity?.startDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">
              Fin: {new Date(scheduledActivity?.endDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScheduledActivityDetailsPage;