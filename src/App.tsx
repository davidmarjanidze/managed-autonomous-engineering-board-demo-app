import { useMemo, useState } from "react";

type Property = {
  id: number;
  title: string;
  price: number;
  loc: string;
  beds: number;
  baths: number;
  img: string;
};

const titles = [
  "Sky Loft",
  "Harbor House",
  "Cedar Flat",
  "Palm Villa",
  "Metro Nest",
  "Dune Home",
  "Lake View",
  "Brick Row",
  "Sunset Suite",
  "Garden Loft",
  "Urban Manor",
  "Coastline",
  "Hilltop",
  "Courtyard",
];
const locs = [
  "Austin, TX",
  "Miami, FL",
  "Seattle, WA",
  "Denver, CO",
  "San Diego, CA",
  "Nashville, TN",
  "Portland, OR",
  "Phoenix, AZ",
  "Boston, MA",
  "Atlanta, GA",
  "Chicago, IL",
  "San Jose, CA",
  "Raleigh, NC",
  "Charleston, SC",
];
const properties: Property[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: titles[i],
  price: 320000 + i * 37000,
  loc: locs[i],
  beds: 2 + (i % 4),
  baths: 1 + (i % 3),
  img: `https://picsum.photos/seed/aura-${i + 15}/600/400`,
}));

export default function App() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const q = query.toLowerCase().trim();
    return properties.filter(
      (p) => !q || `${p.title} ${p.loc}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-white p-4 shadow-sm">
        <div className="text-lg font-semibold tracking-tight">Apex Living</div>
        <div className="relative w-full max-w-sm">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search homes"
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300"
          />
        </div>
      </header>
      <main className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <article
            key={p.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <img
              src={p.img}
              alt={p.title}
              className="h-44 w-full object-cover"
            />
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold leading-tight">{p.title}</h2>
                  <p className="text-sm text-slate-500">📍 {p.loc}</p>
                </div>
                <div className="font-semibold text-emerald-600">
                  ${p.price.toLocaleString()}
                </div>
              </div>
              <div className="flex gap-4 text-sm text-slate-600">
                <span>🛏️ {p.beds}</span>
                <span>🚿 {p.baths}</span>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
