import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {id, keyapi} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class MasteriesService {
  private cache$: Observable<Array<any>> | undefined;

  constructor(private http: HttpClient) {
  }

  public getMasteries(reset: boolean = false){
    if (!this.cache$ || reset) {
      this.cache$ = this.requestMasteries().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestMasteries(): Observable<any> {
    const headers= new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('X-Riot-Token',keyapi);
    console.log(keyapi)
    return this.http.get<Array<any>>("https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +
      id + "?api_key="+keyapi)
  }
}
