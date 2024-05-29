import React from 'react';
import styled from 'styled-components';
import { SiUfc } from "react-icons/si";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-left">
        <Link to="/">
          <SiUfc className="icon-u" />
        </Link>
      </div>
      <div className="footer-right">
        <div className="footer-column">
          <h3>UFC</h3>
          <ul>
            <li><a href="#">Faqja 1</a></li>
            <li><a href="#">Faqja 2</a></li>
            <li><a href="#">Faqja 3</a></li>
            <li><a href="#">Faqja 4</a></li>
            <li><a href="#">Faqja 5</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Social Media</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Help</h3>
          <ul>
            <li><a href="#">Fight Pass FAQ</a></li>
            <li><a href="#">Devices</a></li>
            <li><a href="#">Press Credentials</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Ad Choices</a></li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .footer-left {
    display: flex;
    align-items: center;
  }

  .icon-u {
    width: 120px; /* Shtoni madhësinë që deshironi për ikonën */
    height: auto;
  }

  .footer-right {
    display: flex;
    gap: 20px;
  }

  .footer-column {
    flex: 1;
  }

  .footer-column h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .footer-column ul {
    list-style-type: none;
    padding: 0;
  }

  .footer-column ul li {
    margin-bottom: 5px;
  }

  .footer-column ul li a {
    color: #fff;
    text-decoration: none;
  }

  .footer-column ul li a:hover {
    text-decoration: underline;
  }
`;

export default Footer;

