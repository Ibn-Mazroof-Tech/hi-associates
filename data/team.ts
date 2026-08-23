export type TeamMember = {
  name: string;
  designation: string;
  // Optional path under /public, e.g. "/team/asif.jpg". Leave undefined
  // to show an initials avatar instead of a photo.
  photo?: string;
};

// PLACEHOLDER TEAM — replace names, designations, and (optionally) photo
// paths with your real team. Add or remove entries as needed; the grid
// on the About Us page adjusts automatically.
export const team: TeamMember[] = [
  { name: "Team Member Name", designation: "Founder & Director" },
  { name: "Team Member Name", designation: "Documentation Specialist" },
  { name: "Team Member Name", designation: "Client Relations" },
];
