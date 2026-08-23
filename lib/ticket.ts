export function generateTicketId() {
  const now = new Date();
  const datePart =
    now.getFullYear().toString().slice(2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  return `HIA-${datePart}-${randomPart}`;
}
