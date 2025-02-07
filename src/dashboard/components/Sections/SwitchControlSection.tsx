import { Dispatch, FC, SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'
import { useEditCourseSectionMutation } from '../../../services/api/courseSection';


interface Props {
  isActive?: boolean,
  courseSectionId?: number,
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const SwitchControl: FC<Props> = ({ isActive = false, courseSectionId, setIsLoading }) => {

  const [value, setValue] = useState<boolean | undefined>(isActive)
  const [editCourseSection] = useEditCourseSectionMutation();

  const handleOnChange = async () => {
    if (courseSectionId === undefined) {
      return;
    }
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Se ${!value ? 'habilitará' : 'deshabilitará'} la carrera.`,
      confirmButtonText: `¡Si, ${!value ? 'habilitar' : 'deshabilitar'}!`,
      confirmButtonColor: '#20968E',
      showCancelButton: true,
      cancelButtonText: '¡No, cancelar!',
      cancelButtonColor: '#f23e3e',
    })

    if (!isConfirmed) return;
    const formData = {
      isActive: !value,
    };
    setIsLoading(true);
    try {
    
    console.log( await editCourseSection({ id: courseSectionId, isActive: formData.isActive }))
    
    }
    catch(e){

      console.log(e);
    }
    setValue(old => !old);
    setIsLoading(false);

  }

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        onChange={handleOnChange}
        checked={value ?? false} />
    </div>
  )
}
