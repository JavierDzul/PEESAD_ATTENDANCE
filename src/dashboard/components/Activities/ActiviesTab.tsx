import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Subject } from '../../../interfaces/subject';
import ActivityList from './ActivityList';
import { useGetScheduledActivitiesQuery } from '../../../services/api/scheduledActivityApi';

interface ActivitiesTabProps {
  subject: Subject; 
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ subject }) => {
  const location = useLocation();
  const { classId } = location.state;

  // Obtener scheduled activities
  const { 
    data: scheduledActivitiesData, 
    isLoading: isLoadingScheduled, 
    error: scheduledActivitiesError 
  } = useGetScheduledActivitiesQuery({ 
    classId: classId, 
    page: 1,
    limit: 100 
  });

  if (isLoadingScheduled) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (scheduledActivitiesError) {
    return (
      <Alert severity="error">
        Error al cargar las actividades programadas. Por favor, intente nuevamente.
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

      {scheduledActivitiesData?.sections.length > 0 ? (
        scheduledActivitiesData.sections.map(({ section, activities }) => (
          <Accordion key={section.id} defaultExpanded sx={{ mb: 2 }}>
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
              <Typography variant="h6">{section.name}</Typography>
              <Typography 
                variant="subtitle2" 
                color="text.secondary"
              >
                ({activities.length} actividades)
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ActivityList 
                activities={activities.map(activity => activity.activity)}
                scheduledActivities={activities}
                subjectId={subject.id!}
                sectionId={section.id}
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