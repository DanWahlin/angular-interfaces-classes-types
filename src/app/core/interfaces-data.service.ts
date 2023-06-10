import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { SwapiResult, Character, Planet, CharactersPlanets } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class InterfacesDataService {

  baseUrl = 'https://swapi.dev/api/';

  constructor(private http: HttpClient) { }

  getCharacters() : Observable<Character[]> {
    return this.http.get<SwapiResult<Character>>(this.baseUrl + 'people')
      .pipe(
        tap(results => {
          console.log('Before getCharacters map');
        }),
        map(res => {
          return res['results'];
        }),
        tap(results => {
          console.log('After getCharacters map');
        })
      );
  }

  getPlanets() : Observable<Planet[]> {
    return this.http.get<SwapiResult<Planet>>(this.baseUrl + 'planets')
      .pipe(
        tap(results => {
          console.log('Before getPlanets map');
        }),
        map(res => {
          return res['results'];
        }),
        tap(results => {
          console.log('After getPlanets map');
        })
      );
  }

  getCharactersAndPlanets() : Observable<CharactersPlanets> {
    return forkJoin({
      characters: this.getCharacters(),
      planets: this.getPlanets()
  })
    .pipe(
      map((res) => {
        return { characters: res.characters, planets: res.planets }
      }),
      catchError(error => of(error))
    );
  }

  updateCharacter(character: Partial<Character>): Observable<Partial<Character>> {
    // perform update to partial character object
    character.name = 'Luke Vader';
    return of(character);
  }

}