import React, { useRef, useState } from "react";

function Page() {
  const titleRef = useRef();
  const [title, setTitle] = useState();

  return (
    <div>
      <h1
        contentEditable={true}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
      >
        {title}
      </h1>
    </div>
  );
}

export default Page;
