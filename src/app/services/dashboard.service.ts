import { Injectable } from "@angular/core";
import { Subject } from "angular-src/node_modules/rxjs";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  private message = new Subject<any>();
  //Set current Post's photo url
  setNewMsg(msg: any) {
    this.message.next(msg);
    console.log(this.message);
  }

  newMsg$ = this.message.asObservable();

  constructor() {}
  public messages = [
    {
      subject: "Team update",
      message: "starz united just took 1st place. lets go starz!"
    },
    {
      subject: "Trials",
      message: "message me if you think you got what it takes"
    }
  ];
}
