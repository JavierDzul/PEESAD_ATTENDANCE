import React from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  Button,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Subject } from '../../../interfaces/subject';
import { useGetSectionWeightsQuery } from '../../../services/api/weightApi';
import WeightSectionList from './WeightSectionList';
import AddWeightSectionDialog from './AddWeightSectionDialog';
import { useLocation } from 'react-router-dom';

interface WeightsTabProps {
  subject: Subject;
}

const WeightsTab: React.FC<WeightsTabProps> = ({ subject }) => {
  const location = useLocation();
  const { classId } = location.state;
  console.log(classId)
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const { 
    data: sectionWeightsData, 
    isLoading, 
    error 
  } = useGetSectionWeightsQuery({ 
    classId,
    page: 1,
    limit: 100
  });
  console.log(sectionWeightsData)
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error al cargar las ponderaciones. Por favor, intente nuevamente.
      </Alert>
    );
  }

  const totalSections = sectionWeightsData?.length || 0;

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5" component="h2">
          Ponderaciones
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsAddDialogOpen(true)}
        >
          Agregar Sección
        </Button>
      </Box>

      {totalSections === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No hay secciones de ponderación configuradas
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{ mt: 2 }}
          >
            Crear Primera Sección
          </Button>
        </Paper>
      ) : (
        <WeightSectionList 
          sections={sectionWeightsData || []}
          classId={classId}
        />
      )}

      <AddWeightSectionDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        classId={classId}
      />
    </Box>
  );
};

export default WeightsTab;