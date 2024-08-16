import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassList from '../../components/attendanceList/ClassList.tsx';
import DisplayError from '../../components/shared/DisplayError.tsx';
import Loading from '../../components/shared/Loading.tsx';
import Pagination from '../../components/shared/Pagination.tsx';
import { usePageQueryParams } from '../../hooks/usePageQueryParams.ts';
import { useTeacherId } from '../../hooks/useTeacherId.ts';
import { useGetClassesByTeacherIdQuery } from '../../../services/api/classApi.ts';

export default function ClassesOfTeacherPage() {
  const limit = 10;
  const [page, setPage] = usePageQueryParams();
  const navigate = useNavigate();

  const teacherId = useTeacherId();
  const {
    data: classesResponse,
    isLoading,
    isError,
  } = useGetClassesByTeacherIdQuery({
    page: page,
    limit,
    // isActive: true,
    teacherId: teacherId,
  });
  const total = useMemo(() => classesResponse?.total || 0, [classesResponse]);
  const classes = useMemo(() => classesResponse?.data || [], [classesResponse]);

  if (isLoading) return <Loading />;

  if (isError) return <DisplayError />;

  return (
    <div className='d-flex container-fluid mt-4 gap-4 justify-content-center'>
      <ClassList
        classes={classes}
        onClassSelected={({ id }) => {
          navigate(id.toString());
        }}
      />

      <Pagination
        currentPage={page}
        totalCount={total}
        pageSize={limit}
        onPageChange={(page) => setPage(page)}
      />
    </div>
  );
}
