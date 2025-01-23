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
  CircularProgress
} from '@mui/material';
import { Weight, SectionWeight } from '../../../interfaces/weight';
import { useUpdateWeightMutation } from '../../../services/api/weightApi';

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
  const [formData, setFormData] = useState({
    name: '',
    percentage: 0,
    isManual: false
  });
  const [error, setError] = useState<string>('');

  const [updateWeight, { isLoading }] = useUpdateWeightMutation();

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

      if (result.status!=false) {
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