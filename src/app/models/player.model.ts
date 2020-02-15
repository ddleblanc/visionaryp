import { Team } from "./team.model";

export class Player {
  id: number;
  name: string;
  joiningDate: Date;
  comment: string;
  placements: any;
  teams: Team[];
}
