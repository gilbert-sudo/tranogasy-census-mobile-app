import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useMessage } from "../hooks/useMessage";
import { useBooking } from "../hooks/useBooking";
import { useSelector } from "react-redux";
import { Link } from "wouter";

const ContactAgentForm = ({ propertyId, imageId, cityId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const client = useSelector((state) => state.user);
  const booking = useSelector((state) => state.booking);
  const [isBooked, setIsBooked] = useState(false);
  const [messageId, setMessageId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const resetAllInputs = () => {
    setEmail("");
    setMessage("");
    setName("");
    setPhone("");
  };

  const {
    postMessage,
    isLoading,
    msgError,
    bootstrapClassname,
    resetAgentInput,
  } = useMessage();

  const { cancelBooking } = useBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = client._id;
    postMessage(
      name,
      phone,
      email,
      message,
      propertyId,
      userId,
      imageId,
      cityId
    );
  };

  const cancelMessage = () => {
    cancelBooking(messageId);
    setIsBooked(false);
    setErrorMessage("Votre demande a été annulée");
  };

  const verifyBookingState = () => {
    if (client) {
      const message = booking.filter(
        (booking) =>
          booking.user._id === client._id && booking.property._id === propertyId
      );
      if (message.length !== 0 && message.length === 1) {
        setMessageId(message[0]._id);
        setIsBooked(true);
      }
    }
  };

  useEffect(() => {
    if (resetAgentInput) {
      resetAllInputs();
    }
  }, [resetAgentInput]);

  useEffect(() => {
    if (booking) {
      verifyBookingState();
    }
  }, [booking]);

  return (
    <div className="bg-white widget border rounded">
      <h3 className="h4 text-black widget-title mb-3">
        contacter l'agent immobilier
      </h3>
      <form action="" className="form-contact-agent" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Votre nom complet</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isBooked || !client}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Téléphone</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">+261</span>
            </div>
            <input
              type="number"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isBooked || !client}
              // required="ON"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email <nb style={{ color: "red" }}>(pas obligatoire)</nb>
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isBooked || !client}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">
            Message <nb style={{ color: "red" }}>(pas obligatoire)</nb>
          </label>
          <textarea
            style={{ minHeight: "100px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            className="form-control"
            disabled={isBooked || !client}
          ></textarea>
        </div>

        {isBooked === false && (
          <div className="form-group">
            <input
              type="submit"
              id="phone"
              className="btn btn-primary"
              defaultValue="Envoyer le message"
              disabled={isLoading || !client}
            />
          </div>
        )}
      </form>
      {isBooked === true && (
        <div className="form-group">
          <button className="btn btn-danger" onClick={cancelMessage}>
            Annuler ma reservation
          </button>
        </div>
      )}
      {msgError && (
        <div className={bootstrapClassname}>
          {errorMessage && errorMessage ? errorMessage : msgError}
        </div>
      )}
      {!client && (
        <div className="alert alert-danger">
          Veuillez d'abord vous connecter pour envoyer une demande{" "}
          <Link to="/login">
            <u style={{ color: "blue" }}>Se connecter</u>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ContactAgentForm;
