import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
