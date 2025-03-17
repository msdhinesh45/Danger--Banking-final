export default function Footer() {
  return (
      <footer
          className= "footer text-white" // Changed to white
          style={{
              position: "relative",
              bottom: 0,
              width: "100%",
              backgroundColor: "black",
              textAlign: "center",
              padding: "10px 0",
              color: "white", // Ensured all text is white
              fontSize: "14px",
          }}
      >
          <p style={{ color:"white", fontWeight: "bold", fontSize: "16px" }}>Danger-Banking</p>
          <p>© 2025 Dhinesh Kumar Murugesan | dangerbanking@gmail.com</p> 
          <p>All rights reserved.</p>
      </footer>
  );
}
