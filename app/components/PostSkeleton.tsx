'use client';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  border: ${({ theme }) => `${theme.borderWidth.sm} solid ${theme.colors.neonBlue}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PreviewContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const AvatarSkeleton = styled.div<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neonBlue};
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.base};
`;

type SkeletonElementProps = {
  width: string;
  height: string;
};

export const SkeletonElement = styled.div.attrs<SkeletonElementProps>((props) => ({
  'aria-label': 'Skeleton Element',
  width: props.width,
  height: props.height
}))`
  background: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 0.25rem;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  margin-bottom: 0.45rem;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

type PostSkeletonProps = {
  className?: string;
  preview?: boolean;
};

export const PostSkeleton = ({ className = '', preview }: PostSkeletonProps) => {
  if (preview) {
    return (
      <SkeletonWrapper aria-label="Loading post" className={className}>
        <PreviewContentWrapper>
          <AvatarSkeleton aria-label="Avatar Skeleton" size="40px" />
          <TextColumn>
            <SkeletonElement width="20%" height="0.8rem" />
            <SkeletonElement width="80%" height="1.875rem" />
            <SkeletonElement width="100%" height="1rem" />
            <SkeletonElement width="20%" height="2.625rem" />
          </TextColumn>
        </PreviewContentWrapper>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper aria-label="Loading post" className={className}>
      <ContentWrapper>
        <AvatarSkeleton aria-label="Avatar Skeleton" size="60px" />
        <SkeletonElement width="20%" height="0.8rem" />
        <SkeletonElement width="80%" height="1.875rem" />
        <SkeletonElement width="85%" height="1rem" />
        <SkeletonElement width="90%" height="1rem" />
        <SkeletonElement width="75%" height="1rem" />
      </ContentWrapper>
    </SkeletonWrapper>
  );
};
