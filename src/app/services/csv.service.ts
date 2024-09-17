import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) {}

  // Método para consumir el CSV
  getCsvData(url: string): Observable<any[]> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => this.csvToJSON(data))
    );
  }

  // Método para convertir el CSV a JSON
  private csvToJSON(csv: string): any[] {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentline[j].trim();
      }

      result.push(obj);
    }

    return result;
  }
}