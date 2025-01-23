import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Chip,
  Grid
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ScheduledActivity } from '../../../interfaces/scheduled-activity';

interface ScheduledActivitiesListProps {
  activities: ScheduledActivity[];
}

export const isUpcoming = (date: string) => {
  const activityDate = new Date(date);
  const now = new Date();
  return activityDate > now;
};

export const isOngoing = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

export const getStatusChip = (startDate: string, endDate: string) => {
  if (isOngoing(startDate, endDate)) {
    return <Chip label="En curso" color="success" size="small" />;
  }
  if (isUpcoming(startDate)) {
    return <Chip label="Próxima" color="primary" size="small" />;
  }
  return <Chip label="Finalizada" color="default" size="small" />;
};

const ScheduledActivitiesList: React.FC<ScheduledActivitiesListProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No hay actividades programadas para esta materia
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2}>
      {activities.map((scheduledActivity) => (
        <Grid item xs={12} key={scheduledActivity.id}>
          <Paper 
            elevation={1}
            sx={{ 
              p: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6">
                {scheduledActivity.activity.title}
              </Typography>
              {getStatusChip(scheduledActivity.startDate, scheduledActivity.endDate)}
            </Box>

            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 2 }}
            >
              {scheduledActivity.activity.content.length > 200 
                ? `${scheduledActivity.activity.content.substring(0, 200)}...` 
                : scheduledActivity.activity.content}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">
                  Inicio: {new Date(scheduledActivity.startDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="body2">
                  Fin: {new Date(scheduledActivity.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ScheduledActivitiesList;