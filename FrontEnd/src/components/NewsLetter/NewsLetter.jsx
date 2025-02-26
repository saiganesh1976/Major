import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="NewsLetter">
      <div>
        <div className="NewsLetter-left">
          Want New information and updates?
          <br /> Sign up for our newsletter.
        </div>
      </div>
      <div>
        <div className="Newsletter-right">
          <input type="email" placeholder="Enter your email" required />
          <button>Subscribe</button>
        </div>
        <p className="Newsletter-text">
          We care about your data. Read our{" "}
          <span className="NewsLetter-link">privacy policy</span>.
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
