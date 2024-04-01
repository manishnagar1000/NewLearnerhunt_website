// components/SummernoteEditor.js

import React, { useEffect, useRef } from 'react';
import $ from 'jquery'; // Import jQuery
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import 'summernote/dist/summernote-bs5.css'; // Import Summernote CSS
import 'summernote/dist/summernote-bs5'; // Import Summernote JS

const SummernoteEditor = () => {
  const summernoteRef = useRef(null);

  useEffect(() => {
    $(summernoteRef.current).summernote({
      placeholder: 'Hello Bootstrap 5',
      tabsize: 2,
      height: 100
    });
    // Clean up on component unmount
    return () => {
      $(summernoteRef.current).summernote('destroy');
    };
  }, []);

  return (
    <div>
      <div ref={summernoteRef}></div>
    </div>
  );
};

export default SummernoteEditor;
