
import HeaderClass, { HeaderClassProps } from "../../components/class/HeaderClass"



export const ViewAttendancePage= ({cls}:HeaderClassProps)=>{
    return(
        <div>
            <HeaderClass
            cls={cls}
            ></HeaderClass>
     {/* <AttendanceTableClass></AttendanceTableClass>             */}
        </div>
    )

}