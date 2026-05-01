import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
}

const PageLayout = ({ children, title, description }: Props) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", description);
    }
  }, [title, description]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
