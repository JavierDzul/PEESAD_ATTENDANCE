import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Alert,
  CircularProgress,
  Divider,
  Typography
} from '@mui/material';
import { Weight, SectionWeight, ActivityWeight } from '../../../interfaces/weight';
import { useUpdateWeightMutation, useCreateActivityWeightMutation, useGetActivityWeightsQuery, useDeleteActivityWeightMutation } from '../../../services/api/weightApi';
import { useGetScheduledActivitiesQuery } from '../../../services/api/scheduledActivityApi';
import ActivityWeightList from './ActivityWeightList';
import AddActivityWeightForm from './AddActivityWeightForm';
import { useLocation } from 'react-router-dom';
import { Subject } from '../../../interfaces/subject';

interface EditWeightDialogProps {
  open: boolean;
  onClose: () => void;
  weight: Weight | null;
  sectionWeight: SectionWeight;
}

const EditWeightDialog: React.FC<EditWeightDialogProps> = ({
  open,
  onClose,
  weight,
  sectionWeight
}) => {
  
  const location = useLocation();

  const subject = location.state as Subject;
  const [formData, setFormData] = useState({
    name: '',
    percentage: 0,
    isManual: false
  });
  const [error, setError] = useState<string>('');

  const [updateWeight, { isLoading }] = useUpdateWeightMutation();
  const [createActivityWeight] = useCreateActivityWeightMutation();
  const { data: activityWeightsData, refetch: refetchActivityWeights } = useGetActivityWeightsQuery({ scheduledActivityId: weight?.id || 0 });
  const { data: scheduledActivitiesData } = useGetScheduledActivitiesQuery({ classId: subject.classId });
  const [deleteActivityWeight] = useDeleteActivityWeightMutation();
  console.log(weight)
console.log(activityWeightsData)
  useEffect(() => {
    if (weight) {
      setFormData({
        name: weight.name,
        percentage: weight.percentage,
        isManual: weight.isManual
      });
    }
  }, [weight]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!weight) return;

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (formData.percentage <= 0 || formData.percentage > 100) {
      setError('El porcentaje debe estar entre 0 y 100');
      return;
    }

    // Calcular el total de porcentajes excluyendo el peso actual
    const otherWeightsTotal = sectionWeight.weights
      .filter(w => w.id !== weight.id)
      .reduce((sum, w) => sum + w.percentage, 0);

    // Verificar que el nuevo total no exceda 100%
    if (otherWeightsTotal + formData.percentage > 100) {
      setError('La suma total de porcentajes no puede exceder 100%');
      return;
    }

    try {
      const result = await updateWeight({
        id: weight.id,
        name: formData.name,
        percentage: formData.percentage,
        isManual: formData.isManual
      }).unwrap();

      if (result.status) {
        onClose();
      } else {
        setError(result.message || 'Error al actualizar el peso');
      }
    } catch (error: any) {
      setError(error.data?.message || 'Error al actualizar el peso');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddActivityWeight = async (scheduledActivityId: number, percentage: number) => {
    if (!weight) return;

    try {
      const result = await createActivityWeight({
        scheduledActivityId,
        weightId: weight.id,
        percentage
      }).unwrap();

      if (result.status!=false) {
        refetchActivityWeights();
      } else {
        console.log(error)

        setError(result.message || 'Error al agregar el peso de la actividad');
      }
    } catch (error: any) {
      console.log(error)
      setError(error.data?.message || 'Error al agregar el peso de la actividad');
    }
  };

  const handleDeleteActivityWeight = async (id: number) => {
    try {
      const result = await deleteActivityWeight({ id }).unwrap();
      if (result.status) {
        refetchActivityWeights();
      } else {
        setError(result.message || 'Error al eliminar el peso de la actividad');
      }
    } catch (error: any) {
      setError(error.data?.message || 'Error al eliminar el peso de la actividad');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Editar Peso</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              name="name"
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              name="percentage"
              label="Porcentaje"
              type="number"
              value={formData.percentage}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              inputProps={{
                min: 0,
                max: 100,
                step: 0.1
              }}
              helperText="Valor entre 0 y 100"
            />

            <FormControlLabel
              control={
                <Switch
                  name="isManual"
                  checked={formData.isManual}
                  onChange={handleChange}
                />
              }
              label="Calificación Manual"
              sx={{ mt: 2 }}
            />

            {formData.isManual && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Las calificaciones para este peso deberán ser ingresadas manualmente
              </Alert>
            )}

            <Divider sx={{ my: 2 }} />

            <Box>
              <Typography variant="h6">Pesos de Actividades</Typography>
              <ActivityWeightList
                activityWeights={activityWeightsData || []}
                onDelete={handleDeleteActivityWeight}
              />
            </Box>

            <AddActivityWeightForm
              scheduledActivities={scheduledActivitiesData?.items || []}
              onAdd={handleAddActivityWeight}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Actualizando...
              </>
            ) : 'Actualizar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditWeightDialog;