import { AttendanceFilter } from "../../../components/attendance/AttendanceFilter/AttendanceFilter"
import { AttendanceTable } from "../../../components/attendance/AttendanceTable/AttendanceTable"
import HeaderClass, { HeaderClassProps } from "../../../components/class/HeaderClass"


export const AttendancePage= ({cls}:HeaderClassProps)=>{
 
    return(
        <div>
            <HeaderClass
            cls={cls}
            ></HeaderClass>
            <AttendanceFilter></AttendanceFilter>
            
            <AttendanceTable></AttendanceTable>            
        </div>
    )

}