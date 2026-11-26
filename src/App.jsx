import Navbar from "./components/Navbar";
import PreLoader from "./components/PreLoader";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Expertise from "./sections/Expertise";

function App() {
  return (
    <>
      <PreLoader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Expertise />
      </main>
      <Footer />
    </>
  );
}

export default App;
