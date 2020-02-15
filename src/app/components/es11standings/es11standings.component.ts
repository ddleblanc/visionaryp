import { Component, OnInit } from "@angular/core";
import { Es11Service } from "src/app/services/es11.service";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from "@angular/animations";

@Component({
  selector: "app-es11standings",
  templateUrl: "./es11standings.component.html",
  styleUrls: ["./es11standings.component.scss"],
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(":enter", [
          style({ opacity: 0 }),
          stagger(100, [animate("0.5s", style({ opacity: 1 }))])
        ])
      ])
    ])
  ]
})
export class Es11standingsComponent implements OnInit {
  public standings;
  public th;

  constructor(private es11Service: Es11Service) {}

  ngOnInit() {
    this.es11Service.getCurrentStandings().subscribe(data => {
      this.standings = data;
      this.th = this.standings[0];
      this.standings.shift();
      console.log(this.standings[0]);
    });
  }
}
