const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");

// Create new entry
router.post("/", async (req, res) => {
  try {
    const { userId, title, date, description, images, location } = req.body;

    // Validation
    if (!userId || !title || !date || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const entry = new Entry({
      userId,
      title,
      date,
      description,
      images: images || [],
      location: location || { lat: 0, lng: 0 },
    });

    await entry.save();

    res.status(201).json({
      message: "Entry created successfully",
      entry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating entry", error: error.message });
  }
});

// Get all entries for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.params.userId }).sort({
      date: -1,
    });

    res.json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching entries", error: error.message });
  }
});

// Get single entry by ID
router.get("/:id", async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id).populate("userId", "name email");

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json(entry);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching entry", error: error.message });
  }
});

// Search entries by title
router.get("/search/title/:title", async (req, res) => {
  try {
    const entries = await Entry.find({
      title: { $regex: req.params.title, $options: "i" },
    }).sort({ date: -1 });

    res.json(entries);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching entries", error: error.message });
  }
});

// Update entry
router.put("/:id", async (req, res) => {
  try {
    const { title, date, description, images, location } = req.body;

    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      {
        title,
        date,
        description,
        images,
        location,
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({
      message: "Entry updated successfully",
      entry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating entry", error: error.message });
  }
});

// Delete entry
router.delete("/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting entry", error: error.message });
  }
});

module.exports = router;
