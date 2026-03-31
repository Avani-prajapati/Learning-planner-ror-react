export const MockVideoPlayer = ({ src }: { src: string }) => (
    <div data-testid="video-player" data-src={src} />
  );
  
  export const MockAddCommentForm = () => (
    <div data-testid="add-comment-form" />
  );
  
  export const MockCommentCard = ({ comment }: { comment: { body: string } }) => (
    <div data-testid="comment-card">{comment.body}</div>
  );