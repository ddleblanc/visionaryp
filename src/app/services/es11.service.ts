import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class Es11Service {
  constructor(private _http: HttpClient) {}

  getCurrentStandings() {
    return this._http.get("http://localhost:3000/es11");
  }
}
