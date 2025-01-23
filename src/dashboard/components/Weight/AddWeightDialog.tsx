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
  Typography,
  LinearProgress
} from '@mui/material';
import { SectionWeight } from '../../../interfaces/weight';
import { useCreateWeightMutation } from '../../../services/api/weightApi';

interface AddWeightDialogProps {
  open: boolean;
  onClose: () => void;
  section: SectionWeight | null;
}

const AddWeightDialog: React.FC<AddWeightDialogProps> = ({
  open,
  onClose,
  section
}) => {
  const [formData, setFormData] = useState({
    name: '',
    percentage: '',
    isManual: false
  });
  const [error, setError] = useState<string>('');

  const [createWeight, { isLoading }] = useCreateWeightMutation();

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        percentage: '',
        isManual: false
      });
      setError('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!section) return;

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    const percentage = parseFloat(formData.percentage);
    if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
      setError('El porcentaje debe ser un número entre 0 y 100');
      return;
    }

    // Calcular el total de porcentajes actual
    const currentTotal = section.weights.reduce(
      (sum, weight) => sum + weight.percentage,
      0
    );

    // Verificar que el nuevo total no exceda 100%
    if (currentTotal + percentage > 100) {
      setError(`El porcentaje máximo disponible es ${(100 - currentTotal).toFixed(1)}%`);
      return;
    }

    try {
      const result = await createWeight({
        name: formData.name.trim(),
        percentage: percentage,
        sectionWeightId: section.id,
        isManual: formData.isManual
      }).unwrap();

      if (result.status!=false) {
        onClose();
      } else {
        setError(result.message || 'Error al crear el peso');
      }
    } catch (error: any) {
      setError(error.data?.message || 'Error al crear el peso');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Calcular el porcentaje total actual y disponible
  const currentTotal = section?.weights.reduce(
    (sum, weight) => sum + weight.percentage,
    0
  ) || 0;
  const availablePercentage = 100 - currentTotal;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Agregar Nuevo Peso</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Porcentaje Actual de la Sección
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={currentTotal} 
                color={currentTotal > 100 ? "error" : "primary"}
                sx={{ mb: 1 }}
              />
              <Typography variant="caption" color="text.secondary">
                Porcentaje disponible: {availablePercentage.toFixed(1)}%
              </Typography>
            </Box>

            <TextField
              name="name"
              label="Nombre del Peso"
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
                max: availablePercentage,
                step: 0.1
              }}
              helperText={`Valor máximo permitido: ${availablePercentage.toFixed(1)}%`}
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
            disabled={isLoading || availablePercentage <= 0}
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Creando...
              </>
            ) : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddWeightDialog;