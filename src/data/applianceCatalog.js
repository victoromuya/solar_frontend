const applianceArtwork = {
  fan: {
    bg: "#e9f7ef",
    stroke: "#16794a",
    icon: '<circle cx="80" cy="58" r="10"/><path d="M80 48c-9-25 14-28 23-10 4 8-4 17-23 10ZM90 64c25-9 28 14 10 23-8 4-17-4-10-23ZM70 64c-25 9-28-14-10-23 8-4 17 4 10 23Z"/><path d="M80 70v30M58 108h44"/>',
  },
  tv: {
    bg: "#eef2ff",
    stroke: "#3346a3",
    icon: '<rect x="34" y="38" width="92" height="56" rx="8"/><path d="M64 110h32M80 94v16"/><path d="M48 52h64"/>',
  },
  fridge: {
    bg: "#e8f6fb",
    stroke: "#0d6f8f",
    icon: '<rect x="54" y="24" width="52" height="106" rx="8"/><path d="M54 68h52M66 44v12M66 84v18"/><circle cx="94" cy="118" r="2"/><circle cx="66" cy="118" r="2"/>',
  },
  ac: {
    bg: "#eef8fb",
    stroke: "#247083",
    icon: '<rect x="32" y="42" width="96" height="42" rx="8"/><path d="M44 68h72M54 98c6-7 14-7 20 0M86 98c6-7 14-7 20 0"/><circle cx="112" cy="56" r="4"/>',
  },
  light: {
    bg: "#fff6db",
    stroke: "#a76b00",
    icon: '<path d="M58 66a22 22 0 1 1 44 0c0 11-8 17-13 24H71c-5-7-13-13-13-24Z"/><path d="M70 102h20M72 114h16M80 18v14M34 34l10 10M126 34l-10 10"/>',
  },
  laptop: {
    bg: "#f0eefb",
    stroke: "#6045a8",
    icon: '<rect x="44" y="38" width="72" height="50" rx="6"/><path d="M30 108h100l-14-20H44L30 108Z"/><path d="M70 98h20"/>',
  },
  washer: {
    bg: "#eef6ff",
    stroke: "#22669a",
    icon: '<rect x="48" y="24" width="64" height="108" rx="8"/><path d="M48 48h64"/><circle cx="80" cy="88" r="24"/><path d="M62 88c11 8 25-8 36 0"/><circle cx="98" cy="36" r="4"/>',
  },
  microwave: {
    bg: "#f7f2e8",
    stroke: "#84622a",
    icon: '<rect x="32" y="46" width="96" height="58" rx="8"/><rect x="44" y="58" width="54" height="34" rx="4"/><path d="M110 62v26M116 62v26"/><circle cx="113" cy="94" r="3"/>',
  },
  pump: {
    bg: "#eaf8f5",
    stroke: "#157363",
    icon: '<circle cx="72" cy="72" r="28"/><path d="M100 62h22v28h-22M44 90H28V58h16M62 72h20M72 62v20M54 114h52"/>',
  },
  iron: {
    bg: "#fbeeee",
    stroke: "#9b3939",
    icon: '<path d="M38 92h88l-16 20H38V92Z"/><path d="M58 92V66c0-12 9-20 22-20h18c12 0 20 8 20 20"/><path d="M70 66h22"/>',
  },
  blender: {
    bg: "#eff8e8",
    stroke: "#4f7b22",
    icon: '<path d="M60 30h42l-8 58H68L60 30Z"/><path d="M66 88h28v28H66zM58 122h44M70 48h22M73 70l15-12"/>',
  },
  default: {
    bg: "#f1f5f9",
    stroke: "#475569",
    icon: '<rect x="42" y="42" width="76" height="60" rx="10"/><path d="M58 62h44M58 80h28M66 118h28M80 102v16"/>',
  },
};

export const applianceCategoryOptions = [
  { value: "fan", label: "Fan" },
  { value: "tv", label: "Television" },
  { value: "fridge", label: "Refrigerator" },
  { value: "ac", label: "Air Conditioner" },
  { value: "light", label: "Lighting" },
  { value: "laptop", label: "Computer" },
  { value: "washer", label: "Washing Machine" },
  { value: "microwave", label: "Microwave" },
  { value: "pump", label: "Water Pump" },
  { value: "iron", label: "Pressing Iron" },
  { value: "blender", label: "Blender" },
  { value: "default", label: "Other Appliance" },
];

export const fallbackAppliances = [
  { id: "fan", catalogKey: "built-in-fan", source: "Built in", name: "Fan", default_watts: 75, category: "fan" },
  { id: "tv", catalogKey: "built-in-tv", source: "Built in", name: "Television", default_watts: 120, category: "tv" },
  { id: "fridge", catalogKey: "built-in-fridge", source: "Built in", name: "Refrigerator", default_watts: 300, category: "fridge" },
  { id: "ac", catalogKey: "built-in-ac", source: "Built in", name: "Air Conditioner", default_watts: 1500, category: "ac" },
  { id: "light", catalogKey: "built-in-light", source: "Built in", name: "Light Bulb", default_watts: 15, category: "light" },
  { id: "laptop", catalogKey: "built-in-laptop", source: "Built in", name: "Laptop", default_watts: 65, category: "laptop" },
  { id: "washer", catalogKey: "built-in-washer", source: "Built in", name: "Washing Machine", default_watts: 500, category: "washer" },
  { id: "microwave", catalogKey: "built-in-microwave", source: "Built in", name: "Microwave", default_watts: 1000, category: "microwave" },
  { id: "pump", catalogKey: "built-in-pump", source: "Built in", name: "Water Pump", default_watts: 750, category: "pump" },
  { id: "iron", catalogKey: "built-in-iron", source: "Built in", name: "Pressing Iron", default_watts: 1200, category: "iron" },
  { id: "blender", catalogKey: "built-in-blender", source: "Built in", name: "Blender", default_watts: 350, category: "blender" },
];

const keywordMap = [
  ["fan", "fan"],
  ["television", "tv"],
  ["tv", "tv"],
  ["fridge", "fridge"],
  ["refrigerator", "fridge"],
  ["freezer", "fridge"],
  ["conditioner", "ac"],
  ["ac", "ac"],
  ["light", "light"],
  ["bulb", "light"],
  ["laptop", "laptop"],
  ["computer", "laptop"],
  ["washing", "washer"],
  ["washer", "washer"],
  ["microwave", "microwave"],
  ["pump", "pump"],
  ["iron", "iron"],
  ["blender", "blender"],
];

function escapeSvgText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function applianceImageFor(appliance) {
  const source = `${appliance.category || ""} ${appliance.name || ""}`.toLowerCase();
  const match = keywordMap.find(([keyword]) => source.includes(keyword));
  const art = applianceArtwork[match?.[1] || "default"];
  const title = escapeSvgText(appliance.name || "Appliance");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <rect width="160" height="160" rx="18" fill="${art.bg}"/>
      <g fill="none" stroke="${art.stroke}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        ${art.icon}
      </g>
      <title>${title}</title>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function mergeApplianceCatalog(customAppliances = []) {
  const builtInNames = new Set(
    fallbackAppliances.map((appliance) => appliance.name.toLowerCase())
  );

  const custom = customAppliances
    .filter((appliance) => appliance.name)
    .filter((appliance) => !builtInNames.has(appliance.name.toLowerCase()))
    .map((appliance) => ({
      ...appliance,
      catalogKey: `custom-${appliance.id || appliance.name}`,
      source: "Admin",
    }));

  return [...fallbackAppliances, ...custom];
}
