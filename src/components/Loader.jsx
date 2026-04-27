import React from "react";

export const BlogCardSkeleton = () => (
  <div className="flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-card">
    <div className="aspect-video skeleton" />
    <div className="flex flex-col gap-3 p-4">
      <div className="w-20 h-5 skeleton rounded-full" />
      <div className="space-y-2">
        <div className="w-full h-4 skeleton rounded" />
        <div className="w-3/4 h-4 skeleton rounded" />
      </div>
      <div className="space-y-1.5">
        <div className="w-full h-3 skeleton rounded" />
        <div className="w-full h-3 skeleton rounded" />
        <div className="w-1/2 h-3 skeleton rounded" />
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-50">
        <div className="w-24 h-3 skeleton rounded" />
      </div>
    </div>
  </div>
);

export const BlogListSkeleton = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50/50">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-1 skeleton rounded mx-auto mb-5" />
        <div className="w-64 h-9 skeleton rounded-lg mx-auto mb-3" />
        <div className="w-80 h-4 skeleton rounded mx-auto" />
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {[80, 96, 88, 80, 72].map((w, i) => (
          <div key={i} style={{ width: w }} className="h-9 skeleton rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

export const BlogDetailSkeleton = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <div className="w-40 h-4 skeleton rounded mb-8" />
    <div className="w-20 h-6 skeleton rounded-full mb-5" />
    <div className="space-y-3 mb-5">
      <div className="w-full h-10 skeleton rounded" />
      <div className="w-4/5 h-10 skeleton rounded" />
    </div>
    <div className="w-full h-6 skeleton rounded mb-8" />
    <div className="w-48 h-4 skeleton rounded mb-10" />
    <div className="w-full aspect-video skeleton rounded-2xl mb-10" />
    <div className="space-y-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="w-full h-4 skeleton rounded" />
          <div className="w-full h-4 skeleton rounded" />
          <div className="w-2/3 h-4 skeleton rounded" />
        </div>
      ))}
    </div>
  </div>
);

export default { BlogCardSkeleton, BlogListSkeleton, BlogDetailSkeleton };
