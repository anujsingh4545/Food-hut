import React from "react";

const CommentBox = ({userid, userProfile, comment, time}) => {
  const timestamp = new Date(time);
  const year = timestamp.getFullYear();
  const month = timestamp.getMonth() + 1;
  const date = timestamp.getDate();
  let hours = timestamp.getHours();

  const minutes = timestamp.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  return (
    <div className=" flex  items-center justify-between flex-col md:flex-row  w-full bg-red-600/10 mb-3 px-2 md:px-5 py-2  ">
      <section className=" flex  items-center flex-row gap-4 w-[100%] ">
        <img src={userProfile} alt="" className=" w-8 h-8 md:w-10 md:h-10 " />
        <p className=" tracking-wider text-lg text-gray-950/80 justify-around ">{comment}</p>
      </section>

      <p className=" italic text-md  w-full  text-right tracking-wider font-bold text-gray-900/60 ">
        ~ {`${hours} : ${minutes} ${ampm}`}
        <span className="pl-2">{`${date}/${month}/${year}`}</span>
      </p>
    </div>
  );
};

export default CommentBox;
