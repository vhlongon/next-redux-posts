import type { Metadata } from 'next';
import { AddPostForm } from '../components/AddPostForm';

export default function AddPostPage() {
  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <h2 style={{ textAlign: 'center' }}>Add Post</h2>
      <AddPostForm />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Add Post'
};
