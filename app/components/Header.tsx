import Link from 'next/link';

type HeaderProps = {
  pathname: string;
};

export const Header = async ({ pathname }: HeaderProps) => {
  const isAddPostPage = pathname.includes('add-post');

  return (
    <header>
      <h1 className="app-heading" data-text="Posts app">
        Posts app
      </h1>

      {!isAddPostPage && (
        <div style={{ display: 'flex', padding: '0 var(--spacing-xl)' }}>
          <Link href="/add-post" style={{ marginLeft: 'auto' }}>
            Add Post
          </Link>
        </div>
      )}
    </header>
  );
};
