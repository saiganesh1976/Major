import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const handleContactClick = () => {
    window.location.href = "mailto:support@srvan.gov";
  };

  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to Smart Ration Vitran Aur Niyantran (SRVAN). Your privacy is
        important to us, and we are committed to protecting your personal
        information.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, Aadhaar number, contact
          details, and address for authentication and service delivery.
        </li>
        <li>
          <strong>Usage Data:</strong> Login activity, stock inquiries, and
          transaction history.
        </li>
        <li>
          <strong>Location Data:</strong> GPS-based location for finding nearby
          ration shops and verifying service eligibility.
        </li>
        <li>
          <strong>Device Information:</strong> Browser type, operating system,
          and IP address for security and analytics.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use your data to facilitate authentication, track ration allocations,
        enhance user experience, comply with regulations, and prevent fraud.
      </p>

      <h2>Data Sharing and Security</h2>
      <p>
        We employ encryption and access controls to protect your data. Your
        information is not sold or shared, except with government authorities
        for compliance.
      </p>

      <h2>Cookies and Tracking Technologies</h2>
      <p>
        We use cookies to enhance functionality and analyze usage patterns. You
        can manage cookie preferences in your browser settings.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        We do not knowingly collect data from minors. If a child's data is
        inadvertently collected, we will take steps to remove it.
      </p>

      <h2>Updates to This Privacy Policy</h2>
      <p>
        We may update this policy periodically and notify users of significant
        changes via email or in-app notifications.
      </p>

      <h2>Contact Us</h2>
      <p>For inquiries, please contact us at:</p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:21311A1976@sreenidhi.edu.in">support@srvan.gov</a>
      </p>
      <p>
        <strong>Phone:</strong> <a href="tel:+91 6305279018"> +91-6305279018</a>
      </p>
      <p>
        <strong>Address:</strong> Near Sreenidhi College, Ghatkesar, Medchal dist. 501301
      </p>
    </div>
  );
};

export default PrivacyPolicy;
