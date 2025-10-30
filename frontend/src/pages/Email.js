import React, { useContext,useState } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import { Navigate } from "react-router-dom";
import { Context } from "../index.js";
import NavBar from '../components/Navbar/SendEmailNavBar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

// HomePage Component
export default function Email() {

  const [name, setName] = useState('');
  const { isAuthenticated } = useContext(Context);

 
  /**
   * Handles sending an email based on the selected problem.
   * This function will be passed down to the FeatureCard component
   * @param {string} emailTitle - The title of the email (e.g., "Family Problem").
   * @param {string} emailDescription - The body/description of the email.
   */
  const handleSendEmail = async (emailTitle, emailDescription) => {
  const email = "varadwagh327@gmail.com";
  try {
    // Validate name
    if (!name.trim()) {
      toast.error("Please enter your name before sending an email.");
      return;
    }

    const senderName = name;
    const senderEmail = email;

    console.log(`Attempting to send email:
      Subject: ${emailTitle}
      Body: ${emailDescription}
      From: ${senderName} (${senderEmail})
    `);

    // Send API request
    const response = await axios.post(
      "http://localhost:4000/api/user/Email/email",
      {
        name: senderName,
        title: emailTitle,
        description: emailDescription,
        email: senderEmail,
      },
      { withCredentials: true }
    );

    console.log("Email sent successfully:", response.data);
    toast.success("Email sent successfully! ✅");

  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.data : error.message);
    toast.error("Failed to send email. Please try again later. ❌");
  }
};

  
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    }

  return (
    <>
      {/* Tailwind CSS CDN for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Configure Tailwind to use Inter font */}
      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      <div>
        <NavBar />
      </div>
      <div className="font-inter min-h-screen bg-gray-100 flex flex-col">
        {/* User Input Section - Enhanced Card UI */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                Your Contact Information
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
                Please provide your name and email address so we can send the automated email on your behalf.
              </p>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-200 ease-in-out placeholder-gray-400 text-gray-800"
                    placeholder="E.g., John Doe"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 flex-grow">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Send Email Problems</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={
                  <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h4l1-1 1-3m-6-8a4 4 0 110 8 4 4 0 010-8zm5 0a4 4 0 110 8 4 4 0 010-8z" />
                  </svg>
                }
                title="Family Problem"
                description="I need to request a leave of absence due to an urgent personal family matter that requires my immediate attention. I'll keep you informed regarding my anticipated return as soon as I have more clarity on the situation. I appreciate your understanding."
                onSendEmail={handleSendEmail} // Pass the handler function as a prop
              />
              <FeatureCard
                icon={
                  <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                title="Emergency"
                description="Emergency leave is an urgent, unscheduled work absence for sudden, critical personal situations that demand immediate attention."
                onSendEmail={handleSendEmail}
              />
              <FeatureCard
                icon={
                  <svg className="w-12 h-12 text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 8a8 8 0 01-8-8m8 8v1m-8-1v1m8-1H3m9 0h10M4 18h4m-4 0a8 8 0 008 8" />
                  </svg>
                }
                title="Major Life"
                description="I need to request a leave of absence due to a major personal matter that requires my full attention. I will keep you informed regarding my return."
                onSendEmail={handleSendEmail}
              />
              <FeatureCard
                icon={
                  <svg className="w-12 h-12 text-red-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  </svg>
                }
                title="Workload problem"
                description="Our team provides ongoing support and maintenance to ensure your application runs smoothly."
                onSendEmail={handleSendEmail}
              />
              <FeatureCard
                icon={
                  <svg className="w-12 h-12 text-yellow-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2M7 9h14a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
                  </svg>
                }
                title="Money problem"
                description="Leave for money problems typically falls under Personal Leave or using your accrued PTO. It's for urgent personal financial matters that require your immediate absence."
                onSendEmail={handleSendEmail}
              />
              <FeatureCard
                icon={
                  <svg className="w-12 h-12 text-indigo-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253m9 0c1.168.776 2.754 1.253 4.5 1.253s3.332-.477 4.5-1.253m-9 0V3c0-.621-.504-1.125-1.125-1.125S9.75 2.379 9.75 3v3.253M12 6.253h-3.75m3.75 0h3.75m-3.75 0A9.75 9.75 0 0121 12c0 5.353-4.347 9.75-9.75 9.75S1.5 17.353 1.5 12A9.75 9.75 0 0112 6.253z" />
                  </svg>
                }
                title="Health Reasons "
                description="I need to take a leave of absence for health reasons, and I'll keep you updated on my anticipated return."
                onSendEmail={handleSendEmail}
              />
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

// Reusable Feature Card Component
function FeatureCard({ icon, title, description, onSendEmail }) {
  const handleClick = () => {
    onSendEmail(title, description);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-semibold text-gray-900 mb-3 font-inter">{title}</h3>
      <p className="text-gray-600 mb-6 font-inter">{description}</p>
      <button
        type='button'
        onClick={handleClick}
        className="border-2 border-blue-600 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-8 py-3 my-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Send Email
      </button>
    </div>
  );
}