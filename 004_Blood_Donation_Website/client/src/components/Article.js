import React from "react";
import "./Article.css";

const Article = () => {
  return (
    <div className="blog-container">
      <div className="blog1">
        <h1>The Life-Saving Impact of Donating Blood</h1>
        <p>
          Every two seconds, someone in the world needs blood. Whether it's a
          patient undergoing surgery, a victim of a car accident, or someone
          living with a chronic illness like sickle cell anemia, donated blood
          often stands between life and death. But despite the constant need,
          many blood banks face shortages — and that’s where everyday heroes
          like you come in.
        </p>

        <h2>Why Blood Donation Matters</h2>
        <p>
          Blood cannot be manufactured; it can only come from generous donors. A
          single donation can save up to three lives, thanks to how blood is
          separated into red cells, platelets, and plasma — each used for
          different treatments.
        </p>
      </div>

      <section className="tips-section">
        <div className="blog-post-grid">
          <h2>Tips for First-Time Donors</h2>
          <div className="blog-post1">💧 <strong>Stay Hydrated:</strong> Drink plenty of water before your appointment.</div>
          <div className="blog-post1">🍽️ <strong>Eat a Healthy Meal:</strong> A balanced meal can help maintain your blood sugar levels.</div>
          <div className="blog-post1">🚫 <strong>Avoid Alcohol:</strong> Stay away from alcohol for at least 24 hours before donating.</div>
          <div className="blog-post1">👕 <strong>Wear Comfortable Clothing:</strong> Opt for short sleeves or loose-fitting clothing to make the process easier.</div>
        </div>
      </section>
    </div>
  );
};

export default Article;
