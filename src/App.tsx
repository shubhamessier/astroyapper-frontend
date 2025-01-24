import { useState } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Chat } from "./pages/Chat";
import { SignUp } from "./pages/SignUp";

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'chat' | 'signup'>('home');

  const getTitle = () => {
    switch (currentPage) {
      case 'about':
        return 'About';
      case 'chat':
        return 'Chat';
      case 'signup':
        return 'Sign Up';
      default:
        return undefined;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'chat':
        return <Chat />;
      case 'signup':
        return <SignUp />;
      default:
        return <Home onSignUpClick={() => setCurrentPage('signup')} />;
    }
  };

  return (
    <Layout
      onAboutClick={currentPage === 'home' ? () => setCurrentPage('about') : undefined}
      onChatClick={currentPage === 'home' ? () => setCurrentPage('chat') : undefined}
      showBackButton={currentPage !== 'home'}
      onBack={() => setCurrentPage('home')}
      title={getTitle()}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;