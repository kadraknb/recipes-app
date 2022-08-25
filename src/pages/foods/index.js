import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

export default function Foods() {
  return (
    <main className="">
      <Header title="Foods" haveSearch />
      <h1>Foods page</h1>
      <Recipes />
      <Footer />
    </main>
  );
}
