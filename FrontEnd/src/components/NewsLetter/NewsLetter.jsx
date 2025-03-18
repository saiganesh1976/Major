import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h2 className="newsletter-heading">
          Want new information and updates?
          <br /> Sign up for our newsletter.
        </h2>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button>Subscribe</button>
        </div>
        <p className="newsletter-text">
          We care about your data. Read our{" "}
          <span className="newsletter-link">privacy policy</span>.
        </p>
      </div>
    </div>
  );
};

export default NewsLetter;
