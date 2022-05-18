import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //resultados
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  private apiKey = '236JcOpigtuim9tfwORQt6hQL4eNOxUJ';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';

  

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 9);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      // console.log(this._historial);
    }
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit','10')
    .set('q', query);
    this.http
      .get<SearchGifsResponse>(
        `${this.servicioUrl}/search`,{params}
      )
      .subscribe((resp: SearchGifsResponse) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
