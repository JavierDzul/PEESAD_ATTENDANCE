import axios from 'axios';
import { useEffect, useState } from 'react';
import { Class } from '../../../interfaces/class';
import { Package } from '../../../interfaces/package';
import { ApiResponse } from '../../../interfaces/response';
import { ApiResponseAll } from '../../../interfaces/response-all';
import ClassList from '../../components/class/ClassList';
import CreateClassModal from '../../components/class/CreateClassModal';
import EditClassModal from '../../components/class/EditClassModal';
import SearchBarWithButton from '../../components/class/SearchBarWithButton';
import Pagination from '../../components/shared/Pagination';
import { usePageQueryParams } from '../../hooks';
import { usePackageParam } from '../../hooks/usePackageParam';

export default function ClassPage() {
  // Pagination
  const limit = 10;
  const [total, setTotal] = useState(0);
  const [page, setPage] = usePageQueryParams();
  const isLoading = true;

  const [packages, setPackages] = useState<Package[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [pkg, setPkg] = usePackageParam();
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showEditClassModal, setShowEditClassModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetches all packages
  useEffect(() => {
    axios
      .get<ApiResponseAll<Package>>(
        'http://localhost:3000/api/package/findAll?page=1&limit=0&isActive=true',
      )
      .then((res) => {
        const data = res.data.data;
        setPackages(data);
      })
      .catch((err) => console.error(err));
  }, [setPage]);

  // Updates the classes according to the selected package
  useEffect(() => {
    if (pkg === 0) {
      // combine all the pages in on classes state from packages state
      const allClassesCombine = packages.reduce<Class[]>(
        (acc, pkg) => [...acc, ...pkg.classes],
        [],
      );
      setClasses(allClassesCombine);
      setTotal(allClassesCombine.length);
      console.log('Fetching all classes');
    } else {
      const selectedClasses = packages.find((p) => p.id === pkg)?.classes || [];

      setClasses(selectedClasses);
      console.log(`Filtering classes by package ${pkg}`);
    }
  }, [packages, pkg, page, setPage]);

  useEffect(() => {
    setTotal(classes.length);
    setFilteredClasses(classes.slice((page - 1) * limit, page * limit));
  }, [classes, page, limit, pkg]);

  const handleUpdateClass = async (cls: Class, isCurrent: boolean) => {
    try {
      const response = await axios.patch<ApiResponse<Class>>(
        `http://localhost:3000/api/class/update/${cls.id}`,
        {
          isCurrent,
        },
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return !isLoading ? (
    <div className='container-fluid text-center'>
      <p className='display-1'>Cargando...</p>
    </div>
  ) : (
    <div className='p-5'>
      {classes.length === 0 && (
        <p className='lead'>No hay clases registradas</p>
      )}

      {showCreateClassModal && (
        <CreateClassModal onDismiss={() => setShowCreateClassModal(false)} />
      )}
      {showEditClassModal && selectedClass && (
        <EditClassModal
          cls={selectedClass}
          onDismiss={() => setShowEditClassModal(false)}
        />
      )}

      <div className='col-md-6 mb-3'>
        <label htmlFor='package'>Selecciona un paquete</label>
        <select
          name='package'
          id='package'
          className='form-select mt-2'
          value={pkg}
          onChange={(e) => {
            setPkg(+e.target.value);
            setPage(1);
          }}
        >
          <option value='0'>Todos los paquetes</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      <SearchBarWithButton
        query={searchQuery}
        buttonMessage='Nueva clase'
        buttonIcon={<i className='fa-solid fa-plus'></i>}
        setQuery={setSearchQuery}
        onButtonClick={() => setShowCreateClassModal(true)}
      />

      <ClassList
        classes={filteredClasses}
        onActiveClassChange={handleUpdateClass}
        onClassClick={(cls) => {
          setSelectedClass(cls);
          setShowEditClassModal(true);
        }}
      />

      <div className='mt-4'>
        <Pagination
          className='justify-content-center'
          currentPage={page}
          totalCount={total}
          pageSize={limit}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
}
