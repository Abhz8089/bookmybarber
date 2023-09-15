
export const styles = {
  chatWithMeButton: {
    cursor: "pointer",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    borderRadius: "50%",
    // Background
    backgroundImage: `url(https://thumbs.dreamstime.com/b/print-148081454.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "84px",
    // Size
    width: "84px",
    height: "84px",
  },
  avatarHello: {
    // Position
    position: "absolute",
    left: "calc(-100% - 44px - 28px)",
    top: "calc(50% - 24px)",
    // Layering
    zIndex: "10000",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    padding: "12px 12px 12px 16px",
    borderRadius: "24px",
    // Color
    backgroundColor: "#f9f0ff",
    color: "black",
  },
  supportWindow: {
    // Position
    position: "fixed",
    bottom: "116px",
    right: "24px",
    // Size
    width: "420px",
    height: "530px",
    maxWidth: "calc(100% - 48px)",
    maxHeight: "calc(100% - 48px)",
    backgroundColor: "#525151",

    // Border
    borderRadius: "12px",
    border: `2px solid #7a39e0`,
    overflow: "hidden",
    // Shadow
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
  },
  emailFormWindow: {
    width: "100%",
    overflow: "hidden",
    transition: "all 0.5s ease",
    WebkitTransition: "all 0.5s ease",
    MozTransition: "all 0.5s ease",
    background: "white",
  },
  stripe: {
    position: "relative",
    top: "-45px",
    width: "100%",
    height: "308px",
    backgroundColor: "#000",
    transform: "skewY(-12deg)",
  },
  topText: {
    position: "relative",
    width: "100%",
    top: "15%",
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
  },
  emailInput: {
    width: "66%",
    textAlign: "center",
    outline: "none",
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #7a39e0",
  },
  bottomText: {
    position: "absolute",
    width: "100%",
    top: "60%",
    color: "#7a39e0",
    fontSize: "24px",
    fontWeight: "600",
  },
  loadingDiv: {
    position: "absolute",
    height: "100%",
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
  loadingIcon: {
    color: "#7a39e0",
    position: "absolute",
    top: "calc(50% - 51px)",
    left: "calc(50% - 51px)",
    fontWeight: "600",
  },
  chatEngineWindow: {
    width: "100%",
    backgroundColor: "#fff",
  },

  //-------

  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    color: "black",
  },

  chatContainer: {
    display: "flex",
    height: "100%",
  },
  contactList: {
    width: "20%",
    background:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD9dxBV2UU2Z8UyF3sDligT7uz2-PG9Y9n_sz2Z3jKP_vObMAhfcm0lC2EWNquUNpLJ6w&usqp=CAU')",
    padding: "10px",
  },
  contact: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    cursor: "pointer",
    background: "gray",
  
    width: "4rem",
    height: "4rem",
    borderRadius:'10px'
  },
  chatWindow: {
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background:
      "url(https://e0.pxfuel.com/wallpapers/875/426/desktop-wallpaper-i-whatsapp-background-chat-whatsapp-graffiti-thumbnail.jpg)",
  },
  chatHeader: {
    backgroundColor: "#2579",
    color: "#ffffff",
    padding: "10px",
    textAlign: "center",
  },
  chatMessages: {
    flex: 1,
    maxHeight: "100%", // Limit the height
    overflowY: "auto", // Enable vertical scrolling
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  message: {
    borderRadius: "10px",
    padding: "5px 10px",
    maxWidth: "80%",
    marginBottom: "10px",
    backgroundColor: "black",
    color: "white",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderTop: "1px solid #ccc",
  },
  inputField: {
    flex: 1,
    marginRight: "10px",
    padding: "5px 10px",
    border: "1px solid #ccc",
  },
  sendButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};
