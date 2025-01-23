import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert,
  CircularProgress,
  Container
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { useAddScheduledActivityMutation } from '../../../services/api/scheduledActivityApi';
import { useGetActivityQuery } from '../../../services/api/activityApi';

const CreateScheduleActivityPage: React.FC = () => {
    const location = useLocation();
    const {classId} = location.state;
  const { subjectId, activityId } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [error, setError] = useState<string>('');

  const { data: activity, isLoading } = useGetActivityQuery( 
     Number(activityId)
  );

  const [scheduleActivity, { isLoading: isScheduling }] = useAddScheduledActivityMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!startDate || !endDate) {
      setError('Por favor, seleccione las fechas de inicio y fin');
      return;
    }

    if (startDate >= endDate) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }

    try {
      await scheduleActivity({
        classId: Number(classId),
        activityId: Number(activityId),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }).unwrap();

      navigate(-1);
    } catch (error: any) {
        console.log(error)
      setError(error.data?.message || 'Error al programar la actividad');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Programar Actividad
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {activity?.data.title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <Box sx={{ my: 3 }}>
              <DateTimePicker
                label="Fecha de inicio"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </Box>
            <Box sx={{ my: 3 }}>
              <DateTimePicker
                label="Fecha de fin"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal'
                  }
                }}
              />
            </Box>
          </LocalizationProvider>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isScheduling}
            >
              {isScheduling ? 'Programando...' : 'Programar Actividad'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateScheduleActivityPage;