import React, { useState } from "react";

const Home = () => {
  const [message, setMessage] = useState("");
  const [subscriber, setSubscriber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ message, subscriber });
    setMessage("");
    setSubscriber("");
  };

  return (
    <div className="home">
      <nav className="navbar">
        <h2>Notify</h2>
      </nav>
      <main className="homeContainer">
        <h3>Send notifications to your users</h3>
        <form
          className="notification__form"
          onSubmit={handleSubmit}
          method="POST"
        >
          <label htmlFor="title">Notification Title</label>
          <textarea
            rows={5}
            name="title"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Let the user know that"
          />
          <label htmlFor="subscriber">Subscribers</label>

          <select
            value={subscriber}
            name="subscriber"
            onChange={(e) => setSubscriber(e.target.value)}
          >
            <option value="Select">Select</option>
          </select>
          <button>SEND NOTIFICATION</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
