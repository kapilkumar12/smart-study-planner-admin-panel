"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axiosInstance";
import { Upload, FileText, Loader2 } from "lucide-react";
import {resourceSchema} from "@/validations/resource.validation";


export default function page() {

  const [previewFile, setPreviewFile] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    examType: "",
    subject: "",
    topic: "",
    microTopic: "",
    tags: "",
    keywords: "",
    file: null,
  };

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus }
  ) => {

    try {

      setStatus(null);

      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("examType", values.examType);
      formData.append("subject", values.subject);
      formData.append("topic", values.topic);
      formData.append("microTopic", values.microTopic);

      formData.append(
        "tags",
        JSON.stringify(
          values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        )
      );

      formData.append(
        "keywords",
        JSON.stringify(
          values.keywords
            .split(",")
            .map((keyword) => keyword.trim())
            .filter(Boolean)
        )
      );

      formData.append("file", values.file);

      // ✅ axiosInstance use
      const response = await axiosInstance.post(
        "/resources/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {

        setStatus({
          success: true,
          message: "Resource uploaded successfully",
        });

        resetForm();
        setPreviewFile(null);
      }

    } catch (error) {

      setStatus({
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong",
      });

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Header */}
        <div className="p-8 border-b border-gray-100">

          <div className="flex items-center gap-3 mb-2">

            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
              <FileText size={22} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add Resource
              </h1>

              <p className="text-gray-500 text-sm mt-1">
                Upload study materials in PDF format
              </p>
            </div>

          </div>

        </div>

        {/* Form */}
        <div className="p-8">

          <Formik
            initialValues={initialValues}
            validationSchema={resourceSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, status }) => (

              <Form className="space-y-6">

                {/* Status */}
                {status && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${
                      status.success
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Resource Title
                    </label>

                    <Field
                      name="title"
                      placeholder="Enter resource title"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Exam Type
                    </label>

                    <Field
                      name="examType"
                      placeholder="UPSC / SSC / Banking"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <ErrorMessage
                      name="examType"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>

                    <Field
                      name="subject"
                      placeholder="Enter subject"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Topic
                    </label>

                    <Field
                      name="topic"
                      placeholder="Enter topic"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />

                    <ErrorMessage
                      name="topic"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Micro Topic
                    </label>

                    <Field
                      name="microTopic"
                      placeholder="Enter micro topic"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags
                    </label>

                    <Field
                      name="tags"
                      placeholder="history, polity, notes"
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                </div>

                {/* Keywords */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Keywords
                  </label>

                  <Field
                    name="keywords"
                    placeholder="constitution, rights, parliament"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  />

                </div>

                {/* Description */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>

                  <Field
                    as="textarea"
                    rows={5}
                    name="description"
                    placeholder="Enter resource description"
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-black"
                  />

                </div>

                {/* File Upload */}
                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Upload PDF File
                  </label>

                  <label className="border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-all bg-gray-50">

                    <Upload className="mb-3 text-gray-500" size={40} />

                    <p className="text-sm font-medium text-gray-700">
                      Click to upload PDF
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Only PDF files allowed (Max 10MB)
                    </p>

                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {

                        const file = e.target.files[0];

                        if (file) {
                          setFieldValue("file", file);
                          setPreviewFile(file.name);
                        }
                      }}
                    />

                  </label>

                  {previewFile && (
                    <div className="mt-3 bg-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-gray-700">
                      Selected File: {previewFile}
                    </div>
                  )}

                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500 text-xs mt-2"
                  />

                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                >

                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Resource
                    </>
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