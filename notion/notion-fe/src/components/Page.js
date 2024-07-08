import React, { useRef, useState } from "react";

import Block from "./Block";

import styles from "./Page.module.css";

function Page() {
  const titleRef = useRef();
  const [title, setTitle] = useState();

  return (
    <div className={styles.pageContainer}>
      <h1
        contentEditable={true}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.h1}
      >
        {title}
      </h1>
      <Block />
    </div>
  );
}

export default Page;
