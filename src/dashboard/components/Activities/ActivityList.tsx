import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper,
  Divider,
  Tooltip,
  Chip,
  Button
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Activity } from '../../../interfaces/activity';
import { ScheduledActivity } from '../../../interfaces/scheduled-activity';

interface ActivityListProps {
  activities: Activity[];
  scheduledActivities: ScheduledActivity[];
  subjectId: number;
  sectionId: number;
}

const ActivityList: React.FC<ActivityListProps> = ({ 
  activities, 
  scheduledActivities, 
  subjectId, 
  sectionId 
}) => {
  const location = useLocation();
  const {classId} = location.state;
  const navigate = useNavigate();
  console.log(scheduledActivities)
  const isActivityScheduled = (activityId: number) => {
    return scheduledActivities.some(sa => sa.activity.id === activityId);
  };  

  const getScheduleInfo = (activityId: number) => {
    const schedule = scheduledActivities.find(sa => sa.activity.id=== activityId);
    if (schedule) {
      return {
        startDate: new Date(schedule.startDate).toLocaleDateString(),
        endDate: new Date(schedule.endDate).toLocaleDateString()
      };
    }
    return null;
  };
  const truncateHtmlContent = (htmlContent:string, maxLength = 150) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    let text = div.textContent || div.innerText || '';
  if (text.length > maxLength) {
        text = text.substring(0, maxLength) + '...';
    }
    
    return text;
};
  return (
    <>  
      {activities.map((activity, index) => {
        const scheduled = isActivityScheduled(activity.id);
        const scheduleInfo = getScheduleInfo(activity.id);
        return (
          <Paper 
            key={activity.id} 

            elevation={1} 
            sx={{ 
              p: 2, 
              mb: index !== activities.length - 1 ? 2 : 0,
              opacity: scheduled ? 0.8 : 1,
              '&:hover': {
                backgroundColor: 'action.hover',
                opacity: 1
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight="bold" 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/subjects/${subjectId}/activities/${activity.id}`)}
                  
                >
                  {activity.title}
                </Typography>
                <Typography 
    variant="body2" 
    color="text.secondary"
    sx={{ mt: 1 }}
>
    {truncateHtmlContent(activity.content)}
</Typography>
              </Box>
              <Box sx={{ ml: 2 }}>
                
                {scheduled ? (
                  <Tooltip title={`Programada: ${scheduleInfo?.startDate} - ${scheduleInfo?.endDate}`}>
                    <Chip
                      icon={<EventNoteIcon />}
                      label="Programada"
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Tooltip>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CalendarTodayIcon />}
                    onClick={() => navigate(`/subjects/${subjectId}/activities/${activity.id}/schedule`,{
                      state: {
                        classId
                    }
                    })}
                  >
                    Programar
                  </Button>
                )}
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Creado: {new Date(activity.createdAt).toLocaleDateString()}
                </Typography>
                {' • '}
                <Typography variant="caption" color="text.secondary">
                  Última actualización: {new Date(activity.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        );
      })}
    </>
  );
};

export default ActivityList;