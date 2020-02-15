import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { Album } from "../models/album.model";
import { Artist } from "../models/artist.model";
import { Observable } from "rxjs";
import { Device } from "../models/device.model";
import { Song } from "../models/song.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SpotifyService {
  constructor(private _http: HttpClient) {}

  // newSongPlaying(){
  //   let observable = new Observable<any>(observer=>{
  //     this.chatService.getSocket().on('trigger track', (body)=>{
  //         observer.next(body);
  //     });
  //     return () => {this.socket.disconnect();}
  // });

  // return observable;
  // }

  // searchMusic(str: string, type = 'artist') {
  //   let headers = new Headers();
  //   headers.append('Authorization', 'Bearer ' + this.accessToken);
  //   this.searchUrl = 'https://api.spotify.com/v1/search?q=' + str + '&type=' + type + '&market=US&limit=20&offset=0';
  //   return this._http.get(this.searchUrl, { headers: headers })
  //   .pipe(
  //     map(res => res.json())
  //   );
  // }

  // getDevices() {
  //   let headers = new Headers();
  //   headers.append('Authorization', 'Bearer ' + this.accessToken);
  //   return this._http.get('https://api.spotify.com/v1/me/player/devices', { headers: headers })
  //   .pipe(
  //     map(res => res.json())
  //   );
  // }

  getCurrentlyPlaying(accessToken) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + accessToken);
    return this._http.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: headers }
    );
  }
}
