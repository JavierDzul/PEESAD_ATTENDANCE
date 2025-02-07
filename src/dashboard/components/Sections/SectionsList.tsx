// src/components/Sections/SectionsList.tsx
import React, { useState } from 'react';
import { SwitchControl } from "./SwitchControlSection";

import { 
  List, 
  Paper, 
  Typography,
  CircularProgress,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetCourseSectionsQuery } from '../../../services/api/courseSection';

interface SectionsListProps {
  subjectId: number;
}

const SectionsList: React.FC<SectionsListProps> = ({ subjectId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useGetCourseSectionsQuery({
    subjectId,
    limit: 50,
    isActive: true
  });

  console.log(data)
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Error al cargar las secciones
      </Typography>
    );
  }

  if (!data?.data.length) {
    return (
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography align="center" color="textSecondary">
          No hay secciones disponibles
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <List disablePadding>
        {data?.data.map((section, index) => (
          <Paper 
            key={section.id} 
            sx={{ 
              mb: 2,
              '& .MuiAccordion-root': {
                '&:before': {
                  display: 'none',
                },
              },
            }}
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 500,
                      flexGrow: 1 
                    }}
                  >
                    {`${index + 1}. ${section.name}`}
                  </Typography>
                  {/* Botón "Deshabilitar" */}
                  <div className="form-check form-switch">
                    <SwitchControl
                      setIsLoading={setIsLoading} // Aquí pasas el setter de estado
                      isActive={section.isActive}
                      courseSectionId={section.id}
                      classId={1}
                    />
                  </div>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 3 }}>
                <Box 
                  className="ql-editor" 
                  sx={{
                    '& .ql-editor': {
                      padding: 0,
                    },
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                      mt: 0,
                      mb: 2,
                    },
                    '& p': {
                      mb: 2,
                    },
                    '& ul, & ol': {
                      mb: 2,
                      pl: 3,
                    },
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto',
                    },
                    '& table': {
                      width: '100%',
                      borderCollapse: 'collapse',
                      mb: 2,
                    },
                    '& td, & th': {
                      border: '1px solid #ddd',
                      padding: '8px',
                    },
                    '& blockquote': {
                      borderLeft: '4px solid #ccc',
                      pl: 2,
                      my: 2,
                      color: 'text.secondary',
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default SectionsList;
