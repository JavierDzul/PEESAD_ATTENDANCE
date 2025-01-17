// ActivityPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useGetActivityQuery } from '../../../services/api/activityApi';

const ActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: activityData, isLoading, error } = useGetActivityQuery(parseInt(id!));

  // Inicializar el formulario cuando se cargan los datos
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error al cargar la actividad. Por favor, intente nuevamente.
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 3,
        gap: 2
      }}>
        <Tooltip title="Volver">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
  </Box>

      {/* Content */}
      <Paper sx={{ p: 3 }}>
           <Box>
            <Typography variant="h5" gutterBottom>
              {activityData?.data.title}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <div dangerouslySetInnerHTML={{ __html: activityData?.data.content || '' }} />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 2,
              color: 'text.secondary'
            }}>
              <Typography variant="body2">
                Creado: {new Date(activityData?.data.createdAt!).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Última actualización: {new Date(activityData?.data.updatedAt!).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        
      </Paper>
    </Box>
  );
};

export default ActivityPage;