import { Class } from '../../../interfaces/class';

type ClassListProps = {
  classes: Class[];
  onClassSelected: (cls: Class) => void;
};

export default function ClassList({
  classes,
  onClassSelected,
}: ClassListProps) {
  return (
    <div className='card mt-3 p'>
      <table className='table text-center'>
        <thead>
          <tr>
            <th scope='col'>Paquete</th>
            <th scope='col'>Materia</th>
            <th scope='col'>Maestro</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id} onClick={() => onClassSelected(cls)}>
              <td>{cls.package.name}</td>
              <td>{cls.subject.name}</td>
              <td>{cls.teacher.user.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
