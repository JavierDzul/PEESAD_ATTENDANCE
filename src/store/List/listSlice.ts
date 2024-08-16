import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { List } from "../../interfaces/list";

export interface listState {

    isLoading: boolean;
    list: List[];
    limit: number;
    page: number;
    total: number;
}

const initialState: listState={
    isLoading: false,
    list: [],
    limit: 10,
    page: 1,
    total: 0
}



export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        resetListState: (state) => {
            state.limit = 10;
            state.page = 1;
            state.total = 0;
            state.list = [];
        },

        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },

        setListData: (state, action: PayloadAction<{ data: List[]; total: number; page?: number; limit?: number }>) => {
            const { data, total, page, limit } = action.payload;
            state.list = data;
            state.total = total;
            page?state.page = page:state.page = 1
            limit?state.limit = limit:state.limit = 10
        },
        setNewListToList: (state, { payload }: PayloadAction<List>) => {
            state.list = [
                payload,
                ...state.list as List[]
            ];
        },
        updateListInList: (state, { payload }: PayloadAction<{id:number, state:number}>) => {
            let index2=-1;
            const index = state.list.findIndex(c => {
                        c.attendances.map((d,i)=>{
                            if(d.id==payload.id){
                            index2=i;
                                return;
                        }

                        })
                        if(index2!=-1)
                        return true}
                    );
            console.log(index,index2)
            if (index !== -1) {
                state.list[index].attendances[index2].state=payload.state
            }
        },
    }
});

export const {
    resetListState,
    setIsLoading,
    setListData,
    setNewListToList,
    updateListInList,
} = listSlice.actions;


