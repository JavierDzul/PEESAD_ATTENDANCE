import { apiGetAllList, apiUpdateList } from "../../api/list-providers";
import { showErrorMessage } from "../../helpers/alerts";
import {  AttendanceUpdate } from "../../interfaces/attendance";
import { AppDispatch } from "../store"
import { setIsLoading, setListData, updateListInList } from "./listSlice";

 export interface ListQueryParams{
    id:number,
    startDate?:string,
    endDate?:string,
    partial?:number
    lastOnly?:boolean
 }

 export const getList=(params:ListQueryParams)=>{

    return async (dispatch: AppDispatch)=>{
        dispatch(setIsLoading(true));
        try {
          if(params.id==-1){
            dispatch(setListData({data:[],total:0}));
            return 
          }
          console.log(params)
            const res= await apiGetAllList(params)
            dispatch(setListData({data:res.data, total:res.total}))
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }
 }

 export const updateList = (id: number, formData: AttendanceUpdate) => {
    return async (dispatch: AppDispatch) => {
      dispatch(setIsLoading(true));
      try {
        console.log("hola")
        console.log(id)
        dispatch(updateListInList({id:id, state:formData.state as number}));
         await apiUpdateList(id, formData);
        
      } catch (error: any) {
        console.log(error);
        showErrorMessage(error.message);
      }
    };
  };
  

 