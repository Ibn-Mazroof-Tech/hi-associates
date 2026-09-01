import { team } from "@/data/team";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamSection() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => (
        <div
          key={member.name}
          className="flex flex-col items-center rounded-2xl border border-[var(--color-line)] bg-white p-6 text-center"
        >
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt={member.name}
              className="size-20 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-20 items-center justify-center rounded-full bg-[var(--color-sky)] font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-brand)]">
              {initials(member.name)}
            </span>
          )}
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-[16px] font-semibold text-[var(--color-ink)]">
            {member.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-slate)]">{member.designation}</p>
        </div>
      ))}
    </div>
  );
}
