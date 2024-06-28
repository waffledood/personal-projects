import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import StickyNoteContainer from "./StickyNoteContainer";
import AddStickyNoteIcon from "./AddStickyNoteIcon";

function StickyNoteBoard() {
  const [stickyNotes, setStickyNotes] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getStickyNotes = async () => {
      try {
        const response = await axiosPrivate.get("/notes/", {
          signal: controller.signal,
        });

        console.log(response.data);

        isMounted && setStickyNotes(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getStickyNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <StickyNoteContainer stickyNotes={stickyNotes} />
      <AddStickyNoteIcon
        stickyNotes={stickyNotes}
        setStickyNotes={setStickyNotes}
      />
    </React.Fragment>
  );
}

export default StickyNoteBoard;
