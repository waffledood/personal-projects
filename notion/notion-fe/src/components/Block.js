import React, { useRef, useState } from "react";

import styles from "./Block.module.css";

function Block() {
  const contentRef = useRef();
  const [content, setContent] = useState();

  const placeholderValue = "Write something, or press '/' for commands...";

  return (
    <div
      contentEditable={true}
      className={styles.block}
      ref={contentRef}
      onChange={(e) => setContent(e.target.value)}
      data-placeholder-text={placeholderValue}
    >
      {content}
    </div>
  );
}

export default Block;
