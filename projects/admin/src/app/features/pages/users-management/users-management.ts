import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../core/services/users.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { User } from '@shared/interfaces/user.interface';
import { FichaUser } from '../../../shared/componentes/fichaUser/ficha-user';
import { DateFormatPipe } from '../../../core/pipes/date-format.pipe';

@Component({
  selector: 'growup-users-management',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ButtonModule,
    TabsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    AvatarModule,
    TooltipModule,
    DialogModule,
    FichaUser,
    DateFormatPipe
  ],
  templateUrl: './users-management.html',
  styleUrl: './users-management.scss',
  encapsulation: ViewEncapsulation.None
})
export class UsersManagement implements OnInit {

  private usersService = inject(UsersService);

  public buscandoUser = signal<boolean>(false);
  public selectedUser = signal<User | null>(null);
  public displayFicha = signal<boolean>(false);

  // Señales del servicio
  students = this.usersService.students;
  teachers = this.usersService.teachers;
  studentsSearch = this.usersService.studentsSearch;
  teachersSearch = this.usersService.teachersSearch;
  totalStudents = this.usersService.totalStudents;
  totalTeachers = this.usersService.totalTeachers;

  ngOnInit(): void {
    this.usersService.fetchUsers().subscribe();
  }

  toggleStatus(userId: string) {
    this.usersService.toggleUserStatus(userId).subscribe();
  }

  getSeverity(isActive: boolean) {
    return isActive ? 'success' : 'danger';
  }

  buscaUser(busqueda: string) {
    if (busqueda.length > 0) {
      this.buscandoUser.set(true);
      this.usersService.findUsers(busqueda);
    } else {
      this.buscandoUser.set(false);
    }
  }

  showUserFicha(user: User) {
    this.selectedUser.set(user);
    this.displayFicha.set(true);
  }

  closeUserFicha() {
    this.displayFicha.set(false);
    setTimeout(() => this.selectedUser.set(null), 300);
  }
}
