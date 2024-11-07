import { useEffect } from "react";
import { ListList } from "../../components/attendance/ListList"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getAllClass } from "../../../store/Class/thunks";


export const ListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllClass({ page: 1, limit: 10 }));
  }, [dispatch]);
  return (
    <div>
      <div className="container mt-1 p-2">
        <div className="card shadow-sm">
          <div className="d-flex justify-content-center mt-4 mb-5">
            <ListList />
          </div>
        </div>
      </div>

    </div>
  )
}