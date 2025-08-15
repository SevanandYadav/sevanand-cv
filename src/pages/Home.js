import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <main>
      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          <ProjectCard
            title="Portfolio Website"
            description="A modern, responsive React portfolio showcasing projects and skills, deployed on GitHub Pages."
            link="https://github.com/SevanandYadav/sevanand-cv"
          />
        </div>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Email: sevanandyadav@gmail.com</p>
      </section>
    </main>
  );
}
