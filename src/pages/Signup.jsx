import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Mail, Lock, User, GraduationCap, Building2, CheckCircle } from 'lucide-react';
import { NIGERIAN_UNIVERSITIES, DEPARTMENTS, ACADEMIC_LEVELS } from '../utils/constants';
import './Login.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        school: '',
        department: '',
        level: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.school) {
            newErrors.school = 'School is required';
        }

        if (!formData.department) {
            newErrors.department = 'Department is required';
        }

        if (!formData.level) {
            newErrors.level = 'Level is required';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...signupData } = formData;
            await signup(signupData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        } catch (error) {
            setErrors({ general: error.message || 'Signup failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-blob auth-blob-1"></div>
                <div className="auth-blob auth-blob-2"></div>
                <div className="auth-blob auth-blob-3"></div>
            </div>

            <div className="auth-container">
                <div className="auth-card animate-fadeIn">
                    <div className="auth-header">
                        <h1 className="auth-logo">CAMPULSE</h1>
                        <h2 className="auth-title">Create Account</h2>
                        <p className="auth-subtitle">Join thousands of students staying organized</p>
                    </div>

                    {success ? (
                        <div className="auth-success animate-fadeIn">
                            <CheckCircle size={20} />
                            <span>Account created successfully! Redirecting...</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="auth-form">
                            {errors.general && (
                                <div className="auth-error animate-fadeIn">
                                    <span>{errors.general}</span>
                                </div>
                            )}

                            <Input
                                label="Full Name"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                error={errors.fullName}
                                icon={<User size={20} />}
                                required
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                icon={<Mail size={20} />}
                                required
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    icon={<Lock size={20} />}
                                    required
                                />

                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={errors.confirmPassword}
                                    icon={<Lock size={20} />}
                                    required
                                />
                            </div>

                            <div className="input-wrapper">
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-xs)', display: 'block', color: 'var(--color-dark)' }}>
                                    University <span style={{ color: 'var(--color-error)' }}>*</span>
                                </label>
                                <select
                                    name="school"
                                    value={formData.school}
                                    onChange={handleChange}
                                    className="auth-select"
                                    required
                                >
                                    <option value="">Select your university</option>
                                    {NIGERIAN_UNIVERSITIES.map(uni => (
                                        <option key={uni} value={uni}>{uni}</option>
                                    ))}
                                </select>
                                {errors.school && <span className="input-error-message">{errors.school}</span>}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                                <div className="input-wrapper">
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-xs)', display: 'block', color: 'var(--color-dark)' }}>
                                        Department <span style={{ color: 'var(--color-error)' }}>*</span>
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="auth-select"
                                        required
                                    >
                                        <option value="">Select department</option>
                                        {DEPARTMENTS.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                    {errors.department && <span className="input-error-message">{errors.department}</span>}
                                </div>

                                <div className="input-wrapper">
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 'var(--spacing-xs)', display: 'block', color: 'var(--color-dark)' }}>
                                        Level <span style={{ color: 'var(--color-error)' }}>*</span>
                                    </label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="auth-select"
                                        required
                                    >
                                        <option value="">Select level</option>
                                        {ACADEMIC_LEVELS.map(level => (
                                            <option key={level} value={level}>{level}</option>
                                        ))}
                                    </select>
                                    {errors.level && <span className="input-error-message">{errors.level}</span>}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                loading={loading}
                                className="btn-full"
                            >
                                Create Account
                            </Button>
                        </form>
                    )}

                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link-bold">Sign in</Link>
                        </p>
                    </div>
                </div>

                <div className="auth-features">
                    <div className="feature-card animate-slideInRight" style={{ animationDelay: '0.1s' }}>
                        <div className="feature-icon">📚</div>
                        <h3>Smart Planner</h3>
                        <p>Never miss a deadline again</p>
                    </div>
                    <div className="feature-card animate-slideInRight" style={{ animationDelay: '0.2s' }}>
                        <div className="feature-icon">🎯</div>
                        <h3>Opportunities</h3>
                        <p>Find gigs & scholarships</p>
                    </div>
                    <div className="feature-card animate-slideInRight" style={{ animationDelay: '0.3s' }}>
                        <div className="feature-icon">👨‍🏫</div>
                        <h3>Find Tutors</h3>
                        <p>Get academic support</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
