"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2, FileText } from "lucide-react";

export default function page() {

  const { id } = useParams();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResource = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/resources/single/${id}`);

      if (res.data.success) {
        setResource(res.data.data);
      }

      console.log(res.data.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchResource();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Resource not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center gap-3">
        <FileText />
        <h1 className="font-semibold text-lg">
          {resource.title}
        </h1>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1">
        <iframe
          src={resource.file.url}
          className="w-full h-full"
        />
      </div>

    </div>
  );
}