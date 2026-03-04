import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Jugador {
  _id: string;
  nombre: string;
  equipo: string;
  temporadas: number;
  descripcion: string;
  goles: number;
  activo: boolean;
}

export interface JugadorPayload {
  nombre: string;
  equipo: string;
  temporadas: number;
  descripcion: string;
  goles: number;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
private readonly apiUrl = 'http://localhost:3000/api/v1/jugadores';
  constructor(private readonly http: HttpClient) {}

  getJugadores(): Observable<Jugador[]> {
    return this.http
      .get<{ status: Jugador[] }>(this.apiUrl)
      .pipe(map((response) => response.status ?? []));
  }

  addJugador(payload: JugadorPayload): Observable<Jugador> {
    return this.http
      .post<{ data: Jugador }>(`${this.apiUrl}/publicar`, payload)
      .pipe(map((response) => response.data));
  }

  updateJugador(id: string, payload: JugadorPayload): Observable<Jugador> {
    return this.http
      .put<{ data: Jugador }>(`${this.apiUrl}/actualizar/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  deleteJugador(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
