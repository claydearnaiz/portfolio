import { personalInfo } from "@/data/personal";

export function FooterSection() {
  return <footer className="site-footer page-width"><p>© {new Date().getFullYear()} {personalInfo.name}</p><a className="text-link" href="#hero">Back to top ↑</a></footer>;
}
