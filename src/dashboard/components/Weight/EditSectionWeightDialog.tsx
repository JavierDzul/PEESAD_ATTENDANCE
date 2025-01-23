import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import { SectionWeight } from '../../../interfaces/weight';
import { useUpdateSectionWeightMutation } from '../../../services/api/weightApi';

interface EditSectionWeightDialogProps {
  open: boolean;
  onClose: () => void;
  section: SectionWeight | null;
}

const EditSectionWeightDialog: React.FC<EditSectionWeightDialogProps> = ({
  open,
  onClose,
  section
}) => {
  const [formData, setFormData] = useState({
    name: '',
    position: 0
  });
  const [error, setError] = useState<string>('');

  const [updateSectionWeight, { isLoading }] = useUpdateSectionWeightMutation();

  useEffect(() => {
    if (section) {
      setFormData({
        name: section.name,
        position: section.position
      });
    }
  }, [section]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!section) return;

    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      const result = await updateSectionWeight({
        id: section.id,
        name: formData.name.trim(),
        position: formData.position
      }).unwrap();

      if (result.status!=false) {
        onClose();
      } else {
        setError(result.message || 'Error al actualizar la sección');
      }
    } catch (error: any) {
      setError(error.data?.message || 'Error al actualizar la sección');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'position' ? parseInt(value, 10) : value
    }));
  };

  // Calcular el total de porcentajes en la sección
  const totalPercentage = section?.weights?.reduce(
    (sum, weight) => sum + weight.percentage, 
    0
  ) || 0;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Editar Sección de Ponderación</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              name="name"
              label="Nombre de la Sección"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              name="position"
              label="Posición"
              type="number"
              value={formData.position}
              onChange={handleChange}
              fullWidth
              margin="normal"
              inputProps={{
                min: 0,
                step: 1
              }}
              helperText="Orden de aparición (0 es el primero)"
            />

            {section && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Información de la Sección
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pesos configurados: {section.weights?.length || 0}
                </Typography>
                <Typography 
                  variant="body2" 
                  color={totalPercentage > 100 ? "error" : "text.secondary"}
                >
                  Porcentaje total: {totalPercentage}%
                </Typography>
                {totalPercentage > 100 && (
                  <Alert severity="warning" sx={{ mt: 1 }}>
                    El porcentaje total excede el 100%
                  </Alert>
                )}
              </Box>
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

export default EditSectionWeightDialog;