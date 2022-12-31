import React, { useState } from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onNotificationClick = (notification) => {
    navigate(notification.cta.data.url);
  };

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
        <NovuProvider
          subscriberId={"<YOUR_SUBSCRIBER_ID>"}
          applicationIdentifier={"<YOUR_APP_ID>"}
        >
          <PopoverNotificationCenter onNotificationClick={onNotificationClick}>
            {({ unseenCount }) => (
              <NotificationBell unseenCount={unseenCount} colorScheme="light" />
            )}
          </PopoverNotificationCenter>
        </NovuProvider>
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
