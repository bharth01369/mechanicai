// import React, { useState } from "react";
// import "./Sidebar.css";

// export default function Sidebar() {
//   const [isVisible, setIsVisible] = useState(true);

//   const toggle = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <>
//       {!isVisible && (
//        <>
//        <div className="special" style={{ display: 'flex', alignItems: 'center' }}>
//          <img
//            src={`${process.env.PUBLIC_URL}/toggle.png`}
//            alt="toggle"
//            style={{
//              height: "27px",
//              width: "30px",
//              marginLeft: "10px"
//            }}
//            onClick={toggle}
//          />
//          <img
//            src={`${process.env.PUBLIC_URL}/newchat.png`}
//            alt="newchat"
//            style={{ height: "41px", width: "40px", marginLeft: "45px",marginRight:'20px' }}
//            className="newchat"
//          />
//           <img
//               src={`${process.env.PUBLIC_URL}/m1.jpg`}
//               alt="logo"
//               style={{ height: "53px", width: "47px", borderRadius: "30px",marginLeft:'30vw',marginRight:'30px' }}
//             />
//        <p className="mechanic-ai">Mechanic AI</p>
//        </div>
//      </>
     
//       )}

//       {isVisible && (
//         <div className="sidebar border-end" id="toggle">
//           <div className="sidebar-header border-bottom">
//             <img
//               src={`${process.env.PUBLIC_URL}/m1.jpg`}
//               alt="logo"
//               style={{ height: "53px", width: "47px", borderRadius: "30px" }}
//             />
//             <div className="sidebar-brand">Mechanic AI</div>
//           </div>
//           <div className="icons">
//             <img
//               src={`${process.env.PUBLIC_URL}/toggle.png`}
//               alt="toggle"
//               style={{ height: "27px", width: "30px" }}
//               className="toggle"
//               onClick={toggle}
//             />
//             <img
//               src={`${process.env.PUBLIC_URL}/newchat.png`}
//               alt="newchat"
//               style={{ height: "41px", width: "40px" }}
//               className="newchat"
//             />
//           </div>
//           <ul className="sidebar-nav">
//             <li className="nav_title">Previous Chats</li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// import React, { useState } from "react";

// function Sidebar() {
//     const [query, setQuery] = useState("");   // State to store user's query
//     const [response, setResponse] = useState("");  // State to store the response from Flask
//     const [loading, setLoading] = useState(false);  // State for loading status
//     const [error, setError] = useState(null);  // State for error handling

//     const handleQuerySubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);  // Start loading
//         setError(null);  // Reset any previous errors

//         // Send the query to Flask backend
//         try {
//             const res = await fetch("http://localhost:5000/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ query }),
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 setResponse(data.response); // Set the response from Flask
//             } else {
//                 setResponse("Error: " + data.response);
//             }
//         } catch (error) {
//             setError("An error occurred: " + error.message); // Handle any fetch or server errors
//         } finally {
//             setLoading(false);  // Stop loading
//         }
//     };

//     return (
//         <div>
//             <h1>Mechanic AI Chatbot</h1>
//             <form onSubmit={handleQuerySubmit}>
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Ask a question"
//                     required
//                 />
//                 <button type="submit" disabled={loading}>Ask</button>
//             </form>

//             {loading && <p>Loading...</p>} {/* Display loading message */}
//             {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if any */}

//             <div>
//                 <h3>Response:</h3>
//                 <p>{response}</p>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;


// import React, { useState } from "react";
// import "./Sidebar.css"; // Make sure to create this CSS file for styling

// function Sidebar() {
//     const [query, setQuery] = useState("");   // State to store user's query
//     const [response, setResponse] = useState("");  // State to store the response from Flask
//     const [loading, setLoading] = useState(false);  // State for loading status
//     const [error, setError] = useState(null);  // State for error handling
//     const [messages, setMessages] = useState([]);  // State to store messages for chat history

//     const handleQuerySubmit = async (e) => {
//         e.preventDefault();
        
//         if (!query) return;

//         // Add user query to chat
//         setMessages([...messages, { sender: "user", text: query }]);
//         setQuery(""); // Clear the input field
//         setLoading(true); // Show loading spinner
        
//         try {
//             // Send the query to Flask backend
//             const res = await fetch("http://localhost:5000/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ query }),
//             });

//             const data = await res.json();

//             if (res.ok) {
//                 // Add chatbot's response to chat
//                 setMessages(prevMessages => [...prevMessages, { sender: "bot", text: data.response }]);
//             } else {
//                 setError("Error: " + data.response);
//             }
//         } catch (error) {
//             setError("An error occurred: " + error.message);
//         } finally {
//             setLoading(false); // Hide loading spinner
//         }
//     };

//     return (
//         <div className="chatbot-container">
//             <div className="chat-header">
//                 <h2>Mechanic AI Chatbot</h2>
//             </div>
//             <div className="chat-window">
//                 <div className="messages">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`message ${message.sender}`}>
//                             <p>{message.text}</p>
//                         </div>
//                     ))}
//                     {loading && (
//                         <div className="message bot">
//                             <p>Loading...</p>
//                         </div>
//                     )}
//                     {error && (
//                         <div className="message bot error">
//                             <p>{error}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <form className="chat-input" onSubmit={handleQuerySubmit}>
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Ask a question"
//                     required
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// }

// export default Sidebar;

// import React, { useState } from "react";
// import "./Sidebar.css";

// export default function Sidebar() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [query, setQuery] = useState(""); // State to store user's query
//   const [messages, setMessages] = useState([]); // State to store chat messages
//   const [loading, setLoading] = useState(false); // State for loading status
//   const [error, setError] = useState(null); // State for error handling

//   const toggle = () => {
//     setIsVisible(!isVisible);
//   };

//   const handleQuerySubmit = async (e) => {
//     e.preventDefault();
//     if (!query) return;

//     // Add user query to chat
//     setMessages([...messages, { sender: "user", text: query }]);
//     setQuery(""); // Clear the input field
//     setLoading(true); // Show loading spinner

//     try {
//       // Send the query to Flask backend
//       const res = await fetch("http://localhost:5000/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // Add chatbot's response to chat
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: "bot", text: data.response },
//         ]);
//       } else {
//         setError("Error: " + data.response);
//       }
//     } catch (error) {
//       setError("An error occurred: " + error.message);
//     } finally {
//       setLoading(false); // Hide loading spinner
//     }
//   };

//   return (
//     <div className="container">
//       <div className="sidebar">
//         {/* Sidebar content */}
//         {isVisible && (
//           <>
//             <div className="sidebar-header">
//               <img
//                 src={`${process.env.PUBLIC_URL}/m1.jpg`}
//                 alt="logo"
//                 style={{
//                   height: "53px",
//                   width: "47px",
//                   borderRadius: "30px",
//                 }}
//               />
//               <div className="sidebar-brand">Mechanic AI</div>
//             </div>
//             <div className="icons">
//               <img
//                 src={`${process.env.PUBLIC_URL}/toggle.png`}
//                 alt="toggle"
//                 style={{ height: "27px", width: "30px" }}
//                 className="toggle"
//                 onClick={toggle}
//               />
//             </div>
//             <ul className="sidebar-nav">
//               <li className="nav_title">Previous Chats</li>
//             </ul>
//           </>
//         )}
//       </div>

//       <div className="chat-area">
//         <div className="chat-window">
//           <div className="messages">
//             {messages.map((message, index) => (
//               <div key={index} className={`message ${message.sender}`}>
//                 <p>{message.text}</p>
//               </div>
//             ))}
//             {loading && (
//               <div className="message bot">
//                 <p>Loading...</p>
//               </div>
//             )}
//             {error && (
//               <div className="message bot error">
//                 <p>{error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="chat-input-container">
//           <form className="chat-input" onSubmit={handleQuerySubmit}>
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Ask a question"
//               required
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import "./Sidebar.css";

// export default function Sidebar() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [query, setQuery] = useState(""); // State to store user's query
//   const [currentMessages, setCurrentMessages] = useState([]); // State for the current chat
//   const [chatHistory, setChatHistory] = useState([]); // State to store chat history
//   const [selectedChatIndex, setSelectedChatIndex] = useState(null); // Track selected chat from history
//   const [error, setError] = useState(null); // State for error handling
//   const [isLoading, setIsLoading] = useState(false); // Loading specific to the current chat

//   const toggle = () => {
//     setIsVisible(!isVisible);
//   };

//   const handleQuerySubmit = async (e) => {
//     e.preventDefault();
//     if (!query) return;

//     const newMessage = { sender: "user", text: query };
//     setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);
//     setQuery(""); // Clear the input field
//     setIsLoading(true); // Show loading spinner for current chat only

//     try {
//       const res = await fetch("http://localhost:5000/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ query }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         const botMessage = { sender: "bot", text: data.response };
//         setCurrentMessages((prevMessages) => [...prevMessages, botMessage]);
//       } else {
//         setError("Error: " + data.response);
//       }
//     } catch (error) {
//       setError("An error occurred: " + error.message);
//     } finally {
//       setIsLoading(false); // Hide loading spinner for the current chat
//     }
//   };

//   const handleNewChat = () => {
//     // Save current chat to history only if it's not already saved
//     if (currentMessages.length > 0 && selectedChatIndex === null) {
//       setChatHistory((prevHistory) => [...prevHistory, currentMessages]);
//     }
//     // Clear current messages for a new chat
//     setCurrentMessages([]);
//     setSelectedChatIndex(null); // Clear selected chat
//   };

//   const handleChatSelection = (index) => {
//     // Save the current chat only if it hasn't been saved already
//     if (
//       currentMessages.length > 0 &&
//       selectedChatIndex === null &&
//       !chatHistory.includes(currentMessages)
//     ) {
//       setChatHistory((prevHistory) => [...prevHistory, currentMessages]);
//     }

//     // Switch to the selected chat
//     setSelectedChatIndex(index);
//     setCurrentMessages(chatHistory[index]); // Load the selected chat into currentMessages
//   };

//   const handleCurrentChatSelection = () => {
//     if (selectedChatIndex !== null) {
//       // Save the currently selected chat back to history
//       const updatedChatHistory = [...chatHistory];
//       updatedChatHistory[selectedChatIndex] = currentMessages;
//       setChatHistory(updatedChatHistory);
//     }

//     setSelectedChatIndex(null); // Return to current chat
//   };

//   const displayedMessages =
//     selectedChatIndex !== null
//       ? chatHistory[selectedChatIndex]
//       : currentMessages;

//   return (
//     <div className="container">
//       <div className="sidebar">
//         {isVisible && (
//           <>
//             <div className="sidebar-header">
//               <img
//                 src={`${process.env.PUBLIC_URL}/m1.jpg`}
//                 alt="logo"
//                 style={{
//                   height: "53px",
//                   width: "47px",
//                   borderRadius: "30px",
//                 }}
//               />
//               <div className="sidebar-brand">Mechanic AI</div>
//             </div>
//             <div className="icons">
//               <button className="new-chat-btn" onClick={handleNewChat}>
//                 New Chat
//               </button>
//               <img
//                 src={`${process.env.PUBLIC_URL}/toggle.png`}
//                 alt="toggle"
//                 className="toggle"
//                 onClick={toggle}
//               />
//             </div>
//             <ul className="sidebar-nav">
//               <li className="nav_title">Previous Chats</li>
//               {chatHistory.map((chat, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleChatSelection(index)}
//                   className={`chat-history-item ${
//                     selectedChatIndex === index ? "active" : ""
//                   }`}
//                 >
//                   Chat {index + 1}
//                 </li>
//               ))}
//               {currentMessages.length > 0 && (
//                 <li
//                   onClick={handleCurrentChatSelection}
//                   className={`chat-history-item ${
//                     selectedChatIndex === null ? "active" : ""
//                   }`}
//                 >
//                   Current Chat
//                 </li>
//               )}
//             </ul>
//           </>
//         )}
//       </div>

//       <div className="chat-area">
//         <div className="chat-window">
//           <div className="messages">
//             {displayedMessages.map((message, index) => (
//               <div key={index} className={`message ${message.sender}`}>
//                 <p>{message.text}</p>
//               </div>
//             ))}
//             {isLoading && selectedChatIndex === null && (
//               <div className="message bot">
//                 <p>Loading...</p>
//               </div>
//             )}
//             {error && (
//               <div className="message bot error">
//                 <p>{error}</p>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="chat-input-container">
//           <form className="chat-input" onSubmit={handleQuerySubmit}>
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Ask a question"
//               required
//             />
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./Sidebar.css";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    setMessages([...messages, { sender: "user", text: query }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: data.response },
        ]);
      } else {
        setError("Error: " + data.response);
      }
    } catch (error) {
      setError("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={`sidebar ${isVisible ? "visible" : "hidden"}`}>
        <div className="sidebar-header">
          <img
            src={`${process.env.PUBLIC_URL}/m1.jpg`}
            alt="logo"
            className="logo"
          />
          <div className="sidebar-brand">Mechanic AI</div>
        </div>
        <div className="icons">
          <img
            src={`${process.env.PUBLIC_URL}/toggle.png`}
            alt="toggle"
            className="toggle-icon"
            onClick={toggle}
          />
        </div>
        <ul className="sidebar-nav">
          <li className="nav-title"></li>
        </ul>
      </div>

      <div className="chat-area">
        <div className="chat-window">
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                <p>{message.text}</p>
              </div>
            ))}
            {loading && (
              <div className="message bot">
                <p>Loading...</p>
              </div>
            )}
            {error && (
              <div className="message bot error">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
        <div className="chat-input-container">
          <form className="chat-input" onSubmit={handleQuerySubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question"
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
