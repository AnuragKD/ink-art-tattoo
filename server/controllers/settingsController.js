import StudioSettings from '../models/StudioSettings.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await StudioSettings.findOne();
    if (!settings) {
      settings = await StudioSettings.create({});
    }
    return res.json({ success: true, data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await StudioSettings.findOne();
    if (!settings) {
      settings = new StudioSettings({});
    }

    const files = req.files || {};

    if (files.introFile && files.introFile[0]) {
      settings.introSectionImage = await uploadToCloudinary(files.introFile[0].buffer, 'ink-art-tattoo/banners');
    } else if (req.body.introSectionImage) {
      settings.introSectionImage = req.body.introSectionImage;
    }

    if (files.ethosFile && files.ethosFile[0]) {
      settings.studioEthosImage = await uploadToCloudinary(files.ethosFile[0].buffer, 'ink-art-tattoo/banners');
    } else if (req.body.studioEthosImage) {
      settings.studioEthosImage = req.body.studioEthosImage;
    }

    if (files.contactFile && files.contactFile[0]) {
      settings.contactBannerImage = await uploadToCloudinary(files.contactFile[0].buffer, 'ink-art-tattoo/banners');
    } else if (req.body.contactBannerImage) {
      settings.contactBannerImage = req.body.contactBannerImage;
    }

    if (files.ctaFile && files.ctaFile[0]) {
      settings.ctaBannerImage = await uploadToCloudinary(files.ctaFile[0].buffer, 'ink-art-tattoo/banners');
    } else if (req.body.ctaBannerImage) {
      settings.ctaBannerImage = req.body.ctaBannerImage;
    }

    if (req.body.noticeText) {
      settings.noticeText = req.body.noticeText;
    }

    await settings.save();
    return res.json({ success: true, message: 'Studio settings and site images updated successfully', data: settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
