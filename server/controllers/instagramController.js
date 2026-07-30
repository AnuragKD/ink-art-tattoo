import InstagramFeed from '../models/InstagramFeed.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const SEED_INSTAGRAM = [
  {
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bd472?auto=format&fit=crop&w=600&q=80",
    permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
    likes: "1.8k",
    comments: "94"
  },
  {
    image: "https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&w=600&q=80",
    permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
    likes: "2.4k",
    comments: "152"
  },
  {
    image: "https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=600&q=80",
    permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
    likes: "1.1k",
    comments: "68"
  },
  {
    image: "https://images.unsplash.com/photo-1590246814884-578a37440207?auto=format&fit=crop&w=600&q=80",
    permalink: "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
    likes: "3.5k",
    comments: "230"
  }
];

export const getInstagramFeed = async (req, res) => {
  try {
    let posts = await InstagramFeed.find().sort({ createdAt: -1 });
    if (posts.length === 0) {
      await InstagramFeed.insertMany(SEED_INSTAGRAM);
      posts = await InstagramFeed.find().sort({ createdAt: -1 });
    }
    return res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createInstagramPost = async (req, res) => {
  try {
    const { permalink, likes, comments, caption } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/instagram');
    }

    if (!image) {
      return res.status(400).json({ success: false, message: 'Image file or URL is required' });
    }

    const post = new InstagramFeed({
      image,
      permalink: permalink || "https://www.instagram.com/ink_art_tattoostudio/?hl=en",
      likes: likes || "1.5k",
      comments: comments || "80",
      caption,
    });

    await post.save();
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateInstagramPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/instagram');
    }

    const post = await InstagramFeed.findByIdAndUpdate(id, updateData, { new: true });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Instagram post not found' });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteInstagramPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await InstagramFeed.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Instagram post not found' });
    }
    return res.json({ success: true, message: 'Post deleted successfully', data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
