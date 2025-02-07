// pages/Classes/ClassesPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Grid,
  IconButton,
  Tooltip,
  Pagination
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  CalendarToday as CalendarIcon,
  Book as BookIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetClassesByTeacherIdStudentsQuery } from '../../../services/api/classApi';

const ITEMS_PER_PAGE = 6; // Número de clases por página

const ClassesPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  
  // Obtener el ID del profesor del localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const teacherId = user?.id;

  const { data: classesData, isLoading, error } = useGetClassesByTeacherIdStudentsQuery({
    teacherId,
    page,
    pageSize: ITEMS_PER_PAGE,
    isActive: true
  });
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        Error al cargar las clases. Por favor, intente nuevamente.
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Clases
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Profesor: {user?.name} {user?.lastName} {user?.motherLastName}
        </Typography>
      </Box>

      {/* Classes Grid */}
      <Grid container spacing={3}>
        {classesData?.data.map((classItem) => (
          <Grid item xs={12} sm={6} md={4} key={classItem.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[4]
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6" component="h2">
                    {classItem.subject.name}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Chip 
                    label={classItem.isCurrent ? 'Activo' : 'Inactivo'}
                    color={classItem.isCurrent ? 'success' : 'default'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {classItem.semester && (
                    <Chip 
                      label={`Semestre ${classItem.semester}`}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" />
                      {classItem.students?.length || 0} estudiantes
                    </Box>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" />
                      Periodo: {classItem.period?.name || 'No asignado'}
                    </Box>
                  </Typography>
                  {classItem.subperiod && (
                    <Typography variant="body2" color="text.secondary">
                      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ScheduleIcon fontSize="small" />
                        Subperiodo: {classItem.subperiod.name}
                      </Box>
                    </Typography>
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/classes/${classItem.id}`)}
                    startIcon={<PersonIcon />}
                >
                    Ver Detalles
                </Button>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/classes/${classItem.id}/attendance`)}
                    startIcon={<CalendarIcon />}
                >
                    Ver Asistencia
                </Button>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/teaching-material/${classItem}`, {
                    state: {
                        id: classItem.subject.id,
                        name: classItem.subject.name,
                        clave: classItem.subject.clave,
                        classId: classItem.id
                    }
                    })}
                    startIcon={<BookIcon />}
                >
                    Material Didáctico
                </Button>
                </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {classesData && classesData.total > ITEMS_PER_PAGE && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination 
            count={Math.ceil(classesData.total / ITEMS_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Empty State */}
      {classesData?.data.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No hay clases asignadas actualmente.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ClassesPage;