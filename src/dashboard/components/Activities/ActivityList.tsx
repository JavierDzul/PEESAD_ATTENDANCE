// src/components/ActivityList.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { useAddScheduledActivityMutation } from '../../../services/api/scheduledActivityApi';

interface ActivityListProps {
  activities: any[];
  subjectId: number;
  sectionId: number;
}

const ActivityList: React.FC<ActivityListProps> = ({ activities, subjectId, sectionId }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [addScheduledActivity, { isLoading }] = useAddScheduledActivityMutation();

  const handleOpenDialog = (activityId: number) => {
    setCurrentActivityId(activityId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentActivityId(null);
    setStartDate(null);
    setEndDate(null);
    setError(null);
  };

  const handleSave = async () => {
    if (!startDate || !endDate || !currentActivityId) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await addScheduledActivity({
        classId: subjectId, // Assuming classId is same as subjectId, adjust as necessary
        activityId: currentActivityId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }).unwrap();
      handleCloseDialog();
    } catch (err) {
      setError('Error al programar la actividad. Inténtalo de nuevo.');
    }
  };

  if (activities.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography color="text.secondary" gutterBottom>
          No hay actividades en esta sección.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {activities.map((activity, index) => (
        <Paper 
          key={activity.id} 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: index !== activities.length - 1 ? 2 : 0,
            '&:hover': {
              backgroundColor: 'action.hover',
              cursor: 'pointer'
            }
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" onClick={() => navigate(`/subjects/${subjectId}/activities/${activity.id}`)}>
            {activity.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mt: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            dangerouslySetInnerHTML={{ __html: activity.content }}
          />
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
              <Typography variant="caption" color="text.secondary">
                Última actualización: {new Date(activity.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Button variant="contained" size="small" onClick={() => handleOpenDialog(activity.id)}>
              Programar actividad
            </Button>
          </Box>
        </Paper>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Programar Actividad</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <DatePicker
              label="Fecha de Inicio"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DatePicker
              label="Fecha de Fin"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={isLoading}>Cancelar</Button>
          <Button onClick={handleSave} disabled={isLoading}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActivityList;