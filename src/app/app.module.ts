import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NowplayingComponent } from "./components/nowplaying/nowplaying.component";
import { SpotifyService } from "./services/spotify.service";
import { LineupComponent } from "./components/lineup/lineup.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { PlayersComponent } from "./components/players/players.component";
import { Es11standingsComponent } from "./components/es11standings/es11standings.component";
import { Es11Service } from "./services/es11.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SoccerstandingsComponent } from './components/soccerstandings/soccerstandings.component';
import { CamComponent } from './components/cam/cam.component';

@NgModule({
  declarations: [
    AppComponent,
    NowplayingComponent,
    LineupComponent,
    TeamsComponent,
    PlayersComponent,
    Es11standingsComponent,
    SoccerstandingsComponent,
    CamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [SpotifyService, Es11Service],
  bootstrap: [AppComponent]
})
export class AppModule {}
