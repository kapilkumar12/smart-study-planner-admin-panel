"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Upload, Loader2, FileText } from "lucide-react";
import { resourceUpdateSchema } from "@/validations/resource.validation";

export default function Page() {

  const { id } = useParams();
  const router = useRouter();

  const [initialValues, setInitialValues] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);

  // GET SINGLE RESOURCE
  const fetchResource = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/resources/single/${id}`);

      if (res.data.success) {

        const r = res.data.data;

        setInitialValues({
          title: r.title || "",
          description: r.description || "",
          examType: r.examType || "",
          subject: r.subject || "",
          topic: r.topic || "",
          microTopic: r.microTopic || "",
          tags: (r.tags || []).join(", "),
          keywords: (r.keywords || []).join(", "),
          file: null,
        });

        setFileName(r.file?.originalName || "");
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchResource();
  }, [id]);

  // UPDATE API
  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("examType", values.examType);
      formData.append("subject", values.subject);
      formData.append("topic", values.topic);
      formData.append("microTopic", values.microTopic);

      formData.append(
        "tags",
        JSON.stringify(values.tags.split(",").map(t => t.trim()))
      );

      formData.append(
        "keywords",
        JSON.stringify(values.keywords.split(",").map(t => t.trim()))
      );

      if (values.file) {
        formData.append("file", values.file);
      }

      const res = await axiosInstance.put(`/resources/update/${id}`, formData);

      if (res.data.success) {
        router.push("/resources");
      }

    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="p-8 border-b border-gray-100 flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
            <FileText size={20} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Update Resource
            </h1>
            <p className="text-sm text-gray-500">
              Edit your study material
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="p-8">

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={resourceUpdateSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">

                {/* GRID INPUTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Title */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Field
                      name="title"
                      className="w-full mt-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Exam Type */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Exam Type</label>
                    <Field
                      name="examType"
                      className="w-full mt-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <Field
                      name="subject"
                      className="w-full mt-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Topic */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">Topic</label>
                    <Field
                      name="topic"
                      className="w-full mt-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <Field
                    as="textarea"
                    rows={4}
                    name="description"
                    className="w-full mt-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
                  />
                </div>

                {/* TAGS */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Tags</label>
                  <Field
                    name="tags"
                    className="w-full mt-1 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* FILE */}
                <div className="border border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50">

                  <p className="text-sm text-gray-600 mb-2">
                    Current File: <span className="font-semibold">{fileName || "No file"}</span>
                  </p>

                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFieldValue("file", e.target.files[0])}
                    className="block w-full text-sm"
                  />

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 rounded-2xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Updating...
                    </>
                  ) : (
                    "Update Resource"
                  )}
                </button>

              </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>
  );
}