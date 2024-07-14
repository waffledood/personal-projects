import React, { useRef, useEffect, useState } from "react";

import Block from "./Block";

import styles from "./Page.module.css";

function Page() {
  const titleRef = useRef();
  const [title, setTitle] = useState();
  const [blocks, setBlocks] = useState([
    { id: 1, content: "First note" },
    { id: 2, content: "Second note" },
    { id: 3, content: "Third note" },
  ]);

  useEffect(() => {
    console.log("blocks:", blocks);
  }, [blocks]);

  const placeholderValue = "Untitled";

  return (
    <div className={styles.pageContainer}>
      <h1
        contentEditable={true}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.h1}
        data-placeholder-text={placeholderValue}
      >
        {title}
      </h1>
      <Block />
    </div>
  );
}

export default Page;
