import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function VerifyDevice() {
  const [status, setStatus] = useState("Verifying device...");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("key");
    const macAddress = params.get("mac");

    if (!code || !macAddress) {
      setStatus("Missing verification data.");
      return;
    }

    const verify = async () => {
      try {
        const code = params.get("key"); // from URL
        const res = await axios.post("/api/v1/devices/verify", { code, macAddress });

        if (res.data.success) {
          setStatus("Device verified successfully!");

          // Redirect to homepage after 2 seconds
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setStatus("Verification failed: " + res.data.message);
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          const currentUrl = window.location.href;
          window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
        } else {
          setStatus("Error verifying device.");
        }
      }
    };

    verify();
  }, [navigate]);

  return (
    <Wrapper>
      <div>
        <h1>Device Verification</h1>
        <p>{status}</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* vertical center */
  align-items: center;     /* horizontal center */
  text-align: center;
  padding: 2rem;

  h1 {
    font-family: 'Lora', serif;
    font-weight: 700;
    font-size: 3rem;
    color: #FFFFFF;
    margin-bottom: 1rem;

    span {
      color: #57B894;
    }
  }

  p {
    font-family: 'Lora', serif;
    font-weight: 400;
    font-size: 1.5rem;
    color: #FFFFFF;
    max-width: 30em;
  }
`;
