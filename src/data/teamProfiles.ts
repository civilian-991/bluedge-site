import type { TeamProfile } from "@/types";

export const teamProfiles: TeamProfile[] = [
  {
    slug: "strategist",
    title: "The Strategist Grendizer",
    icon: "🤖",
    description: "Master strategists plotting your brand's conquest",
    shortName: "STRATEGIST",
    stats: { atk: 70, def: 85, spd: 60, int: 95, cre: 80, wit: 88 },
    specialMove: "MASTER PLAN",
    skills: [
      { name: "Market Analysis", level: 9, maxLevel: 10, icon: "📊" },
      { name: "Brand Positioning", level: 8, maxLevel: 10, icon: "🎯" },
      { name: "Campaign Architecture", level: 9, maxLevel: 10, icon: "🏗️" },
      { name: "Client Telepathy", level: 7, maxLevel: 10, icon: "🔮" },
    ],
    equipment: [
      { name: "Crystal Ball of Insights", type: "Weapon", rarity: "legendary", icon: "🔮", description: "Reveals market trends before they happen" },
      { name: "Armor of Data", type: "Armor", rarity: "epic", icon: "🛡️", description: "+50 to all analytical defenses" },
      { name: "Scroll of ROI", type: "Accessory", rarity: "rare", icon: "📜", description: "Guarantees measurable results" },
    ],
    questLog: [
      { title: "The Great Brand Revival", client: "Fortune 500 Corp", status: "completed", xpReward: 5000, description: "Repositioned a legacy brand for the digital age" },
      { title: "Startup Launchpad", client: "TechVenture Inc", status: "completed", xpReward: 3500, description: "Zero to hero brand launch in 8 weeks" },
      { title: "The Market Domination", client: "Regional Leader", status: "active", xpReward: 8000, description: "Multi-market expansion strategy across GCC" },
    ],
    backstory: "Forged in the fires of a thousand boardroom battles, the Strategist sees patterns where others see chaos. With 20 years of campaign warfare under their belt, they command the battlefield of brands with precision and foresight.",
  },
  {
    slug: "marketing",
    title: "The Marketing Gurus",
    icon: "🧘",
    description: "Zen masters of digital enlightenment",
    shortName: "MARKETING",
    stats: { atk: 80, def: 60, spd: 90, int: 75, cre: 85, wit: 92 },
    specialMove: "VIRAL STORM",
    skills: [
      { name: "Social Sorcery", level: 10, maxLevel: 10, icon: "📱" },
      { name: "SEO Alchemy", level: 8, maxLevel: 10, icon: "🔍" },
      { name: "Content Conjuring", level: 9, maxLevel: 10, icon: "✨" },
      { name: "Analytics Vision", level: 8, maxLevel: 10, icon: "👁️" },
    ],
    equipment: [
      { name: "Hashtag Katana", type: "Weapon", rarity: "epic", icon: "⚔️", description: "Cuts through algorithmic noise" },
      { name: "Cloak of Virality", type: "Armor", rarity: "legendary", icon: "🧥", description: "Makes any content spread like wildfire" },
      { name: "Ring of Engagement", type: "Accessory", rarity: "rare", icon: "💍", description: "+200% comment and share rate" },
    ],
    questLog: [
      { title: "The Viral Awakening", client: "BAS", status: "completed", xpReward: 4500, description: "Created a campaign that broke the internet (locally)" },
      { title: "SEO Dark Arts", client: "E-commerce Giant", status: "completed", xpReward: 3000, description: "Page 1 rankings for 50+ competitive keywords" },
      { title: "Community Conquest", client: "Happy Pet", status: "active", xpReward: 6000, description: "Building a 100K-strong engaged community" },
    ],
    backstory: "Once a solitary monk of traditional advertising, the Marketing Guru discovered the digital arts and never looked back. Their social media mantras can turn a whisper into a roar across every platform.",
  },
  {
    slug: "design",
    title: "The Design Senseis",
    icon: "⚔️",
    description: "Creative warriors wielding pixels & vectors",
    shortName: "DESIGN",
    stats: { atk: 90, def: 70, spd: 85, int: 80, cre: 99, wit: 75 },
    specialMove: "PIXEL PERFECT",
    skills: [
      { name: "Visual Mastery", level: 10, maxLevel: 10, icon: "🎨" },
      { name: "UI Enchantment", level: 9, maxLevel: 10, icon: "✨" },
      { name: "Motion Magic", level: 8, maxLevel: 10, icon: "🎬" },
      { name: "Typography Jutsu", level: 9, maxLevel: 10, icon: "🔤" },
    ],
    equipment: [
      { name: "Pen of Creation", type: "Weapon", rarity: "legendary", icon: "🖊️", description: "Every stroke births a masterpiece" },
      { name: "Shield of Consistency", type: "Armor", rarity: "epic", icon: "🛡️", description: "Brand guidelines cannot be broken" },
      { name: "Amulet of Color Theory", type: "Accessory", rarity: "rare", icon: "🎨", description: "Perfect palette selection every time" },
    ],
    questLog: [
      { title: "The Identity Forge", client: "Lunore", status: "completed", xpReward: 5500, description: "Crafted a luxury brand identity from scratch" },
      { title: "The Pixel Wars", client: "Tech Startup", status: "completed", xpReward: 4000, description: "Redesigned a product used by millions" },
      { title: "The Animation Chronicle", client: "Nafsikas", status: "active", xpReward: 7000, description: "Creating an immersive brand universe" },
    ],
    backstory: "Trained in the ancient dojo of Bauhaus and Helvetica, the Design Sensei sees beauty in every grid and harmony in every composition. Their pixel-perfect creations have won hearts (and awards) across the creative realm.",
  },
  {
    slug: "research",
    title: "The Research Masters",
    icon: "🔬",
    description: "Data detectives uncovering insights",
    shortName: "RESEARCH",
    stats: { atk: 50, def: 90, spd: 55, int: 99, cre: 70, wit: 95 },
    specialMove: "DATA MINE",
    skills: [
      { name: "Deep Analysis", level: 10, maxLevel: 10, icon: "🧪" },
      { name: "Trend Prophecy", level: 9, maxLevel: 10, icon: "📈" },
      { name: "User Empathy", level: 8, maxLevel: 10, icon: "❤️" },
      { name: "Statistical Sorcery", level: 9, maxLevel: 10, icon: "📐" },
    ],
    equipment: [
      { name: "Microscope of Truth", type: "Weapon", rarity: "legendary", icon: "🔬", description: "Reveals hidden user behaviors and motivations" },
      { name: "Tome of Benchmarks", type: "Armor", rarity: "epic", icon: "📚", description: "Contains every industry standard ever recorded" },
      { name: "Compass of Insight", type: "Accessory", rarity: "rare", icon: "🧭", description: "Always points toward the right answer" },
    ],
    questLog: [
      { title: "The Hidden Pattern", client: "Four Seasons", status: "completed", xpReward: 4000, description: "Discovered untapped market segment worth millions" },
      { title: "Consumer Mind Map", client: "FMCG Brand", status: "completed", xpReward: 3500, description: "Built comprehensive customer journey model" },
      { title: "The Great Audit", client: "Regional Chain", status: "legendary", xpReward: 10000, description: "Industry-defining competitive analysis" },
    ],
    backstory: "The Research Master speaks in numbers and dreams in data. Armed with surveys, focus groups, and analytical frameworks, they uncover the truths that drive every strategic decision the guild makes.",
  },
  {
    slug: "seo",
    title: "The SEO Experts",
    icon: "⚙️",
    description: "Algorithm whisperers boosting visibility",
    shortName: "SEO",
    stats: { atk: 65, def: 75, spd: 95, int: 85, cre: 60, wit: 80 },
    specialMove: "ALGORITHM HACK",
    skills: [
      { name: "Keyword Mastery", level: 9, maxLevel: 10, icon: "🔑" },
      { name: "Technical SEO", level: 10, maxLevel: 10, icon: "⚙️" },
      { name: "Link Building", level: 8, maxLevel: 10, icon: "🔗" },
      { name: "Speed Optimization", level: 9, maxLevel: 10, icon: "⚡" },
    ],
    equipment: [
      { name: "Keyword Blade", type: "Weapon", rarity: "epic", icon: "🗡️", description: "Slices through SERP competition" },
      { name: "Backlink Chain Mail", type: "Armor", rarity: "legendary", icon: "🔗", description: "DA 90+ protection against algorithm updates" },
      { name: "Speed Boots", type: "Accessory", rarity: "rare", icon: "👟", description: "Sub-second page load times guaranteed" },
    ],
    questLog: [
      { title: "Page One Quest", client: "Mecanix", status: "completed", xpReward: 5000, description: "Dominated B2B search results in 6 months" },
      { title: "The Core Web Vitals Trial", client: "E-commerce Client", status: "completed", xpReward: 4000, description: "Perfect Lighthouse scores across the board" },
      { title: "The Local SEO Crusade", client: "Multi-Location Brand", status: "active", xpReward: 6500, description: "Top 3 local rankings in 15 cities" },
    ],
    backstory: "While others create content, the SEO Expert ensures it gets found. A master of search engine arcana, they navigate the ever-shifting landscape of algorithms with the calm confidence of a seasoned explorer.",
  },
  {
    slug: "grammar",
    title: "The Grammar Freaks",
    icon: "📚",
    description: "Perfectionists polishing every word",
    shortName: "GRAMMAR",
    stats: { atk: 60, def: 95, spd: 50, int: 90, cre: 88, wit: 99 },
    specialMove: "CRITICAL EDIT",
    skills: [
      { name: "Copy Perfection", level: 10, maxLevel: 10, icon: "✍️" },
      { name: "Tone Shaping", level: 9, maxLevel: 10, icon: "🎭" },
      { name: "Storytelling", level: 9, maxLevel: 10, icon: "📖" },
      { name: "Proofreading Radar", level: 10, maxLevel: 10, icon: "🔍" },
    ],
    equipment: [
      { name: "Red Pen of Doom", type: "Weapon", rarity: "legendary", icon: "🖊️", description: "No typo survives its mark" },
      { name: "Grammar Grimoire", type: "Armor", rarity: "epic", icon: "📕", description: "Contains every rule of every style guide" },
      { name: "Thesaurus Ring", type: "Accessory", rarity: "rare", icon: "💍", description: "Infinite synonyms at a thought's notice" },
    ],
    questLog: [
      { title: "The Brand Voice Chronicle", client: "Huddex", status: "completed", xpReward: 4500, description: "Defined a voice that speaks to millions" },
      { title: "Website Copy Overhaul", client: "SaaS Company", status: "completed", xpReward: 3000, description: "Rewrote 200+ pages for conversion and clarity" },
      { title: "The Content Kingdom", client: "Media House", status: "active", xpReward: 7500, description: "Building a content empire, one perfect sentence at a time" },
    ],
    backstory: "Armed with an Oxford comma and an unwavering eye for detail, the Grammar Freak transforms rough drafts into polished prose. They believe that every word earns its place — or faces the red pen.",
  },
];

export function getTeamProfileBySlug(slug: string): TeamProfile | undefined {
  return teamProfiles.find((tp) => tp.slug === slug);
}
