import React from 'react';
import { 
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { SectionWeight } from '../../../interfaces/weight';
import WeightList from './WeightList';
import EditSectionWeightDialog from './EditSectionWeightDialog';
import AddWeightDialog from './AddWeightDialog';

interface WeightSectionListProps {
  sections: SectionWeight[];
  classId: number;
}

const WeightSectionList: React.FC<WeightSectionListProps> = ({ sections, classId }) => {
  const [editSection, setEditSection] = React.useState<SectionWeight | null>(null);
  const [addWeightSection, setAddWeightSection] = React.useState<SectionWeight | null>(null);

  const calculateTotalPercentage = (weights: any[]) => {
    return weights.reduce((sum, weight) => sum + weight.percentage, 0);
  };

  return (
    <Box>
      {sections.map((section) => {
        const totalPercentage = calculateTotalPercentage(section.weights);
        
        return (
          <Accordion key={section.id} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width: '100%',
                pr: 2 
              }}>
                <Box>
                  <Typography variant="h6">{section.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: {totalPercentage}%
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Editar sección">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditSection(section);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Agregar peso">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddWeightSection(section);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={totalPercentage} 
                  color={totalPercentage > 100 ? "error" : "primary"}
                />
              </Box>
              <WeightList 
                weights={section.weights}
                sectionWeight={section}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}

      <EditSectionWeightDialog
        open={!!editSection}
        onClose={() => setEditSection(null)}
        section={editSection}
      />

      <AddWeightDialog
        open={!!addWeightSection}
        onClose={() => setAddWeightSection(null)}
        section={addWeightSection}
      />
    </Box>
  );
};

export default WeightSectionList;