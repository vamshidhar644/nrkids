// import React, { useState } from 'react';
// import { PostMongo } from '../../../helpers/PostMongo';
// import { UseAuthContext } from '../../../hooks/useAuthContext';

// const ChangePassword = ({ userData }) => {
//   const { user } = UseAuthContext();
//   const { updatePassword } = PostMongo();

//   const [oldpassword, setOldpassword] = useState();
//   const [newpassword, setNewpassword] = useState();
//   const [re_password, setRepassword] = useState();

//   const [error, setError] = useState();

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     // update password logic here...
//     if (newpassword !== re_password) {
//       setError('Not matched');
//     } else {
//       updatePassword(user._id, userData.email, oldpassword, newpassword);
//       setError('matched');
//     }
//   };

//   return (
//     <form action="" onSubmit={handleUpdate}>
//       <div className="change__password d-flex justify-content-between gap-1 flex-column">
//         <div className="d-flex flex-column ">
//           <label htmlFor="firstName" id="firstName">
//             Current Password
//           </label>
//           <input
//             className="h-100 p-3"
//             type="password"
//             name="oldpassword"
//             required
//             onChange={(e) => setOldpassword(e.target.value)}
//           />
//         </div>
//         <div className="d-flex flex-column ">
//           <label htmlFor="lastName" id="newpassword">
//             New Password
//           </label>
//           <input
//             className="h-100 p-3"
//             type="password"
//             name="lastName"
//             required
//             onChange={(e) => setNewpassword(e.target.value)}
//           />
//         </div>
//         <div className="d-flex flex-column ">
//           <label htmlFor="lastName" id="lastName">
//             Confirm Password
//           </label>
//           <input
//             className="h-100 p-3"
//             type="password"
//             name="repassword"
//             required
//             onChange={(e) => setRepassword(e.target.value)}
//           />
//         </div>
//         <button className="profile-image-upload bg-white py-1 px-3 w-100">
//           Update
//         </button>
//       </div>
//       {/* <div className="save-button justify-content-center"></div> */}
//     </form>
//   );
// };

// export default ChangePassword; 
