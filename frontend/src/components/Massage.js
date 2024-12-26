import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { Navigate } from "react-router-dom";
import NavBar from "./Navbar/NavBar.js";
import Footer from "./Footer.js";

const Messages = () => {
  const [message, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        ); 
        console.log(data);
        setMessages(data.message); // Ensure `data.messages` exists
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
  <>
  <div>
    <NavBar/>
  </div>
    <section className="page messages flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24">
      <div className="banner">
        {message && message.length > 0 ? (
          message.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
    <div>
      <Footer/>
    </div>
  </>
  );
};

export default Messages;