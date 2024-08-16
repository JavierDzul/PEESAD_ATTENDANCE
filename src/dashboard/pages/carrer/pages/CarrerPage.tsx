import { useEffect, useState } from "react";
import { CarrerList, CreateCarrerModal } from "../../../components/carrer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import  Pagination  from "../../../components/shared/Pagination";
import { getAllCareer, searchCareer } from "../../../../store/carrer/thunks";

export const CarrerPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1)
    const { total } = useSelector((state: RootState) => state.career);
    const [searchKeyword, setSearchKeyword] = useState<string>("");

    useEffect(() => {
        dispatch(getAllCareer(page))

    }, [page]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
        dispatch(searchCareer(event.target.value, page));
    };

    return (
        <div className="p-5">

            {
                showModalCreate && <CreateCarrerModal setShowModal={setShowModalCreate} />
            }

            <div className="card container p-2">
                <div className="d-flex flex-row">
                    <div className="input-group p-2">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Text input with dropdown button"
                            value={searchKeyword}
                            onChange={handleSearchChange}
                            placeholder="Buscar por carrera o clave"
                        />
                    </div>
                    <button type="button"
                        className="btn btn-primary m-2"
                        onClick={() => setShowModalCreate(true)}>
                         Nueva carrera <i className="fa-solid fa-plus"></i> 
                    </button>

                </div>
            </div>


            <CarrerList />

            {
                total > 20 &&
                (
                    <Pagination
                        pageSize={10}
                        currentPage={page}
                        totalCount={total}
                        onPageChange={(page: number) => setPage(page)} />
                )
            }
        </div>
    );
}