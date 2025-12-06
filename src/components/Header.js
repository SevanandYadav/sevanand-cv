export default function Header() {
    return (
      <header className="header">
        <div className="header-content">
          <img src="https://raw.githubusercontent.com/SevanandYadav/sevanand-cv/data/public/self.png" alt="Sevanand Yadav" className="profile-image" />
          <h1>Sevanand Yadav</h1>
          <p className="tagline">Staff Software Engineer</p>
          <nav>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#certifications">Certifications</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>
    );
  }