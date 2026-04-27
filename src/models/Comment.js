import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  blog: { type: mongoose.Types.ObjectId, ref: 'blog', required: true },
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

const Comment = mongoose.models.comment || mongoose.model('comment', commentSchema);
export default Comment;
