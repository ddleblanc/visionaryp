import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  newMsg = { subject: "", message: "" };
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {}

  onSubmit() {
    // this.dashboardService.addMessage(this.newMsg);
    // this.newMsg = { subject: "", message: "" };
  }
}
