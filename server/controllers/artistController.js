import Artist from '../models/Artist.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const SEED_ARTIST = {
  name: "Marcus Vance",
  role: "Studio Founder & Lead Tattoo Artist",
  specialization: "Micro-Realism, Fine Line & Custom Body Art",
  experience: "12+ Years Experience",
  awards: ["Best Micro-Realism Award 2023", "Fine Line Artistry Excellence"],
  bio: "Lead tattoo artist and founder of Ink Art Tattoo Studio. Specializing in single-needle hyper-realism, custom fine line geometry, traditional Irezumi, and bespoke body artwork tailored specifically for every client.",
  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  rate: "Custom Quote on WhatsApp",
  available: true
};

export const getArtists = async (req, res) => {
  try {
    let artists = await Artist.find();
    if (artists.length === 0) {
      await Artist.create(SEED_ARTIST);
      artists = await Artist.find();
    }
    return res.json({ success: true, count: artists.length, data: artists });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createArtist = async (req, res) => {
  try {
    const { name, role, specialization, experience, bio, rate, awards, available } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/artists');
    }

    const artist = new Artist({
      name: name || 'Master Artist',
      role: role || 'Lead Tattoo Artist',
      specialization: specialization || 'Custom Body Art',
      experience: experience || '10+ Years Experience',
      bio: bio || 'Bespoke tattoo artist.',
      rate: rate || 'Custom Quote',
      image: image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      awards: Array.isArray(awards) ? awards : awards ? [awards] : [],
      available: available !== undefined ? available : true,
    });

    await artist.save();
    return res.status(201).json({ success: true, data: artist });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/artists');
    }

    if (typeof updateData.awards === 'string') {
      updateData.awards = updateData.awards.split(',').map((a) => a.trim()).filter(Boolean);
    }

    const artist = await Artist.findByIdAndUpdate(id, updateData, { new: true });
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist not found' });
    }

    return res.json({ success: true, data: artist });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
