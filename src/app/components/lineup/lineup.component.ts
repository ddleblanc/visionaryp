import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lineup",
  templateUrl: "./lineup.component.html",
  styleUrls: ["./lineup.component.scss"]
})
export class LineupComponent implements OnInit {
  public adding = false;
  public players = [
    "EARLSGAMING",
    "MIKEY",
    "CHELE1917",
    "RAFEAL",
    "LES_LOLO",
    "POLO",
    "FDEJONG21_FCB",
    "FELITCIANO_19",
    "NICK",
    "LILHENDRIX_",
    "VISIONARY-PLAY"
  ];
  lineup = [
    {
      position: "GK",
      name: "EARLSGAMING"
    },
    {
      position: "LB",
      name: "MIKEY"
    },
    {
      position: "LCB",
      name: "CHELE1917"
    },
    {
      position: "RCB",
      name: "RAFEAL"
    },
    {
      position: "RB",
      name: "LES_LOLO"
    },
    {
      position: "LDM",
      name: "POLO"
    },
    {
      position: "RDM",
      name: "FDEJONG21_FCB"
    },
    {
      position: "CAM",
      name: "FELITCIANO_19"
    },
    {
      position: "LAM",
      name: "NICK"
    },
    {
      position: "RAM",
      name: "LILHENDRIX_"
    },
    {
      position: "ST",
      name: "VISIONARY-PLAY"
    }
  ];

  constructor() {}

  ngOnInit() {}

  addPlayer() {
    this.adding = true;
  }
  onEnter(name) {
    this.players.push(name);
    console.log(this.players);
    this.adding = false;
  }
}
