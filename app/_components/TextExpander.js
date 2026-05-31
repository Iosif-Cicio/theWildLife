"use client"; //crosses the server-client boundary -> needed to make useState work. Client component.

import { useState } from "react";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander;

/*
The TextExpander component takes a children prop and displays the first 40 words of the text. If the user clicks the "Show more" button, the full text is displayed.
This component is useful for displaying long text content in a compact way. It improves the user experience by providing a way to expand and collapse the text as needed.
*/