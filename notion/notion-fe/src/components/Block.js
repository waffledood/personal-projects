import React, { useRef, useState } from "react";

import styles from "./Block.module.css";

function Block() {
  const contentRef = useRef();
  const [content, setContent] = useState();

  const placeholderValue = "Write something, or press '/' for commands...";

  return (
    <div className={styles.block}>
      <div
        className={styles.block_content}
        ref={contentRef}
        onChange={(e) => setContent(e.target.value)}
        contentEditable={true}
        data-placeholder-text={placeholderValue}
      >
        {content}
      </div>
      <div className={styles.block_functions}>
        <button className={styles.block_functions_add}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={styles.block_functions_add_color}
            class="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Block;
