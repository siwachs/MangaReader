import { useState } from "react";

const CommentForm: React.FC<{ initialMessage?: string }> = ({
  initialMessage = "",
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState(initialMessage);

  return (
    <form>
      {error && <p>{error}</p>}
      <div className="flex items-center">
        {/* Avatar Image */}

        {/* On non mobile rounded-20px */}
        <textarea value={initialMessage} className="flex-1" />
      </div>
    </form>
  );
};

export default CommentForm;
