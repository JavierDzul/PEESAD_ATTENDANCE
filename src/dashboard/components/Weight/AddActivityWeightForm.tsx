import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ScheduledActivity } from '../../../interfaces/scheduled-activity';

interface AddActivityWeightFormProps {
  scheduledActivities: ScheduledActivity[];
  onAdd: (scheduledActivityId: number, percentage: number) => void;
}

const AddActivityWeightForm: React.FC<AddActivityWeightFormProps> = ({ scheduledActivities, onAdd }) => {
  const [formData, setFormData] = useState({ scheduledActivityId: '', percentage: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const scheduledActivityId = parseInt(formData.scheduledActivityId, 10);
    const percentage = parseFloat(formData.percentage);
    if (scheduledActivityId && percentage > 0 && percentage <= 100) {
      onAdd(scheduledActivityId, percentage);
      setFormData({ scheduledActivityId: '', percentage: '' });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Agregar Peso de Actividad</Typography>
      <TextField
        select
        name="scheduledActivityId"
        label="Actividad Programada"
        value={formData.scheduledActivityId}
        onChange={handleChange}
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
      >
        <option value="">Seleccione una actividad</option>
        {scheduledActivities.map((activity: any) => (
          <option key={activity.id} value={activity.id}>
            {activity.activity.title}
          </option>
        ))}
      </TextField>

      <TextField
        name="percentage"
        label="Porcentaje"
        type="number"
        value={formData.percentage}
        onChange={handleChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 100, step: 0.1 }}
        helperText="Valor entre 0 y 100"
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!formData.scheduledActivityId || !formData.percentage}
        sx={{ mt: 2 }}
      >
        Agregar Peso de Actividad
      </Button>
    </Box>
  );
};

export default AddActivityWeightForm;