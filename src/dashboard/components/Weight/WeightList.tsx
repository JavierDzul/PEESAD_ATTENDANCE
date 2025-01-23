import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Weight, SectionWeight } from '../../../interfaces/weight';
import EditWeightDialog from './EditWeightDialog';

interface WeightListProps {
  weights: Weight[];
  sectionWeight: SectionWeight;
}

const WeightList: React.FC<WeightListProps> = ({ weights, sectionWeight }) => {
  const [editWeight, setEditWeight] = React.useState<Weight | null>(null);

  return (
    <>
      <Grid container spacing={2}>
        {weights.map((weight) => (
          <Grid item xs={12} sm={6} md={4} key={weight.id}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 2,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <Box>
                  <Typography variant="subtitle1">
                    {weight.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {weight.percentage}%
                  </Typography>
                  {weight.isManual && (
                    <Typography variant="caption" color="primary">
                      Calificación Manual
                    </Typography>
                  )}
                </Box>
                <Tooltip title="Editar peso">
                  <IconButton
                    size="small"
                    onClick={() => setEditWeight(weight)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <EditWeightDialog
        open={!!editWeight}
        onClose={() => setEditWeight(null)}
        weight={editWeight}
        sectionWeight={sectionWeight}
      />
    </>
  );
};

export default WeightList;