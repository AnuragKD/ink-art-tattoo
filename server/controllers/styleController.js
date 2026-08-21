import Style from '../models/Style.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const SEED_STYLES = [
  {
    title: "Realism",
    subtitle: "3D photorealistic skin artwork & anatomical depth",
    description: "Lifelike 3D skin artwork capturing hyper-detailed portraits, nature, textures, and depth with photographic accuracy.",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Black & Grey",
    subtitle: "Smooth gradient shading & velvety contrast",
    description: "Masterful gradient shading using diluted black ink to create velvety smooth transitions, dramatic shadows, and high contrast.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Fine Line",
    subtitle: "Single-needle precision & whisper-thin needlework",
    description: "Precision single-needle needlework featuring whisper-thin lines, delicate botanical flora, and subtle continuous contours.",
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Minimalist",
    subtitle: "Clean micro-designs & subtle negative space",
    description: "Clean, understated micro-designs focusing on simplicity, essential linework, and elegant negative space.",
    image: "https://images.unsplash.com/photo-1565058384573-04e339178f88?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Traditional",
    subtitle: "Bold outlines & classic heritage motifs",
    description: "Classic American heritage style defined by bold black outlines, saturated primary colors, and iconic maritime or military imagery.",
    image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Neo-Traditional",
    subtitle: "Art nouveau borders & rich color gradients",
    description: "An evolution of classic traditional featuring varied line weights, rich art-nouveau color palettes, and mythical animal portraiture.",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Japanese",
    subtitle: "Historical Irezumi, dragons & wind bar backgrounds",
    description: "Historical Irezumi body art incorporating dragons, koi fish, samurai armor, geishas, and background wind bars.",
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Blackwork",
    subtitle: "Heavy black ink saturation & high-impact contrast",
    description: "Intense black ink saturation, bold solid shapes, and high-impact structural contrast carved directly into the skin.",
    image: "https://images.unsplash.com/photo-1590246814884-578a37440207?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Geometric",
    subtitle: "Sacred geometry & mathematical precision",
    description: "Symmetrical sacred geometry, mathematical polyhedrons, and interlocking linear patterns aligned perfectly with body anatomical lines.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Dotwork",
    subtitle: "Pointillism stippling & intricate mandalas",
    description: "Meticulous stippling and pointillism techniques creating intricate gradient shading and complex mandalas dot by individual dot.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Watercolor",
    subtitle: "Fluid color splashes & painterly brush bleeds",
    description: "Ethereal fluid art mimicking painterly brush strokes, vibrant color splashes, soft bleeds, and painterly gradients.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Lettering",
    subtitle: "Custom script calligraphy & gothic statements",
    description: "Custom script calligraphy, bold gothic typography, Chicano lettering, and hand-drawn typographic statements.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Ornamental",
    subtitle: "Lace filigree & decorative jewelry motifs",
    description: "Elegant filigree, lace patterns, chandelier jewelry, and decorative architectural motifs flowing gracefully over the body.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Tribal",
    subtitle: "Polynesian linework & ancestral symbols",
    description: "Heritage Polynesian, Marquesan, and indigenous black linework representing strength, lineage, and personal spiritual journey.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85"
  },
  {
    title: "Portrait",
    subtitle: "Hyper-realistic facial features & human expression",
    description: "Hyper-realistic human and animal face portraiture capturing expression, soul, light reflections, and fine facial features.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85"
  }
];

export const getStyles = async (req, res) => {
  try {
    let styles = await Style.find().sort({ createdAt: -1 });

    // Always ensure the 15 exact user-requested styles exist without duplicates
    const seedTitles = SEED_STYLES.map(s => s.title);
    const existingTitles = styles.map(s => s.title);

    const isMissingStyles = seedTitles.some(title => !existingTitles.includes(title));
    const hasDuplicates = new Set(existingTitles).size !== existingTitles.length;

    if (styles.length === 0 || isMissingStyles || hasDuplicates) {
      await Style.deleteMany({});
      styles = await Style.insertMany(SEED_STYLES);
    }

    return res.json({ success: true, count: styles.length, data: styles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetStyles = async (req, res) => {
  try {
    await Style.deleteMany({});
    const styles = await Style.insertMany(SEED_STYLES);
    return res.json({ success: true, message: 'Master tattoo styles reset successfully', data: styles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStyle = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/styles');
    }

    if (!image) {
      return res.status(400).json({ success: false, message: 'Style cover image is required' });
    }

    const style = new Style({
      title,
      subtitle,
      description,
      image,
    });

    await style.save();
    return res.status(201).json({ success: true, data: style });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/styles');
    }

    const style = await Style.findByIdAndUpdate(id, updateData, { new: true });
    if (!style) {
      return res.status(404).json({ success: false, message: 'Style not found' });
    }

    return res.json({ success: true, data: style });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteStyle = async (req, res) => {
  try {
    const { id } = req.params;
    const style = await Style.findByIdAndDelete(id);
    if (!style) {
      return res.status(404).json({ success: false, message: 'Style not found' });
    }

    return res.json({ success: true, message: 'Style deleted successfully', data: style });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
