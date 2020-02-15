import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SoccerService {
  public team = { team: "barcelona" };
  constructor(private _http: HttpClient) {}

  getCurrentStandings() {
    return this._http.get("http://localhost:3000/soccer/standings");
  }
  getLivescore() {
    return this._http.post("http://localhost:3000/livescore", this.team);
  }
}
