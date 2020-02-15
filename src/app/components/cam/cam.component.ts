import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-cam",
  templateUrl: "./cam.component.html",
  styleUrls: ["./cam.component.scss"]
})
export class CamComponent implements OnInit {
  @ViewChild("hardwareVideo", { static: false }) hardwareVideo: any;

  _navigator = <any>navigator;
  localStream;

  ngOnInit() {
    const video = this.hardwareVideo.nativeElement;
    this._navigator = <any>navigator;

    this._navigator.getUserMedia =
      this._navigator.getUserMedia ||
      this._navigator.webkitGetUserMedia ||
      this._navigator.mozGetUserMedia ||
      this._navigator.msGetUserMedia;

    this._navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.localStream = stream;
      video.src = window.URL.createObjectURL(stream);
      video.play();
    });
  }

  stopStream() {
    const tracks = this.localStream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  }
}
