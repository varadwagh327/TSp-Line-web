import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { Navigate } from "react-router-dom";
import NavBar from "./Navbar/NavBar.js";
import Footer from "./Footer.js";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );

        // ✅ Sort messages by createdAt in DESCENDING order
        // (newest messages first — latest date at the top)
        // 🔽 Changed comment and verified the sorting direction
        const sortedMessages = (data.message || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMessages(sortedMessages); // ✅ Updated: set sorted data
        console.log("Sorted messages (descending):", sortedMessages);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Loading Spinner
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
      <p className="ml-4 text-gray-600">Loading messages...</p>
    </div>
  );

  // Message Card
  const MessageCard = ({ element }) => (
    <div
      className="card mb-8 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 
                 hover:shadow-2xl hover:-translate-y-1 transform border-t-4 border-indigo-500
                 md:p-8 lg:w-[calc(50%-1rem)] xl:w-[calc(33%-1.33rem)]"
      key={element._id}
    >
      <div className="details space-y-3 text-sm sm:text-base">
        <p className="font-semibold text-gray-700 border-b pb-1">
          Name:{" "}
          <span className="font-normal text-indigo-600">
            {element.firstName} {element.lastName}
          </span>
        </p>
        <p className="text-gray-600">
          Email:{" "}
          <span className="font-medium text-gray-800 break-words">
            {element.email}
          </span>
        </p>
        <p className="text-gray-600">
          Phone:{" "}
          <span className="font-medium text-gray-800">{element.phone}</span>
        </p>
        <div className="pt-3 border-t mt-4">
          <p className="font-bold text-gray-700 mb-1">Message:</p>
          <p className="text-gray-900 leading-relaxed bg-indigo-50 p-3 rounded-lg border border-indigo-200">
            {element.message}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NavBar />

      <section className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-900 mb-12 border-b-4 border-indigo-600 inline-block mx-auto">
            Client Messages 📨
          </h1>

          {isLoading ? (
            <LoadingSpinner />
          ) : messages && messages.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {messages.map((element) => (
                <MessageCard key={element._id} element={element} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white shadow-xl rounded-2xl mx-auto max-w-lg">
              <h1 className="text-3xl font-bold text-gray-800">
                No Messages Found! 😟
              </h1>
              <p className="mt-4 text-gray-600">
                It looks like your inbox is empty.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Messages;
