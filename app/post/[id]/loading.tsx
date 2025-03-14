import { PostSkeleton } from '@/app/components/PostSkeleton';

export default function Loading() {
  return (
    <div style={{ padding: 'var(--spacing-xl)' }}>
      <h2 style={{ textAlign: 'center' }}>Loading post...</h2>
      <div
        style={{
          width: '85vw',
          maxWidth: '936px',
          fontSize: '1.25rem'
        }}
      >
        <PostSkeleton />
      </div>
    </div>
  );
}
