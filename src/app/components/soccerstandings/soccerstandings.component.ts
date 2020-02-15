import { Component, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  trigger,
  transition,
  query,
  stagger,
  style,
  animate
} from "@angular/animations";
import { SoccerService } from "src/app/services/soccer.service";

@Component({
  selector: "app-soccerstandings",
  templateUrl: "./soccerstandings.component.html",
  styleUrls: ["./soccerstandings.component.scss"],
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
export class SoccerstandingsComponent implements OnInit {
  public standings;
  public th;

  constructor(private soccerService: SoccerService) {}

  ngOnInit() {
    this.soccerService.getCurrentStandings().subscribe(data => {
      this.standings = data;
      this.th = this.standings[1];
      this.th.shift();
      this.standings.shift();
      this.standings.shift();
      console.log(this.standings[0]);
    });
  }
}
