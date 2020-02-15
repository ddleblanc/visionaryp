import { Component, OnInit } from "@angular/core";
import { SoccerService } from "src/app/services/soccer.service";

@Component({
  selector: "app-newsticker",
  templateUrl: "./newsticker.component.html",
  styleUrls: ["./newsticker.component.scss"]
})
export class NewstickerComponent implements OnInit {
  liveScores = [];
  upcoming = [];
  liveData: any;
  messages;

  results = [
    {
      home: "ES11 ESPORTS 11v11",
      result: " latest results:"
    },
    {
      home: "Playr United",
      away: "Starz United",
      result: "2 - 2"
    },
    {
      home: "Special 11",
      away: "Starz United",
      result: "0 - 2"
    },
    {
      home: "Starz United",
      away: "Gunners Pro Gaming",
      result: "1 - 0"
    },
    {
      home: "Starz United",
      away: "Dutch Dragons",
      result: "2 - 0"
    }
  ];

  // $(document).ready(function () {
  //     var items = document.querySelectorAll(".item");
  //     var time = 0;
  //     for (let item of items) {
  //         item.classList.add("move");
  //     }

  //     setTimeout(() => {
  //         for (let item of items) {
  //             item.classList.remove("move");
  //         }
  //     }, 7500);
  //     //   img
  //     //     .css({ opacity: 0.5, top: centerY, left: centerX })
  //     //     .animate({ opacity: 1, height: "200px", top: 0, left: 0 });
  // });

  constructor(private soccerService: SoccerService) {}

  ngOnInit() {
    this.soccerService.getLivescore().subscribe(data => {
      this.liveData = data;
      if (this.liveData.time != undefined) {
        this.upcoming.push(data);
        console.log(data);
      } else {
        this.liveScores.push(data);
      }
    });
  }
}
