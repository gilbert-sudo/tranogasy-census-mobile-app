import { Link } from 'wouter';
import { BiLogOutCircle } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { TbHelp } from "react-icons/tb";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";
const UserPage = () => {
  const { logout } = useLogout();

  //redux
  const user = useSelector((state) => state.user);
  const censusTakerId = user._id;
  // Render the main content
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>TranoGasy - Gilbert Madagascar</title>
      <link
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n    ::-webkit-scrollbar {\n      width: 8px;\n    }\n\n    /* Track */\n    ::-webkit-scrollbar-track {\n      background: #f1f1f1;\n    }\n\n    /* Handle */\n    ::-webkit-scrollbar-thumb {\n      background: #888;\n    }\n\n    /* Handle on hover */\n    ::-webkit-scrollbar-thumb:hover {\n      background: #555;\n    }\n\n    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');\n\n    body {\n      background-color: #EEEFF3;\n      font-family: 'Poppins', sans-serif;\n    }\n\n    .card {\n      width: 375px;\n      border: none;\n      border-radius: 10px;\n    }\n\n    .media {\n      border: 1px solid #EBEDEC;\n    }\n\n    .fa-angle-down {\n      margin-top: 13px;\n    }\n\n    p.text-muted {\n      font-size: 14px;\n    }\n\n    .list {\n      list-style: none;\n      line-height: 50px;\n      font-size: 14px;\n    }\n\n    ul.list li:hover {\n      border: none;\n      background-color: #ECF2FE;\n      color: #224bba;\n      cursor: pointer;\n    }\n  ",
        }}
      />
      <div className="container d-flex justify-content-center mt-5">
        <div className="card mt-5 px-4 pt-4 pb-2">
          <div className="media p-2">
            <img
              alt=""
              src="https://ik.imagekit.io/ryxb55mhk/Tranogasy/user-thumbail.png?updatedAt=1679574248519"
              className="mr-1 align-self-start"
            />
            <div className="media-body">
              <div className="d-flex flex-row justify-content-between">
                <h6 className="mt-2 mb-0">{user && (user.name+user.firstname)}</h6>
                <i className="fas fa-angle-down mr-3 text-muted"> </i>
              </div>
              <p className="text-muted">
                {(user && user.googleID) || user.facebookID
                  ? user.email
                  : user.phone}
              </p>
            </div>
          </div>
          <ul className="list text-muted mt-3 pl-0">
            <Link to={`/update-fullname/${censusTakerId}`}>
              <li>
                <i className="fas mr-3 ml-1">
                  <FaUserEdit className="mr-2" style={{ fontSize: "20px" }} />
                  Modifier votre nom d'utisateur
                </i>
              </li>
            </Link>
            {/* <Link to={`/update-email/${censusTakerId}`}>
              <li>
                <i className="fas mr-3 ml-1">
                  <FaMailBulk className="mr-2" style={{ fontSize: "20px" }} />
                  Modifier votre Adresse Email
                </i>
              </li>
            </Link> */}
            {/* <Link to={`/update-password/${censusTakerId}`} className='disabled'>
              <li>
                <i className="fas mr-3 ml-1">
                  <FaLock className="mr-2" style={{ fontSize: "20px" }} />
                  Modifier votre mot de passe
                </i>
              </li>
            </Link>
            <Link to={`/update-contact/${censusTakerId}`} className='disabled'>
              <li>
                <i className="fas mr-3 ml-1">
                  <FaPhoneAlt className="mr-2" style={{ fontSize: "20px" }} />
                  Modifier votre contact
                </i>
              </li>
            </Link> */}
             <Link to={`/aaa`}>
              <li>
                <i className="fas mr-3 ml-1">
                  <TbHelp className="mr-2" style={{ fontSize: "20px" }} />
                  A propos de l'application
                </i>
              </li>
            </Link> 
            <li onClick={logout}>
              <i className="fas mr-3 ml-1" style={{ color: "#7cbd1e" }}>
                <BiLogOutCircle className="mr-2" style={{ fontSize: "20px" }} />
                Se déconnecter
              </i>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserPage;
