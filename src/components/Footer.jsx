const Footer = () => {
  const footerStyle = {
    backgroundColor: 'lightblue',
    textAlign: 'center',
    color: 'blue',
    fontStyle: 'italic',
    fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Bloglist app, Full-Stack-Open-Courses, University of Helsinki 2024
      </em>
    </div>
  );
};

export default Footer;
