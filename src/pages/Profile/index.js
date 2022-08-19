import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmail(user.email);
    }
  }, []);

  return (
    <main>
      <Header title="Profile" />
      <h1>Profile page</h1>
      <h3 data-testid="profile-email">{email}</h3>

      <div>
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>

        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>

        <button
          data-testid="profile-logout-btn"
          type="button"
        >
          Logout
        </button>
      </div>
      <Footer />
    </main>
  );
}
