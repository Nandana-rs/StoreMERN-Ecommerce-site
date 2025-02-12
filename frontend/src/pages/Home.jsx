import React from 'react';
import './Home.css'; // Import the CSS file

// Import images
import bookBackground from '../assets/images/book-background.jpeg';
import textBack from '../assets/images/text-back.png';
import booksBck from '../assets/images/books-bck.png';
import fiction from '../assets/images/fiction.png';
import nonFiction from '../assets/images/non-fiction.png';
import children from '../assets/images/children.png';
import classics from '../assets/images/classics.png';
import romance from '../assets/images/romance.png';
import logo from '../assets/images/logo.png';
import penguin from '../assets/images/penguin.png';
import harpercollins from '../assets/images/harpercollins.png';
import randomhouse from '../assets/images/randomhouse.png';
import scholastic from '../assets/images/scholastic.png';
import macmillan from '../assets/images/macmillan.png';

const Home = () => {
  return (
    <div className="home">
      {/* Header Section */}
      <header style={{ backgroundImage: `url(${bookBackground})` }}>
        {/* Nav Icons */}
        <div className="nav-icons">
          <ul>
            <li><i className="fa fa-twitter"></i></li>
            <li><i className="fa fa-instagram"></i></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/registration">Signup</a></li>
            <li><a href="/sellerRegistration">Become a Seller</a></li>
            <li><a href="/authors">Featured Authors</a></li>
          </ul>
        </div>

        {/* Navbar */}
        <div className="nav-bar">
          <a href="/">
            <img className="click" src={logo} alt="BookNest Logo" />
          </a>
          <div className="nav-links">
            <a className="LINK" href="/about">About</a>
            <a className="LINK" href="/books">Our Books</a>
            <a className="LINK" href="/authors">Authors</a>
            <a className="LINK" href="/best-sellers">BEST SELLERS</a>
          </div>
        </div>

        {/* Mobile Menu */}
        <i className="fa fa-bars fa-2x" id="bars"></i>
        <div className="nav-menu">
          <i className="fa fa-times fa-2x" id="closingIcon"></i>
          <ul>
            <li className="mobileLinks"><a href="/">Home</a></li>
            <li className="mobileLinks"><a href="/books">Books</a></li>
            <li className="mobileLinks"><a href="/about">About</a></li>
          </ul>
        </div>

        {/* Hero Section */}
        <div className="main">
          <q>Hi there!</q>
          <h1 style={{ backgroundImage: `url(${textBack})` }}>
            With BookNest, Dive into a World of Stories!
          </h1>
          <p className="description">
            Discover the best books from renowned authors and explore new worlds with every page.
          </p>
          <a className="more" href="/books">EXPLORE OUR COLLECTION.</a>
        </div>
      </header>

      {/* Featured Books Section */}
      <section className="products" id="products" style={{ backgroundImage: `url(${booksBck})` }}>
        <h2>Featured Books</h2>
        <hr className="title-underline" />
        <div className="product-list">
          <div className="book">
            <img className="product-image" src={fiction} alt="Fiction" />
            <h3>Fiction</h3>
            <p className="explication">Explore imaginative worlds and compelling characters in our fiction collection.</p>
          </div>
          <div className="book">
            <img className="product-image" src={nonFiction} alt="Non-Fiction" />
            <h3>Non-Fiction</h3>
            <p className="explication">Learn from real-life stories and expert insights in our non-fiction section.</p>
          </div>
          <div className="book">
            <img className="product-image" src={children} alt="Children's Books" />
            <h3>Children's Books</h3>
            <p className="explication">Spark imagination and creativity with our collection for young readers.</p>
          </div>
          <div className="book">
            <img className="product-image" src={classics} alt="Classics" />
            <h3>Classics</h3>
            <p className="explication">Timeless literature that has shaped generations.</p>
          </div>
          <div className="book">
            <img className="product-image" src={romance} alt="Romance" />
            <h3>Romance</h3>
            <p className="explication">Fall in love with heartwarming stories and unforgettable characters.</p>
          </div>
        </div>
        <a className="button">View More Books</a>
      </section>

      {/* Partners Section */}
      <div className="PARTNER">
        <h2>Our Partners</h2>
        <hr className="title-underline" />
        <div className="PARTNERS">
          <img className="partner-img" src={penguin} alt="Penguin Books" />
          <img className="partner-img" src={harpercollins} alt="HarperCollins" />
          <img className="partner-img" src={randomhouse} alt="Random House" />
          <img className="partner-img" src={scholastic} alt="Scholastic" />
          <img className="partner-img" src={macmillan} alt="Macmillan" />
        </div>
      </div>

      {/* Footer Section */}
      <div className="Footer">
        <img className="LOGO2" src={logo} alt="BookNest Logo" />
        <p className="footer2">@BookNest <br /> Some Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Home;