import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "src/app/services/spotify.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-nowplaying",
  templateUrl: "./nowplaying.component.html",
  styleUrls: ["./nowplaying.component.scss"]
})
export class NowplayingComponent implements OnInit {
  public authCode;
  public nowPlaying;
  public nextSong;
  constructor(
    private spotifyService: SpotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (location.hash == "") {
      document.getElementById("get-auth").click();
    }
    this.authCode = location.hash.substr(14);
    this.getCurrentSong();
    console.log(this.authCode);
  }
  getCurrentSong() {
    this.spotifyService.getCurrentlyPlaying(this.authCode).subscribe(data => {
      this.nowPlaying = data;
      if (this.nowPlaying != data) {
        document.getElementById("song").classList.add("hide");
        document.getElementById("song").classList.remove("hide");
      }

      console.log(data);
      setTimeout(() => {
        this.getCurrentSong();
      }, parseInt(this.nowPlaying.item.duration_ms) - parseInt(this.nowPlaying.progress_ms));
    });
  }
}
