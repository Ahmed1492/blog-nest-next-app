import React from 'react';

export const Skeleton = ({ className = '', variant = 'rectangular' }) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]';
  
  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        animation: 'shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
};

export const BlogCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-card">
      {/* Image skeleton with shimmer */}
      <div className="relative w-full h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
      
      <div className="p-5 space-y-3">
        {/* Category badge */}
        <Skeleton className="h-5 w-20 rounded-full" />
        
        {/* Title - 2 lines */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>
        
        {/* Description - 3 lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const BlogListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {[...Array(6)].map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const BlogDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Back button */}
      <Skeleton className="h-6 w-32 mb-6" />
      
      {/* Category */}
      <Skeleton className="h-6 w-24 rounded-full mb-5" />
      
      {/* Title */}
      <div className="space-y-3 mb-5">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-4/5" />
      </div>
      
      {/* Subtitle */}
      <div className="space-y-2 mb-7">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
      
      {/* Meta info */}
      <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
        <Skeleton className="h-4 w-32" />
        <Skeleton variant="circular" className="w-2 h-2" />
        <Skeleton className="h-4 w-24" />
      </div>
      
      {/* Featured Image */}
      <Skeleton className="w-full h-96 rounded-2xl mb-10" />
      
      {/* Content lines */}
      <div className="space-y-3">
        {[...Array(12)].map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-4" 
            style={{ width: `${Math.random() * 20 + 80}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white">
      <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i} className="px-6 py-3">
                <Skeleton className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DashboardCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-gray-200 to-gray-300 animate-shimmer" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-11 h-11 rounded-xl" />
          <div className="flex items-end gap-0.5 h-8">
            {[3, 5, 4, 6, 5, 7, 6].map((h, j) => (
              <Skeleton 
                key={j}
                className="w-1 rounded-full"
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
        </div>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
};

export default Skeleton;
