import React, { useRef, useState } from "react";

import styles from "./Block.module.css";

function Block() {
  const contentRef = useRef();
  const [content, setContent] = useState();

  const placeholderValue = "Write something, or press '/' for commands...";

  return (
    <div className={styles.block}>
      <div className={styles.block_functions}>#</div>
      <div
        contentEditable={true}
        className={styles.block_content}
        ref={contentRef}
        onChange={(e) => setContent(e.target.value)}
        data-placeholder-text={placeholderValue}
      >
        {content}
      </div>
    </div>
  );
}

export default Block;
