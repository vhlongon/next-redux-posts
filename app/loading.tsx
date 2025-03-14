import { PostSkeleton, SkeletonElement } from './components/PostSkeleton';

export default function Loading() {
  return (
    <div
      aria-label="Loading posts"
      style={{
        padding: 'var(--spacing-xl)'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Posts</h2>
      <SkeletonElement
        aria-hidden="true"
        style={{ margin: 'var(--spacing-lg) 0' }}
        width="130px"
        height="3rem"
      />
      <ul
        aria-label="Loading posts list"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-lg)',
          width: '85vw',
          maxWidth: '936px',
          margin: '0 auto var(--spacing-xxl) auto',
          paddingLeft: 0
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <li
            key={`post-skeleton-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            aria-hidden="true"
            style={{
              paddingBottom: 'var(--spacing-base)',
              listStyle: 'none'
            }}
          >
            <PostSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
