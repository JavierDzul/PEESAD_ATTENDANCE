// src/components/Sections/SectionsTab.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button 
} from '@mui/material';
import SectionsList from './SectionsList';
import { Subject } from '../../../interfaces/subject';

interface SectionsTabProps {
  subject: Subject; 
}

const SectionsTab: React.FC<SectionsTabProps> = ({ subject }) => {

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h6">
          Secciones del Temario
        </Typography>

      </Box>
      
      <SectionsList subjectId={subject.id} />
    </Box>
  );
};

export default SectionsTab;