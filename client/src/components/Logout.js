const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
