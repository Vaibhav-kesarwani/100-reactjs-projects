import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Home.css";

function Home() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true }); // Trigger animation only once

  return (
    <div className="home-container">
      <header className="hero-section">
        <br></br>
        <br></br>
        <p className="hero-subtitle">
          Your donation can make a difference in someone's life today.
        </p>
        <a href="/donate" className="hero-button">
          Become a Donor
        </a>
      </header>

      <section className="about-section">
        <h2>Why Donate Blood?</h2>
        <p>
          Blood donation is a simple act that saves millions of lives. By
          donating blood, you help those in need during surgeries, accidents,
          and medical conditions that require transfusions.
        </p>
      </section>

      {/* Stats Section with Framer Motion */}
      <motion.section
        className="stats-section"
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
        whileInView={{ opacity: 1, x: 0 }} // Animate when in view
        viewport={{ once: true }} // Trigger animation only once
        transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      >
        <h2>Donation Stats</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>1200+</h3>
            <p>Successful Donations</p>
          </div>
          <div className="stat-item">
            <h3>900+</h3>
            <p>Registered Donors</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Patients Helped</p>
          </div>
        </div>
      </motion.section>

      <section className="how-to-donate">
        <h2>How to Donate</h2>
        <ol>
          <li>Check the eligibility requirements for donating blood.</li>
          <li>Book an appointment at your nearest blood donation camp.</li>
          <li>Come prepared, stay hydrated, and donate!</li>
        </ol>
        <a href="/donate" className="donate-link">
          Learn More About the Process
        </a>
      </section>

      <footer className="footer">
        <p>
          Join our community of life-savers. Follow us on social media or
          contact us for more information.
        </p>
      </footer>
    </div>
  );
}

export default Home;
