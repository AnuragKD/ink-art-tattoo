export const STUDIO_INFO = {
  name: "Ink Art Tattoo Studio",
  tagline: "Sanctuary of Custom Body Art & Masterful Ink",
  established: 2014,
  location: {
    address: "Nileshwaram, Nileshwar",
    city: "Kasaragod-671314, Kerala",
    coordinates: { lat: 12.2533, lng: 75.1328 },
    mapUrl: "https://maps.google.com/?q=Nileshwaram,+Nileshwar,+Kasaragod-671314,+Kerala"
  },
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "contact@inkarttattoo.com",
    bookingEmail: "contact@inkarttattoo.com"
  },
  hours: {
    weekdays: "10:00 AM — 8:00 PM",
    saturday: "10:00 AM — 9:00 PM",
    sunday: "11:00 AM — 6:00 PM",
    notice: "By Appointment & Direct WhatsApp Consultations Only"
  },
  socials: {
    instagram: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
    facebook: "https://facebook.com/inkarttattoostudio",
    pinterest: "https://pinterest.com/inkarttattoostudio",
    youtube: "https://youtube.com/inkarttattoostudio"
  },
  stats: [
    { value: "5,000+", label: "Custom Tattoos Inked" },
    { value: "10+", label: "Years of Craftsmanship" },
    { value: "100%", label: "Medical Grade Sterile Setup" },
    { value: "1", label: "Resident Master Tattoo Artist" }
  ]
};

export const ARTISTS = [
  {
    id: "master-artist",
    name: "Marcus Vance",
    role: "Studio Founder & Lead Tattoo Artist",
    specialization: "Micro-Realism, Fine Line & Custom Body Art",
    experience: "12+ Years Experience",
    awards: ["Best Micro-Realism Award 2023", "Fine Line Artistry Excellence"],
    bio: "Lead tattoo artist and founder of Ink Art Tattoo Studio. Specializing in single-needle hyper-realism, custom fine line geometry, traditional Irezumi, and bespoke body artwork tailored specifically for every client.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    workPreview: [
      "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=80"
    ],
    social: { instagram: "@inkarttattoo_nileshwar" },
    rate: "Custom Quote on WhatsApp",
    available: true
  }
];

export const TATTOO_STYLES = [
  {
    id: "micro-realism",
    title: "Micro-Realism",
    subtitle: "High precision single-needle miniature portraiture & architecture",
    description: "Micro-realism distills museum-quality paintings, pets, mythology, and intricate sculptures into ultra-detailed skin miniature art.",
    recommendedPlacement: "Forearm, Inner Bicep, Calf, Ribcage",
    recommendedSize: "3 to 7 inches",
    averageDuration: "4 — 8 Hours",
    suitableArtist: "Marcus Vance",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=800&q=80",
    painLevel: "Moderate (3/5)",
    careComplexity: "High (Requires sunscreen & strict hydration)"
  },
  {
    id: "fine-line",
    title: "Fine Line & Geometry",
    subtitle: "Whisper-thin continuous needlework, sacred geometry & flora",
    description: "Ethereal, clean lines crafted with 1RL and 3RL needles. Designed to age gracefully and follow the natural anatomical curves.",
    recommendedPlacement: "Collarbone, Wrist, Behind Ear, Spine",
    recommendedSize: "2 to 10 inches",
    averageDuration: "2 — 5 Hours",
    suitableArtist: "Elena Rostova",
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=800&q=80",
    painLevel: "Low to Moderate (2/5)",
    careComplexity: "Standard"
  },
  {
    id: "irezumi",
    title: "Japanese Irezumi",
    subtitle: "Mythological dragons, koi, samurai armor & wind bar backgrounds",
    description: "Rich historical Japanese body art featuring bold outlines, deep black waves, cherry blossoms, and intense storytelling.",
    recommendedPlacement: "Full Sleeve, Backpiece, Leg Sleeve, Chest Plate",
    recommendedSize: "Large to Full Body Suite",
    averageDuration: "12 — 40 Hours (Multi-Session)",
    suitableArtist: "Kenji Takahashi",
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=800&q=80",
    painLevel: "High (4/5 depending on area)",
    careComplexity: "Multi-session healing protocol"
  },
  {
    id: "trash-polka",
    title: "Trash Polka & Graphic",
    subtitle: "Avant-garde combination of realism, lettering, geometric shapes & crimson ink",
    description: "Created in Germany, Trash Polka combines raw photorealism with graphic elements, typography, and intense crimson contrast.",
    recommendedPlacement: "Chest, Outer Arm, Thigh, Back",
    recommendedSize: "Medium to Large",
    averageDuration: "6 — 12 Hours",
    suitableArtist: "Kai Holloway",
    image: "https://images.unsplash.com/photo-1590246814884-578a37440207?auto=format&fit=crop&w=800&q=80",
    painLevel: "Moderate to High (3.5/5)",
    careComplexity: "High contrast preservation required"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "The Archangel Michael",
    category: "Micro-Realism",
    artist: "Marcus Vance",
    placement: "Full Outer Arm",
    hours: "9.5 hrs",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "g2",
    title: "Celestial Botanical Sleeve",
    category: "Fine Line",
    artist: "Elena Rostova",
    placement: "Forearm to Wrist",
    hours: "4 hrs",
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "g3",
    title: "Ryu Dragon Full Backpiece",
    category: "Irezumi",
    artist: "Kenji Takahashi",
    placement: "Full Back",
    hours: "32 hrs",
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "g4",
    title: "Cybernetic Anarchy",
    category: "Trash Polka",
    artist: "Kai Holloway",
    placement: "Chest Plate",
    hours: "8 hrs",
    image: "https://images.unsplash.com/photo-1590246814884-578a37440207?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "g5",
    title: "Venice Renaissance Portrait",
    category: "Micro-Realism",
    artist: "Marcus Vance",
    placement: "Thigh",
    hours: "7 hrs",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "g6",
    title: "Wild Iris & Sacred Geometry",
    category: "Fine Line",
    artist: "Elena Rostova",
    placement: "Ribcage",
    hours: "3.5 hrs",
    image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=80"
  }
];

export const REVIEWS = [
  {
    id: "r1",
    name: "Alexander Hayes",
    role: "Architect & Art Collector",
    rating: 5,
    date: "June 2024",
    artist: "Marcus Vance",
    comment: "Ink Art Tattoo is unlike any tattoo studio in North America. From the private concierge consultation to the pristine sterile environment, the experience was as luxury as buying fine art in Soho. Marcus’s micro-realism single-needle work is mind-blowing.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "r2",
    name: "Sophia Chen",
    role: "Creative Director",
    rating: 5,
    date: "May 2024",
    artist: "Elena Rostova",
    comment: "Elena transformed my vision into an anatomical masterpiece. The fine-line precision is surgical. Pain management and aftercare protocol were handled with elite professionalism.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "r3",
    name: "Julian Thorne",
    role: "Fashion Photographer",
    rating: 5,
    date: "April 2024",
    artist: "Kenji Takahashi",
    comment: "Kenji is a living legend. My full sleeve took 4 sessions over 3 months. Every line carries weight, history, and perfection. Worth every single dollar.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
  }
];

export const BLOG_POSTS = [
  {
    id: "b1",
    slug: "aftercare-guide-preserving-fine-line-ink",
    title: "The Golden Rules of Tattoo Aftercare: Preserving Fine Line & Micro-Realism Ink",
    category: "Aftercare & Health",
    readTime: "6 Min Read",
    date: "July 14, 2024",
    author: "Elena Rostova",
    excerpt: "Learn how medical-grade second skin, moisture barriers, and UV protection preserve razor-sharp line precision for decades.",
    content: `
      <p class="lead">Tattoo longevity is determined 50% by the artist's technique and 50% by your commitment to the initial 14-day healing cycle.</p>
      <h3>1. The First 48 Hours: Dermal Shield Protocol</h3>
      <p>Leave your medical-grade breathable film on for 24 to 48 hours unless fluid accumulation breaks the perimeter seal. Wash only with lukewarm water and fragrance-free antibacterial cleanser.</p>
      <h3>2. Hydration Without Suffocation</h3>
      <p>Apply a pea-sized amount of specialized tattoo balm 2-3 times daily. Excess ointment traps bacteria and delays skin regeneration.</p>
      <h3>3. The UV Factor</h3>
      <p>Sunlight is the primary enemy of dark pigment. After 3 weeks of healing, apply SPF 50+ mineral sunscreen whenever exposed to direct sunlight.</p>
    `,
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "b2",
    slug: "evolution-of-japanese-irezumi",
    title: "Sacred Mythology: The Storytelling & Symbolism of Japanese Irezumi",
    category: "Tattoo Culture",
    readTime: "8 Min Read",
    date: "June 28, 2024",
    author: "Kenji Takahashi",
    excerpt: "Exploring the deep cultural history of dragons, koi swimming upstream, and cherry blossom metaphors in Irezumi body suites.",
    content: `
      <p class="lead">Irezumi is not simply a decorative image; it is an architectural garment designed specifically for your anatomical proportions.</p>
      <h3>The Dragon (Ryu): Wisdom & Mastery over Elements</h3>
      <p>Unlike Western dragons associated with destruction, Japanese dragons represent benevolent wisdom, water control, and spiritual strength.</p>
    `,
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=80"
  }
];

export const FAQS = [
  {
    q: "How far in advance do I need to book an appointment?",
    a: "Our resident master tattooists are typically booked 2 to 6 weeks in advance. We recommend submitting your booking inquiry as early as possible with reference images and body placement details."
  },
  {
    q: "What is your hourly rate and deposit policy?",
    a: "Rates vary between $280/hr and $400/hr depending on the artist and complexity of the piece. A non-refundable deposit of $150–$300 is required upon booking confirmation to secure your date."
  },
  {
    q: "How do you ensure sterile and hygienic standards?",
    a: "We operate at medical-grade hygiene standards. All needles are single-use EO gas sterilized cartridges opened directly in front of you. Machines and workstations undergo hospital-grade disinfectant protocol."
  },
  {
    q: "Can I bring my own reference images or custom artwork?",
    a: "Absolutely. During your initial consultation, your artist will synthesize your references and body topography to craft a 100% custom piece designed specifically for you."
  },
  {
    q: "What should I do to prepare on the day of my tattoo?",
    a: "Get a full 8 hours of sleep, eat a substantial meal high in protein 1-2 hours prior, stay well-hydrated, and refrain from consuming alcohol or blood-thinning medications 24 hours prior."
  }
];
