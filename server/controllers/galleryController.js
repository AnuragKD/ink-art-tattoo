import Gallery from '../models/Gallery.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const SEED_GALLERY = [
  {
    title: "The Archangel Michael",
    category: "Micro-Realism",
    artist: "Marcus Vance",
    placement: "Full Outer Arm",
    hours: "9.5 hrs",
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Celestial Botanical Sleeve",
    category: "Fine Line",
    artist: "Elena Rostova",
    placement: "Forearm to Wrist",
    hours: "4 hrs",
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Ryu Dragon Full Backpiece",
    category: "Irezumi",
    artist: "Kenji Takahashi",
    placement: "Full Back",
    hours: "32 hrs",
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Cybernetic Anarchy",
    category: "Trash Polka",
    artist: "Kai Holloway",
    placement: "Chest Plate",
    hours: "8 hrs",
    image: "https://images.unsplash.com/photo-1590246814884-578a37440207?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Venice Renaissance Portrait",
    category: "Micro-Realism",
    artist: "Marcus Vance",
    placement: "Thigh",
    hours: "7 hrs",
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Wild Iris & Sacred Geometry",
    category: "Fine Line",
    artist: "Elena Rostova",
    placement: "Ribcage",
    hours: "3.5 hrs",
    image: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=80"
  }
];

export const getGallery = async (req, res) => {
  try {
    let items = await Gallery.find().sort({ createdAt: -1 });
    
    // Auto-seed if collection is empty
    if (items.length === 0) {
      await Gallery.insertMany(SEED_GALLERY);
      items = await Gallery.find().sort({ createdAt: -1 });
    }

    return res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, artist, placement, hours } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/gallery');
    }

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image file or URL is required' });
    }

    const item = new Gallery({
      title: title || category || 'Untitled Tattoo',
      category: category || 'Custom Art',
      artist: artist || 'Master Artist',
      placement: placement || 'Custom Body Placement',
      hours: hours || 'Custom Session',
      image,
    });

    await item.save();
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/gallery');
    }

    const item = await Gallery.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    return res.json({ success: true, data: item });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Gallery.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    return res.json({ success: true, message: 'Gallery item removed', data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
