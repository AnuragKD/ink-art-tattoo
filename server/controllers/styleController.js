import Style from '../models/Style.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const SEED_STYLES = [
  {
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

export const getStyles = async (req, res) => {
  try {
    let styles = await Style.find().sort({ createdAt: -1 });
    if (styles.length === 0) {
      await Style.insertMany(SEED_STYLES);
      styles = await Style.find().sort({ createdAt: -1 });
    }
    return res.json({ success: true, count: styles.length, data: styles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createStyle = async (req, res) => {
  try {
    const { title, subtitle, description, recommendedPlacement, recommendedSize, averageDuration, suitableArtist, painLevel, careComplexity } = req.body;
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
      recommendedPlacement,
      recommendedSize,
      averageDuration,
      suitableArtist,
      image,
      painLevel,
      careComplexity,
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
