// import React, { useState, useEffect } from "react";
// import Loader from "./Loader"; // Adjust the path to your Loader component

// const withLoader = (WrappedComponent) => {
//   const WithLoader = (props) => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       // Simulate a delay to show the loader for demonstration purposes
//       const delay = setTimeout(() => {
//         setLoading(false); // Set loading to false after a delay (replace with your actual loading logic)
//       }, 2000);

//       return () => {
//         clearTimeout(delay); // Clear the delay timer when unmounting
//       };
//     }, []);

//     if (loading) {
//       return <Loader />;
//     }

//     return <WrappedComponent {...props} />;
//   };

//   // Add a display name to the HOC-wrapped component
//   const wrappedComponentName =
//     WrappedComponent.displayName || WrappedComponent.name || "Component";
//   WithLoader.displayName = `withLoader(${wrappedComponentName})`;

//   return WithLoader;
// };

// export default withLoader;
