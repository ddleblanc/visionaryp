import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NowplayingComponent } from "./components/nowplaying/nowplaying.component";
import { AppComponent } from "./app.component";
import { LineupComponent } from "./components/lineup/lineup.component";
import { TeamsComponent } from "./components/teams/teams.component";
import { PlayersComponent } from "./components/players/players.component";
import { Es11standingsComponent } from "./components/es11standings/es11standings.component";
import { SoccerstandingsComponent } from "./components/soccerstandings/soccerstandings.component";
import { CamComponent } from "./components/cam/cam.component";
import { NewstickerComponent } from "./components/newsticker/newsticker.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  { path: "nowplaying-spotify", component: NowplayingComponent },
  { path: "lineup", component: LineupComponent },
  { path: "teams", component: TeamsComponent },
  { path: "players", component: PlayersComponent },
  { path: "es11standings", component: Es11standingsComponent },
  { path: "soccerstandings", component: SoccerstandingsComponent },
  { path: "cam", component: CamComponent },
  { path: "news", component: NewstickerComponent },
  { path: "", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
