import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Recipes from '../../components/Recipes';

export default function Drinks() {
  return (
    <main className="">
      <Header title="Drinks" haveSearch />
      <h1>Drinks page</h1>
      <Recipes />
      <Footer />
    </main>
  );
}
