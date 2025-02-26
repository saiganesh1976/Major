import React from "react";
import "./TollFree.css";
import person_1 from "../../assets/frontend_assets/person1.jpg";

const TollFree = () => {
  return (
    <div className="vigilance-committees">
      <h1>SRVAN Committee</h1>

      <section>
        <h2>Introduction</h2>
        <p>
          The Vigilance Committees are integral to ensuring transparency,
          accountability, and the effective implementation of the SMART RATION
          VITRAN AUR NIYANTRAN scheme. These committees work to prevent
          malpractices, safeguard public interests, and ensure that the benefits
          reach the intended beneficiaries.
        </p>
      </section>

      <section>
        <h2>Purpose of Vigilance Committees</h2>
        <ul>
          <li>Ensure fair and transparent distribution of ration materials.</li>
          <li>
            Monitor the activities of ration distributors to prevent corruption
            or illegal practices.
          </li>
          <li>Address grievances or complaints from beneficiaries.</li>
          <li>Implement effective grievance redressal mechanisms.</li>
          <li>
            Promote awareness and educate the public about their rights under
            the scheme.
          </li>
        </ul>
      </section>

      <section>
        <h2>Responsibilities</h2>
        <ul>
          <li>Conduct regular inspections of ration distribution centers.</li>
          <li>
            Review and evaluate ration distribution procedures and processes.
          </li>
          <li>
            Ensure timely and efficient delivery of rations to all
            beneficiaries.
          </li>
          <li>
            Investigate any complaints regarding ration distribution and take
            appropriate actions.
          </li>
          <li>
            Coordinate with local authorities to report violations or
            irregularities in the system.
          </li>
        </ul>
      </section>

      <section>
        <h2>Vigilance Committee Members</h2>
        <div className="committee-members">
          <div className="committee-member">
            <img
              src={person_1}
              alt="yashwanth"
              className="committee-member-img"
            />
            <div className="member-details">
              <h3>Jitta Yashwanth Reddy</h3>
              <p>Chairperson</p>
              <p>R.No 21311A1975</p>
              {/* <p>Contact: +91 12345 67890</p> */}
            </div>
          </div>

          <div className="committee-member">
            <img src={person_1} alt="saiganesh" className="committee-member-img" />
            <div className="member-details">
              <h3>Ratnala Sai Ganesh</h3>
              <p>Member</p>
              <p>R.No 21311A1976</p>
              {/* <p>Contact: +91 98765 43210</p> */}
            </div>
          </div>

          <div className="committee-member">
            <img src={person_1} alt="vamshi" className="committee-member-img" />
            <div className="member-details">
              <h3>Dasari Vamshi</h3>
              <p>Member</p>
              <p>R.No 21311A19C7</p>
              {/* <p>Contact: +91 45678 12345</p> */}
            </div>
          </div>

          {/* Add more members with the same structure if needed */}
        </div>
      </section>

      <section>
        <h2>Contact Us</h2>
        <div className="contact-section">
          <p>
            If you have any complaints or concerns regarding the ration
            distribution system, please contact the Vigilance Committee at:
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:21311A1976@sreenidhi.edu.in">support@srvan.gov</a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+91 6305279018"> +91-6305279018</a>
          </p>
          <p>
            <strong>Address:</strong> Near Sreenidhi College, Ghatkesar, Medchal
            dist. 501301
          </p>
        </div>
      </section>
    </div>
  );
};

export default TollFree;
