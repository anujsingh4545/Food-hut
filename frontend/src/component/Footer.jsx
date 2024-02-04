import React from "react";

const Footer = () => {
  return (
    <div className=" bg-red-500/10 grid  grid-cols-1 md:grid-cols-4  p-10  ">
      {/* Section 1 */}
      <section className=" mb-10 md:mb-0 ">
        <img src="../../public/Logo.svg" alt="" />
      </section>
      {/* Section 2 */}
      <section className=" flex gap-2 flex-col tracking-wide  mb-10 md:mb-0 ">
        <h1 className=" footer_sec1"> SERVICES</h1>
        <p className=" footer_sec2 ">Branding</p>
        <p className=" footer_sec2 ">Design</p>
        <p className=" footer_sec2 ">Marketing</p>
        <p className=" footer_sec2 ">Advertisement</p>
      </section>
      {/* Section 3 */}
      <section className=" flex gap-2 flex-col tracking-wide  mb-10 md:mb-0 ">
        <h1 className=" footer_sec1"> COMPANY</h1>
        <p className=" footer_sec2 ">About us</p>
        <p className=" footer_sec2 ">Contact</p>
        <p className=" footer_sec2 ">Jobs</p>
        <p className=" footer_sec2 ">Press kit</p>
      </section>
      {/* Section 4 */}
      <section className=" flex gap-2 flex-col tracking-wide  mb-10 md:mb-0 ">
        <h1 className=" footer_sec1"> LEGAL</h1>
        <p className=" footer_sec2 ">Terms of use</p>
        <p className=" footer_sec2 ">privacy policy </p>
        <p className=" footer_sec2 ">Cookie Policy</p>
      </section>
    </div>
  );
};

export default Footer;
