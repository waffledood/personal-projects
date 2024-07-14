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
      {blocks.map(({ id, content }, index) => (
        <Block
          key={id}
          contentVal={content}
          addNewBlockHandler={() => {
            console.log(`Adding new Block below ${index}!`);
            setBlocks((prevBlocks) => {
              const blocksCopy = [...prevBlocks];

              // insert the new Block below the current Block
              blocksCopy.splice(index + 1, 0, {
                // TODO - Update dummy values of new Block inserted
                id: blocks.length + 1,
                content: "New block content",
              });

              return blocksCopy;
            });
          }}
        />
      ))}
    </div>
  );
}

export default Page;
