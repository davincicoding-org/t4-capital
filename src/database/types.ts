import type { strategy, teamMember } from "./schema";

export type Strategy = typeof strategy.$inferSelect;
export type TeamMember = typeof teamMember.$inferSelect;
