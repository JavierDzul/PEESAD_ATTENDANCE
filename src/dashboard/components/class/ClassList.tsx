import { Class } from '../../../interfaces/class';

type ClassListProps = {
  classes: Class[];
  onActiveClassChange: (cls: Class, isActive: boolean) => void;
  onClassClick: (cls: Class) => void;
};

export default function ClassList({
  classes,
  onActiveClassChange,
  onClassClick,
}: ClassListProps) {
  return (
    <div className='card mt-3 p'>
      <table className='table text-center'>
        <thead>
          <tr>
            <th scope='col'>Paquete</th>
            <th scope='col'>Materia</th>
            <th scope='col'>Maestro</th>
            <th scope='col'>Habilitar/Deshabilitar</th>
            <th scope='col'>Editar</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.package.name}</td>
              <td>{cls.subject.name}</td>
              <td>{cls.teacher.user.fullName}</td>
              <td className='form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='isActiveClass'
                  checked={cls.isCurrent}
                  onChange={(e) => onActiveClassChange(cls, e.target.checked)}
                />
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  onClick={() => onClassClick(cls)}
                >
                  <span className='fa-solid fa-pen'></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
