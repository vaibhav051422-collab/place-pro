import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import { SectionCard, Button, Badge } from '../components';
import './Profile.css';

export const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Developer',
    email: 'john@example.com',
    phone: '+1-555-123-4567',
    location: 'San Francisco, CA',
    title: 'Full Stack Engineer',
    bio: 'Passionate about building scalable applications and mentoring junior developers.',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL'],
    experience: [
      { company: 'Tech Company A', role: 'Senior Developer', years: '2021-Present' },
      { company: 'Tech Company B', role: 'Developer', years: '2019-2021' },
    ],
    education: [
      { school: 'University XYZ', degree: 'BS Computer Science', year: 2019 },
    ],
    certifications: [
      'AWS Solutions Architect',
      'Google Cloud Professional',
      'Kubernetes Expert',
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const handleSave = () => {
    setUser(editForm);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  return (
    <div className="profile">
      <Navbar />

      <main className="profile-main">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-title">{user.title}</p>
            <p className="profile-bio">{user.bio}</p>
          </div>
          <Button 
            variant="primary" 
            size="md"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X size={16} /> : <Edit2 size={16} />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </motion.div>

        <div className="profile-grid">
          {/* Contact Information */}
          <SectionCard title="Contact Information" delay={0}>
            {isEditing ? (
              <div className="edit-form">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text"
                    value={editForm.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="info-display">
                <div className="info-item">
                  <Mail size={20} />
                  <div>
                    <span className="label">Email</span>
                    <span className="value">{user.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Phone size={20} />
                  <div>
                    <span className="label">Phone</span>
                    <span className="value">{user.phone}</span>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin size={20} />
                  <div>
                    <span className="label">Location</span>
                    <span className="value">{user.location}</span>
                  </div>
                </div>
              </div>
            )}
          </SectionCard>

          {/* Skills */}
          <SectionCard title="Skills" delay={0.1}>
            <div className="skills-display">
              {user.skills.map((skill, idx) => (
                <Badge key={idx} variant="primary" size="md">{skill}</Badge>
              ))}
            </div>
          </SectionCard>

          {/* Experience */}
          <SectionCard title="Experience" delay={0.2}>
            <div className="experience-list">
              {user.experience.map((exp, idx) => (
                <div key={idx} className="experience-item">
                  <Briefcase size={20} className="exp-icon" />
                  <div>
                    <h4 className="exp-role">{exp.role}</h4>
                    <p className="exp-company">{exp.company}</p>
                    <p className="exp-years">{exp.years}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Education */}
          <SectionCard title="Education" delay={0.3}>
            <div className="education-list">
              {user.education.map((edu, idx) => (
                <div key={idx} className="education-item">
                  <div>
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-school">{edu.school}</p>
                    <p className="edu-year">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Certifications */}
          <SectionCard title="Certifications" delay={0.4}>
            <div className="certifications-list">
              {user.certifications.map((cert, idx) => (
                <div key={idx} className="certification-item">
                  <Badge variant="success" size="md">{cert}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Statistics */}
          <SectionCard title="Statistics" delay={0.5}>
            <div className="stats-grid">
              {[
                { label: 'Profile Views', value: '1.2K' },
                { label: 'Interview Passes', value: '85%' },
                { label: 'Average Rating', value: '4.8★' },
              ].map((stat, idx) => (
                <div key={idx} className="stat-item">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {isEditing && (
          <motion.div
            className="edit-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button variant="primary" size="lg" onClick={handleSave}>
              <Save size={18} />
              Save Changes
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Profile;
