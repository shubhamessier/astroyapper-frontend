import { useState } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

function App() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <Layout
      onAboutClick={showAbout ? undefined : () => setShowAbout(true)}
      showBackButton={showAbout}
      onBack={() => setShowAbout(false)}
      title={showAbout ? "About" : undefined}
    >
      {showAbout ? <About /> : <Home />}
    </Layout>
  );
}

export default App;