import type { Metadata } from 'next';
import { AddPostForm } from '../components/AddPostForm';

export default function AddPostPage() {
  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <h2 style={{ textAlign: 'center' }}>Add Post</h2>
      <div style={{ maxWidth: '720px', width: '50vw', margin: '0 auto' }}>
        <AddPostForm />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Add Post',
  description: 'Add a new post to the list'
};
