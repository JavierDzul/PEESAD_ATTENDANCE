import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Subject } from '../../../interfaces/subject';
import ActivityList from './ActivityList';
import { useGetActivitiesBySubjectQuery } from '../../../services/api/courseSection';
import { useGetScheduledActivitiesQuery } from '../../../services/api/scheduledActivityApi';

interface ActivitiesTabProps {
  subject: Subject; 
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ subject }) => {
  const location = useLocation();
  const {classId} = location.state;

  const { 
    data: activitiesData, 
    isLoading: isLoadingActivities, 
    error: activitiesError 
  } = useGetActivitiesBySubjectQuery({
    subjectId: subject.id!
  });

  // Obtener scheduled activities
  const {
    data: scheduledActivitiesData,
    isLoading: isLoadingScheduled
  } = useGetScheduledActivitiesQuery({ 
    classId: classId, 
    page: 1,
    limit: 100 
  });
console.log(scheduledActivitiesData)
  const groupedData = React.useMemo(() => {
    if (!activitiesData?.data) return [];
    
    const sectionsMap = new Map();
    
    activitiesData.data.forEach(activity => {
      if (!sectionsMap.has(activity.section.id)) {
        sectionsMap.set(activity.section.id, {
          sectionId: activity.section.id,
          sectionName: activity.section.name,
          activities: []
        });
      }
      
      if (activity.title) {
        sectionsMap.get(activity.section.id).activities.push(activity);
      }
    });
    
    return Array.from(sectionsMap.values());
  }, [activitiesData]);

  if (isLoadingActivities || isLoadingScheduled) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (activitiesError) {
    return (
      <Alert severity="error">
        Error al cargar las actividades. Por favor, intente nuevamente.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5" component="h2">
          Actividades de {subject.name}
        </Typography>
      </Box>

      {groupedData.length > 0 ? (
        groupedData.map(({ sectionId, sectionName, activities }) => (
          <Accordion key={sectionId} defaultExpanded sx={{ mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              position: 'relative'
            }}>
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  flexGrow: 1,
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                  }
                }}
              >
                <Typography variant="h6">{sectionName}</Typography>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary"
                >
                  ({activities.length} actividades)
                </Typography>
              </AccordionSummary>
              <Box sx={{ 
                position: 'absolute',
                right: '48px',
                zIndex: 1
              }}>
              </Box>
            </Box>
            <AccordionDetails>
              <ActivityList 
                activities={activities}
                scheduledActivities={scheduledActivitiesData?.items || []}
                subjectId={subject.id!}
                sectionId={sectionId}
              />
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No hay secciones con actividades para esta materia
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ActivitiesTab;