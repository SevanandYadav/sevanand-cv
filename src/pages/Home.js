import { useState, useEffect } from "react";

export default function Home() {
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [expandedCertification, setExpandedCertification] = useState(null);
  const [content, setContent] = useState(null);
  const [formStatus, setFormStatus] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/SevanandYadav/sevanand-cv/data/src/data/content.json?t=${Date.now()}`)
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Error loading content:', error));
  }, []);

  const toggleExperience = (index) => {
    setExpandedExperience(expandedExperience === index ? null : index);
  };

  const toggleCertification = (index) => {
    setExpandedCertification(expandedCertification === index ? null : index);
  };

  if (!content) return <div className="loading">Loading...</div>;

  const { about, skills, experiences, certifications, education, contact, project } = content;
  const RATE_LIMIT_MS = project?.rateLimitMs || 60000; // Default 1 minute
  return (
    <main>
      <section id="about" className="about-section">
        <div className="about-card">
          <h2>About Me</h2>
          <div className="about-content">
            <p>{about.description}</p>
            <div className="resume-download">
              <button 
                className="resume-download-btn"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = 'https://drive.google.com/uc?export=download&id=1WK7vm1v2giPnCifr9ex1AO5G3w8xTXeK';
                  link.download = 'Sevanand_Yadav_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <span className="download-icon">📄</span>
                DOWNLOAD RESUME
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((skillCategory, index) => (
            <div key={index} className="skill-category">
              <h3>{skillCategory.category}</h3>
              <div className="skills-list">
                {skillCategory.items.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="experience-section">
        <div className="experience-card">
          <h2>Experience</h2>
          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-date">{exp.duration}</div>
                <div className="experience-content">
                  <div className="experience-header" onClick={() => toggleExperience(index)}>
                    <div className="company-info">
                      <img src={exp.logo} alt={`${exp.company} logo`} className="company-logo" />
                      <div>
                        <h3 className="company-name">{exp.company}</h3>
                        <h4>{exp.position}</h4>
                      </div>
                    </div>
                    <span className={`expand-icon ${expandedExperience === index ? 'expanded' : ''}`}>▼</span>
                  </div>
                  {expandedExperience === index && (
                    <ul className="achievements">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="certifications-section">
        <div className="certifications-card">
          <h2>Certifications</h2>
          <div className="certifications-timeline">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <div className="certification-content">
                  <div className="certification-header" onClick={() => toggleCertification(index)}>
                    <h3 className="certification-category">{cert.category}</h3>
                    <span className={`expand-icon ${expandedCertification === index ? 'expanded' : ''}`}>▼</span>
                  </div>
                  {expandedCertification === index && (
                    <div className="certificates-grid">
                      {cert.certificates.map((certificate, i) => (
                        <div key={i} className="certificate-item">
                          <img src={certificate.file} alt={certificate.name} className="certificate-image" />
                          <p className="certificate-name">{certificate.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="education-section">
        <div className="education-card">
          <h2>Education</h2>
          <div className="education-timeline">
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-date">{edu.duration}</div>
                <div className="education-content">
                  <h3>{edu.institution}</h3>
                  <h4>{edu.degree}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <h2>Get In Touch</h2>
        <div className="contact-content">
          <p>I'm always open to discussing new opportunities and interesting projects.</p>
          
          <div className="contact-form">
            {formStatus && <div className="form-status">{formStatus}</div>}
            <form onSubmit={async (e) => {
              e.preventDefault();
              
              const form = e.target;
              const name = form.name.value.trim();
              const email = form.email.value.trim();
              const subject = form.subject.value.trim();
              const message = form.message.value.trim();
              
              if (!name || !email || !subject || !message) {
                setFormStatus('Please fill in all fields');
                return;
              }
              
              // Rate limiting check
              const now = Date.now();
              if (now - lastSubmitTime < RATE_LIMIT_MS) {
                const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
                setFormStatus(`Please wait ${remainingTime} seconds before sending another message`);
                return;
              }
              
              setFormStatus('Sending...');
              
              try {
                const response = await fetch('/.netlify/functions/send-email', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message,
                    to: contact?.email || 'info@seekio.in',
                    from: contact?.fromEmail || 'cv-portal@seekio.in'
                  })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                  setFormStatus('Message sent successfully');
                  setLastSubmitTime(now);
                  form.reset();
                  setTimeout(() => setFormStatus(''), 3000);
                } else {
                  throw new Error(data.message || 'Failed to send');
                }
              } catch (error) {
                setFormStatus(`Failed to send message. Please try emailing directly at ${contact?.email || 'info@seekio.in'}`);
                setTimeout(() => setFormStatus(''), 5000);
              }
            }}>
              <div className="form-row">
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              <button type="submit" className="send-btn">Send Message</button>
            </form>
          </div>

          <div className="contact-links">
            {contact?.social?.linkedin && (
              <a href={contact.social.linkedin} className="contact-link" title="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {contact?.social?.leetcode && (
              <a href={contact.social.leetcode} className="contact-link" title="LeetCode">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
      
      <button 
        className="go-to-top-btn" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Go to top"
      >
        ↑
      </button>
    </main>
  );
}
