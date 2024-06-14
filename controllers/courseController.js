import Course from "../models/course";

const GetCourses = async (req, res) => {
  const courses = await Course.find({ userId: req.userId });
  res.json(courses);
};
const CreateCourse = async (req, res) => {
  const courseData = req.body;
  const course = new Course(courseData);
  await course.save();
  res.status(201).json(course);
};

const UpdateCourse = async (req, res) => {
  const { id } = req.params;
  const courseData = req.body;
  const course = await Course.findOneAndUpdate(
    { _id: id, userId: req.userId },
    courseData,
    { new: true }
  );
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};
const DeleteCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOneAndDelete({ _id: id, userId: req.userId });
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(204).send();
};

export const CourseController = {
  GetCourses,
  CreateCourse,
  UpdateCourse,
  DeleteCourse,
};
