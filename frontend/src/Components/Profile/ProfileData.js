import React from "react";

const profileData = {
  name: "JohnDoe",
  email: "johndoe@gmail.com",
  username: "jdoe1213",
};

export const ProfileDetails = () => {
  return (
    <section>
      <header> Profile Details </header>
      <aside>
        <label> Name: {profileData.name}</label>
      </aside>
      <aside>
        <label> Email: {profileData.email}</label>
      </aside>
      <aside>
        <label> Username: {profileData.username}</label>
      </aside>
    </section>
  );
};

export const ProfileEvents = () => {
  return (
    <section>
      <header> Events </header>
    </section>
  );
};
