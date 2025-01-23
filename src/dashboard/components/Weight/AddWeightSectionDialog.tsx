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
  Typography,
  Divider
} from '@mui/material';
import { useCreateSectionWeightMutation } from '../../../services/api/weightApi';

interface AddWeightSectionDialogProps {
  open: boolean;
  onClose: () => void;
  classId: number;
}

const AddWeightSectionDialog: React.FC<AddWeightSectionDialogProps> = ({
  open,
  onClose,
  classId
}) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '0'
  });
  const [error, setError] = useState<string>('');

  const [createSectionWeight, { isLoading }] = useCreateSectionWeightMutation();

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        position: '0'
      });
      setError('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('El nombre de la sección es requerido');
      return;
    }

    const position = parseInt(formData.position, 10);
    if (isNaN(position) || position < 0) {
      setError('La posición debe ser un número positivo');
      return;
    }

    try {
      const result = await createSectionWeight({
        name: formData.name.trim(),
        position: position,
        classId: classId
      }).unwrap();
      console.log(result)
      if (result.status != false) {
        onClose();
      } else {
        setError(result.message || 'Error al crear la sección de ponderación');
      }
    } catch (error: any) {
        console.log(error)
      setError(error.data?.message || 'Error al crear la sección de ponderación');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        <DialogTitle>
          Crear Nueva Sección de Ponderación
        </DialogTitle>
        
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
              placeholder="Ej: Tareas, Exámenes, Proyectos"
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

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary">
              Una sección de ponderación te permite agrupar diferentes tipos de evaluaciones
              con sus respectivos porcentajes.
            </Typography>

            <Alert severity="info" sx={{ mt: 2 }}>
              Después de crear la sección, podrás agregar los pesos específicos
              para cada tipo de evaluación.
            </Alert>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={onClose}
            disabled={isLoading}
          >
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
                Creando...
              </>
            ) : 'Crear Sección'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddWeightSectionDialog;