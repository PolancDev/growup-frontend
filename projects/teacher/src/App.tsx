import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { teacherRoutes } from './features/formador.routes';
import { CourseService } from './core/services/courses.service';

// Creamos el router principal
const router = createBrowserRouter([
  ...teacherRoutes,
  {
    path: '/',
    element: <Navigate to="panel-gestion" replace /> // Redirige a la subruta por defecto
  },
  {
    path: '*',
    element: <div className="p-10 text-center text-red-500 font-bold">404 - Página no encontrada (React)</div>
  }
], {
  basename: '/private/teacher'
});

function App({ instructorId, instructorName }: { instructorId?: string, instructorName?: string }) {

  // Inicializamos el servicio con los datos que nos pasa el Shell
  if (instructorId && instructorName) {
    CourseService.setInstructor({ id: instructorId, name: instructorName });
  }

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;