import * as Yup from "yup";

export const resourceSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  examType: Yup.string().required("Exam type is required"),
  subject: Yup.string().required("Subject is required"),
  topic: Yup.string().required("Topic is required"),
  microTopic: Yup.string(),
  file: Yup.mixed().required("PDF file is required"),
});


export const resourceUpdateSchema = Yup.object({
  title: Yup.string().required(),
  examType: Yup.string().required(),
  subject: Yup.string().required(),
  topic: Yup.string().required(),
});