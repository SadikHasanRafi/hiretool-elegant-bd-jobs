import "react";
import logo from "../../assets/logo.svg"
const Footer = () => {
  return (
    <div className="">
        <footer className="footer p-10 bg-primary bg-opacity-10 text-base-content items-center md:place-content-evenly place-content-start">
        <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a> 
    <a className="link link-hover">Design</a> 
    <a className="link link-hover">Marketing</a> 
    <a className="link link-hover">Advertisement</a>
  </div>
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a> 
    <a className="link link-hover">Contact</a> 
    <a className="link link-hover">Jobs</a> 
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Newsletter</span> 
    <div className="form-control w-80">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="relative">
        <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" /> 
        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
      </div>
    </div></div>
</footer>
<footer className="footer px-10 py-4 border-t bg-primary bg-opacity-10 text-base-content border-base-300 items-center md:place-content-evenly place-content-start">
  <div className="items-center grid-flow-col">
    <img className="w-44 mr-6" src={logo} alt="logo" />
    <p>ACME Industries Ltd. <br/>Providing reliable tech since 1992</p>
  </div> 
</footer>
    </div>
  );
};

export default Footer;
