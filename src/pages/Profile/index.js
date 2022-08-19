import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function Profile() {
  return (
    <main>
      <Header title="Profile" />
      <h1>Profile page</h1>
      <h3 data-testid="profile-email">email@email.com</h3>

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
