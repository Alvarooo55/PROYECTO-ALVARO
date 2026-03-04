import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Jugador, JugadorPayload, JugadorService } from './jugador.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  jugadores: Jugador[] = [];
  editId: string | null = null;
  mensaje = '';
  error = '';

  jugadorForm;

  constructor(
    private readonly fb: FormBuilder,
    private readonly jugadorService: JugadorService
  ) {
    this.jugadorForm = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      equipo: ['', [Validators.required, Validators.minLength(2)]],
      temporadas: [1, [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(4)]],
      goles: [1, [Validators.required, Validators.min(1)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores(): void {
    this.jugadorService.getJugadores().subscribe({
      next: (data) => {
        this.jugadores = data;
      },
      error: () => {
        this.error = 'No se pudo cargar la lista';
      }
    });
  }

  guardarJugador(): void {
    this.mensaje = '';
    this.error = '';

    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
      return;
    }

    const payload: JugadorPayload = this.jugadorForm.getRawValue();

    if (this.editId) {
      this.jugadorService.updateJugador(this.editId, payload).subscribe({
        next: () => {
          this.mensaje = 'Jugador actualizado';
          this.limpiarFormulario();
          this.cargarJugadores();
        },
        error: () => {
          this.error = 'No se pudo actualizar';
        }
      });
      return;
    }

    this.jugadorService.addJugador(payload).subscribe({
      next: () => {
        this.mensaje = 'Jugador creado';
        this.limpiarFormulario();
        this.cargarJugadores();
      },
      error: () => {
        this.error = 'No se pudo crear';
      }
    });
  }

  editarJugador(jugador: Jugador): void {
    this.editId = jugador._id;
    this.error = '';
    this.mensaje = '';
    this.jugadorForm.patchValue({
      nombre: jugador.nombre,
      equipo: jugador.equipo,
      temporadas: jugador.temporadas,
      descripcion: jugador.descripcion,
      goles: jugador.goles,
      activo: jugador.activo
    });
  }

  eliminarJugador(id: string): void {
    this.mensaje = '';
    this.error = '';

    this.jugadorService.deleteJugador(id).subscribe({
      next: () => {
        this.mensaje = 'Jugador eliminado';
        this.cargarJugadores();
      },
      error: () => {
        this.error = 'No se pudo eliminar';
      }
    });
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.editId = null;
    this.jugadorForm.reset({
      nombre: '',
      equipo: '',
      temporadas: 1,
      descripcion: '',
      goles: 1,
      activo: true
    });
  }
}
