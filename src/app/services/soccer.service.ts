import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SoccerService {
  constructor(private _http: HttpClient) {}

  getCurrentStandings() {
    return this._http.get("http://localhost:3000/soccer/standings");
  }
}
