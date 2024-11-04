import { useEffect } from "react";
import { ListList } from "../../components/attendance/ListList"
import { SearchClass } from "../../components/class/searchClass"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getAllUnit } from "../../../store/unit/thunks";
import { getAllClass, setSelectedClass } from "../../../store/Class/thunks";
import { getAllSubject } from "../../../store/subject/thunks";


export const ListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  /*
 useSelector(
    (state: RootState) => state.class.selectedClass,
  );
  useEffect(() => {
    dispatch(setSelectedClass(-1));
    dispatch(getAllUnit(1));
    dispatch(getAllClass({ page: 1, limit: 10 }));
    dispatch(getAllSubject({ page: 1, limit: 20 }));
  }, [dispatch]);
  */

  useEffect(() => {
    dispatch(getAllClass({ page: 1, limit: 10 }));
  }, [dispatch]);
  return (
    <div>

      <SearchClass>

      </SearchClass>
      <div className="container mt-1">
        <div className="card shadow-sm">
          <div className="d-flex justify-content-center mt-4 mb-5">
            <ListList />
          </div>
        </div>
      </div>

    </div>
  )
}