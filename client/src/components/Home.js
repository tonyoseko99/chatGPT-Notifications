import React, { useState, useEffect } from "react";
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
  //👇🏻 State representing the list of subscribers
  const [subscribers, setSubscribers] = useState([
    { firstName: "", lastName: "", subscriberId: "Select", _id: "null" },
  ]);

  //👇🏻 Fetch the list of subscribers on page load
  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const request = await fetch("/subscribers");
        const response = await request.json();
        setSubscribers([...subscribers, ...response]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSubscribers();
  }, []);

  // Makes the POST request to the server
  async function sendNotification() {
    try {
      const request = await fetch("/notify", {
        method: "POST",
        body: JSON.stringify({ message, subscriber }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  //👇🏻 Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendNotification();
    setMessage("");
    setSubscriber("");
  };

  return (
    <div className="home">
      <nav className="navbar">
        <h2>Notify</h2>
        <NovuProvider
          subscriberId={"63b09e91b12729443b4add9b"}
          applicationIdentifier={"IA83uamTXILA"}
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
            {subscribers.map((subscriber) => (
              <option
                key={subscriber._id}
                value={`${subscriber.firstName} ${subscriber.lastName} - ${subscriber.subscriberId}}}`}
              >
                Select
              </option>
            ))}
          </select>
          <button>SEND NOTIFICATION</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
