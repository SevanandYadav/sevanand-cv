import ProjectCard from "../components/ProjectCard";

export default function Home() {
  return (
    <main>
      <section id="projects">
        <h2>Projects</h2>
        <ProjectCard
          title="Portfolio"
          description="A React-based portfolio hosted on GitHub Pages."
          link="https://github.com/SevanandYadav/sevanand-cv"
        />
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>Email: your.email@example.com</p>
      </section>
    </main>
  );
}
