import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllJustifications } from "../../../store/justification/thunks";
import { Card, Button, Collapse } from 'react-bootstrap';
import axios from 'axios';
import JustificationFilterForm from '../../components/justification/JustificationFilterForm';
import PaginationComponent from '../../components/justification/PaginationComponent';
import JustificationTable from '../../components/justification/JustificationTable';
import { JustificationType } from '../../components/justification/types';
import HeaderClass, { HeaderClassProps } from "../../components/class/HeaderClass";
import CreateJustificationModal from '../../components/justification/CreateJustificationModal';
import { Student } from '../../../interfaces/student'; // Importa la interfaz correcta

export const JustificationPage = ({ cls }: HeaderClassProps) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dispatch = useDispatch<AppDispatch>();
  const {  total } = useSelector((state: RootState) => state.justification);
  const formatDate = (date: Date | undefined) => date ? date.toISOString().split('T')[0] : undefined;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [type, setType] = useState<JustificationType | undefined>(undefined);
  const classIdParam = params.get('classId');
  const data = useSelector((state: RootState) => state.justification.justifications);
  const [showFilter, setShowFilter] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        if (classIdParam) {
          const { data } = await axios.get(`http://localhost:3000/api/class/findStudents?page=1&limit=100&classId=${classIdParam}`);
          const studentsWithFullName = data.data.map((student: any) => ({
            ...student,
            fullName: `${student.name} ${student.lastName} ${student.motherLastName}`,
          }));
          setStudents(studentsWithFullName);
        }
      } catch (error) {
        console.error('Error fetching students', error);
      }

      let studentIdParam = params.get('studentId');
      let initialStudentId = studentIdParam ? Number(studentIdParam) : undefined;
      setSelectedStudentId(initialStudentId);

      await dispatch(getAllJustifications({ page: 1, limit: 10, studentId: initialStudentId, classId: classIdParam ? Number(classIdParam) : undefined }));
    };

    initialFetch();
  }, []);

  const handleFilter = () => {
    dispatch(getAllJustifications({
      page,
      limit,
      studentId: selectedStudentId,
      startDate:formatDate(startDate),
      type,
      classId: classIdParam ? Number(classIdParam) : undefined
    }));
  };

  const handleReset = () => {
    setPage(1);
    setLimit(10);
    setSelectedStudentId(undefined);
    setSearchTerm("");
    setStartDate(undefined);
    setEndDate(undefined);
    setType(undefined);
    dispatch(getAllJustifications({ page: 1, limit: 10 }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(getAllJustifications({
      page: newPage,
      limit,
      studentId: selectedStudentId,
      startDate:formatDate(startDate),
      type,
      classId: classIdParam ? Number(classIdParam) : undefined
    }));
  };

  const filterProps = {
    students,
    selectedStudentId,
    setSelectedStudentId,
    searchTerm,
    setSearchTerm,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    type,
    setType,
    handleFilter,
    handleReset
  };

  return (
    <div>
      <HeaderClass cls={cls} />
      <Card className="mt-3">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <span>Filtrar Justificantes</span>
            <Button
              variant="link"
              onClick={() => setShowFilter(!showFilter)}
              aria-controls="filter-collapse"
              aria-expanded={showFilter}
            >
              {showFilter ? 'Ocultar' : 'Mostrar'} Filtro
            </Button>
            <Button variant="primary" onClick={() => setShowModal(true)}>Crear Justificante</Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Collapse in={showFilter}>
            <div id="filter-collapse">
              <JustificationFilterForm {...filterProps} />
            </div>
          </Collapse>
          <JustificationTable justifications={data} />
          <PaginationComponent
            total={total}
            limit={limit}
            page={page}
            handlePageChange={handlePageChange}
          />
        </Card.Body>
      </Card>
      <CreateJustificationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        students={students}
      />
    </div>
  );
};

export default JustificationPage;
