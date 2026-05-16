"use client";

import { useEffect,useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
    FileText,
    Search,
    Trash2,
    Eye,
    Loader2,
    Calendar,
    BookOpen,
    Pencil,
} from "lucide-react";
import Link from "next/link";

export default function page() {
    const [resources,setResources] = useState([]);
    const [loading,setLoading] = useState(true);
    const [search,setSearch] = useState("");
    const [deleteLoading,setDeleteLoading] = useState(null);

    // Fetch Resources
    const fetchResources = async () => {
        try {
            setLoading(true);

            const response = await axiosInstance.get(
                `/resources?search=${search}`
            );

            if (response.data.success) {
                setResources(response.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    },[search]);

    // Delete Resource
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmDelete) return;

        try {
            setDeleteLoading(id);

            const response = await axiosInstance.delete(
                `/resources/delete/${id}`
            );

            if (response.data.success) {
                setResources((prev) =>
                    prev.filter((item) => item._id !== id)
                );
            }
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.message ||
                "Delete failed"
            );
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Resources
                        </h1>

                        <p className="text-gray-500 mt-1 text-sm">
                            Manage your uploaded study materials
                        </p>
                    </div>

                    <Link
                        href="/dashboard/resources/add"
                        className="bg-black text-white px-5 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition-all w-fit"
                    >
                        + Add Resource
                    </Link>
                </div>

                {/* Search */}
                <div className="bg-white border border-gray-100 rounded-3xl p-5 mb-6 shadow-sm">
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-200 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="animate-spin" size={40} />
                    </div>
                ) : resources.length === 0 ? (

                    /* Empty State */
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-14 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <FileText size={38} className="text-gray-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            No Resources Found
                        </h2>

                        <p className="text-gray-500 text-sm mb-6">
                            Start uploading your study materials.
                        </p>

                        <Link
                            href="/dashboard/resources/add"
                            className="bg-black text-white px-5 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition-all inline-block"
                        >
                            Upload Resource
                        </Link>
                    </div>
                ) : (

                    /* Resource Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {resources.map((resource) => (
                            <div
                                key={resource._id}
                                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all"
                            >


                                {/* Top */}
                                <div className="flex items-start justify-between gap-4 mb-4">

                                    <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                                        <FileText size={18} />
                                    </div>

                                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                        {resource.examType}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
                                    {resource.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-500 text-sm line-clamp-3 mb-5">
                                    {resource.description ||
                                        "No description available"}
                                </p>

                                {/* Meta */}
                                <div className="space-y-3 mb-6">

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <BookOpen size={16} />
                                        <span>{resource.subject}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar size={16} />
                                        <span>
                                            {new Date(
                                                resource.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Tags */}
                                {resource.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {resource.tags.slice(0,3).map((tag,index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-3">

                                    <Link
                                        href={`/resources/view/${resource._id}`}
                                        className="flex-1 bg-black text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                                    >
                                        <Eye size={16} />
                                        View PDF
                                    </Link>

                                    <Link
                                        href={`/resources/edit/${resource._id}`}
                                        className="w-10 h-10 rounded-xl border border-blue-200 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-all"
                                    >
                                        <Pencil size={18} />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(resource._id)}
                                        disabled={deleteLoading === resource._id}
                                        className="w-10 h-10 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-all disabled:opacity-50"
                                    >
                                        {deleteLoading === resource._id ? (
                                            <Loader2
                                                className="animate-spin"
                                                size={18}
                                            />
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
