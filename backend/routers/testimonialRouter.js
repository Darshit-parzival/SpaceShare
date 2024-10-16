const router = require("express").Router();
const Testimonial = require("../models/testimonialModel");

router.post("/add", async (req, res) => {
  try {
    const { userName, userId, testimonial } = req.body;

    if (!userName || !testimonial || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTestimonial = new Testimonial({
      userName: userName,
      userId: userId,
      testimonial: testimonial,
    });

    const savedTestimonial = await newTestimonial.save();

    if (!savedTestimonial) {
      return res.status(400).json({ message: "Internal server error" });
    }

    return res.status(201).json({
      message: "Testimonialsent successfully.",
      testimonialId: savedTestimonial._id,
      name: savedTestimonial.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const testimonialData = await Testimonial.find();
    res.status(200).json(testimonialData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial message not found" });
    }

    return res.status(200).json({
      message: "Testimonial deleted successfully.",
      testimonialId: deletedTestimonial._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
