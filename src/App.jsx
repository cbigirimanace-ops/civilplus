import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Pages that include their own Footer
const PAGES_WITH_FOOTER = ['/nos-services', '/a-propos', '/contact'];

export default function App() {
  const location = useLocation();
  const hasOwnFooter = PAGES_WITH_FOOTER.some((p) => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/produits/:slug"
              element={
                <PageWrapper>
                  <ProductDetail />
                </PageWrapper>
              }
            />
            <Route
              path="/nos-services"
              element={
                <PageWrapper>
                  <Services />
                </PageWrapper>
              }
            />
            <Route
              path="/a-propos"
              element={
                <PageWrapper>
                  <About />
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              }
            />
            <Route
              path="*"
              element={
                <PageWrapper>
                  <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
                    <div>
                      <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
                      <p className="text-gray-500 mb-6">Cette page n'existe pas.</p>
                      <a
                        href="/"
                        className="bg-accent text-white px-6 py-3 rounded-btn font-semibold hover:bg-accent-dark transition"
                      >
                        Retour à l'accueil
                      </a>
                    </div>
                  </div>
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      {!hasOwnFooter && <Footer />}
    </div>
  );
}
