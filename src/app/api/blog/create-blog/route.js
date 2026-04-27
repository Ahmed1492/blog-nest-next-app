// POST /api/blog/create-blog  (multipart/form-data)
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { getAuthFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    // Auth check
    if (!getAuthFromRequest(request)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await request.formData();
    const blogJson = formData.get('blog');
    const imageFile = formData.get('image');

    if (!blogJson) return NextResponse.json({ success: false, message: 'Blog data missing' }, { status: 400 });
    if (!imageFile) return NextResponse.json({ success: false, message: 'Image is required' }, { status: 400 });

    const { title, subTitle, description, category, isPublished } = JSON.parse(blogJson);

    if (!title || !description || !category) {
      return NextResponse.json({ success: false, message: 'All fields required' }, { status: 400 });
    }

    // Upload image to Cloudinary
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'blog-nest', resource_type: 'image' },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(buffer);
    });

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished: Boolean(isPublished),
      image: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, message: 'Blog created!', blog });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
