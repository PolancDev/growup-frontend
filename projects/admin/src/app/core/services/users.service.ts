import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '@shared/interfaces/user.interface';
import { Role } from '@shared/models/role.enum';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/admin/users`;

    // Estado privado con señales
    private _users = signal<User[]>([]);
    private _loading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    // Usuarios de búsqueda
    private _usersSearch = signal<User[]>([]);

    // Señales públicas
    public users = computed(() => this._users());
    public loading = computed(() => this._loading());
    public error = computed(() => this._error());

    // Señales derivadas para diferenciar claramente los roles
    public students = computed(() =>
        this._users().filter(u => u.role === Role.STUDENT)
    );

    public teachers = computed(() =>
        this._users().filter(u => u.role === Role.TEACHER)
    );

    // Señales de búsqueda
    public studentsSearch = computed(() =>
        this._usersSearch().filter(u => u.role === Role.STUDENT)
    );

    public teachersSearch = computed(() =>
        this._usersSearch().filter(u => u.role === Role.TEACHER)
    );

    // Totales computados
    public totalStudents = computed(() => this.students().length);
    public totalTeachers = computed(() => this.teachers().length);

    /**
     * Obtiene todos los usuarios del backend
     * GET /api/v1/admin/users
     */
    fetchUsers(): Observable<User[]> {
        this._loading.set(true);
        this._error.set(null);

        return this.http.get<User[]>(this.apiUrl).pipe(
            tap((users) => {
                this._users.set(users);
                this._loading.set(false);
            }),
            catchError((error) => {
                console.error('Error fetching users:', error);
                this._error.set('Error al cargar los usuarios');
                this._loading.set(false);
                return of([]);
            })
        );
    }

    findUsers(term: string) {
        this._usersSearch.set(this._users().filter(user => {
            return user.name.toLowerCase().includes(term.toLowerCase());
        }));
    }

    /**
     * Cambia el estado de activación de un usuario
     * PATCH /api/v1/admin/users/{id}/toggle-status
     */
    toggleUserStatus(userId: string): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/${userId}/status`, {}).pipe(
            tap((updatedUser) => {
                this._users.update(users =>
                    users.map(u => u.id === userId ? updatedUser : u)
                );
            }),
            catchError((error) => {
                console.error('Error toggling user status:', error);
                throw error;
            })
        );
    }
}
