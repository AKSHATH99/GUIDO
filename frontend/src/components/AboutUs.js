import React from "react";
import { motion } from "framer-motion";
import HeaderComponent from "./HeaderComponent";



// const HeaderComponent = () => (
//   <header className="bg-white shadow-md p-4">
//     <div className="container mx-auto flex justify-between items-center">
//       <h1 className="text-3xl font-bold text-rose-500">GUIDO</h1>
//       <nav className="flex space-x-4">
//         <button className="text-purple-600 hover:text-rose-500">Home</button>
//         <button className="text-purple-600 hover:text-rose-500">Explore</button>
//         <button className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600">
//           Login
//         </button>
//       </nav>
//     </div>
//   </header>
// );

const AboutUs = () => {
  const features = [
    {
      title: "1:1 Guidance",
      description: "Personalized mentoring tailored to your career goals.",
      icon: "🚀"
    },
    {
      title: "Top Mentors",
      description: "Learn directly from industry leaders.",
      icon: "💡"
    },
    {
      title: "Career Growth",
      description: "Tools and resources to fast-track your success.",
      icon: "🌈"
    }
  ];

  const testimonials = [
    {
      name: "Emily Carter",
      role: "Software Engineer at Amazon",
      quote: "GUIDO transformed my career path.",
      image: "/images/student1.jpg"
    },
    {
      name: "Daniel Thompson",
      role: "Frontend Developer at Spotify",
      quote: "Mentorship that gave me clarity and confidence.",
      image: "/images/student2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderComponent />

      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          About <span className="text-rose-500">GUIDO</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A platform dedicated to connecting students with experienced mentors, bridging the gap between aspiration and success in the tech industry.
        </p>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our <span className="text-rose-500">Mission</span>
        </h2>
        <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto">
          Empower the next generation of tech professionals by providing personalized mentorship, strategic guidance, and direct access to industry experts.
        </p>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-[calc(33%-2rem)] bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-rose-500 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success <span className="text-rose-500">Stories</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="w-full md:w-[calc(50%-2rem)] bg-gray-100 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full mr-6 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-rose-500">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic text-gray-700">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <p className="text-center text-gray-600">© 2024 GUIDO. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;